import React from 'react';
import Matrix from './Matrix.js';
import InputControls from './InputControls.js'

import './matrixStyles.css';

function copyMatrixValues(input) {
  var output = [];
  for (let arr of input) {
    output.push(arr.slice())
  }
  return output;
}

class App extends React.Component {
  state = {
    allValues: [[2, 6, 4], [1, 4, 5], [2, 7, 5]],
    rows: 1,
    cols: 3
  }

  //Changes the state of the rows/cols. Pushes numbers onto allValues if necesary.
  matrixSizeChange = (newRows, newCols) => {
    if(newRows === 0 || newCols === 0) {
      console.log("Too little")
      return;
    }

    var curRows = this.state.allValues.length;
    var curCols = this.state.allValues[0].length;
    var newValues = this.state.allValues.slice();

    //if we added rows, then push a row filled with 0s to the end of this.state.allValues
    if (newRows > curRows) {
      for(let r = curRows; r <= newRows; r++) {
        newValues.push(Array(curCols).fill(0)); // [0, 0, 0, 0] if curCols = 4
      }
    }

    //if we added cols, then:
    //For each row: Push enough 0s to the end.
    if (newCols > this.state.allValues[0].length) {
      for(let r = 0; r < curRows; r++) {
        for(let c = curCols; c <= newCols; c++) {
          newValues[r].push(0);
        }
      }
    }
    this.setState({
      rows: newRows,
      cols: newCols,
      allValues: newValues
    });
  }

  //Change a number in allValues
  changeCell = (value, row, col) => {
    var newValues = this.state.allValues.slice();
    newValues[row][col] = value;
    this.setState({
      allValues: newValues
    });
  }

  doNothing = () => {}

  //return an array of Matricies, each step is a piece of work. Also, pushes the final values/2D-array onto finalAnswerPtr.
  rref = (input, finalAnswerPtr) => {
    //divide topmost alive row by itself, subtract from other rows.
    //repeat.
    var myKey = 0;
    var shownWork = [];
    var nextStep = copyMatrixValues(input);
    var thisWork;
    for(let i = 0; i < this.state.rows; i++) {
      //do a step of work on the matrix "nextStep"
      let rVal = nextStep[i][i];
      for(let c = i; c < this.state.cols; c++) {
        nextStep[i][c] /= rVal;
      }
      //and place a deep copy of the results of this step into a matrix.
      thisWork = copyMatrixValues(nextStep);
      shownWork.push(<Matrix key={myKey++} displayOnly={true} message={`Step ${myKey}: Divide row ${i} by ${rVal}.`} values={thisWork}/>);

      //do a step of work on the matrix "nextStep"
      for(let r = i+1; r < this.state.rows; r++) {
        let rVal = nextStep[r][i];
        for(let c = 0; c < this.state.cols; c++) {
          nextStep[r][c] -= rVal*nextStep[i][c];
        }
      }

      //and place a deep copy of the results of this step into a matrix.
      thisWork = copyMatrixValues(nextStep);
      shownWork.push(<Matrix key={myKey++} displayOnly={true} message={`Step ${myKey}: subtract row ${i} from all rows below it.`} values={thisWork}/>);
    }

    finalAnswerPtr.push(copyMatrixValues(nextStep));//treating this as
    return shownWork;
  }

  render() {
    /*allValues records every cell the user inputs, and never forgets. But if we input a number then decrease the number
    of columns such that we no longer see that number, we don't with to continue to display that number. The matrix "values"
    takes care of this, by only recording the value we with to see. */
    var values = [];
    for(var i = 0; i < this.state.rows; i++) {
      values.push(this.state.allValues[i].slice(0, this.state.cols));
    }

    //rref, and record both work & answer.
    var finalAnswerPtr = [];
    var shownWork = this.rref(values, finalAnswerPtr);
    var finalAnswer = finalAnswerPtr.pop();

    return (
      <div className="myApp">myApp
        <div className="ioPanel">ioPanel
          <div className="userInput">userInput
            <InputControls
              className="inputControls"
              controlsUsed={this.matrixSizeChange}
              rows={this.state.rows}
              cols={this.state.cols}/>
            <Matrix
              alterCell={this.changeCell}
              message={'Place your input here:'}
              values={values}/>
          </div>
          <div className="answer">answer
            <Matrix
              displayOnly={true}
              message={'Your answer:'}
              values={finalAnswer}/>
          </div>
        </div>
        <div className="shownWork">
          shownWork{shownWork}
        </div>
      </div>
    );
  }
}

export default App;
