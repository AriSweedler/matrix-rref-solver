import React from 'react';
import Matrix from './Matrix.js';
import InputControls from './InputControls.js'

import './matrixStyles.css';

function deepCopyMatrixValues(input) {
  var output = [];
  for (let arr of input) {
    output.push(arr.slice())
  }
  return output;
}

class App extends React.Component {
  state = {
    allValues: [[2, 6, 4], [1, 4, 5], [2, 7, 5]],
    rows: 3,
    cols: 3
  }

  //Changes the state of the rows/cols. Pushes numbers onto allValues if necesary.
  matrixSizeChange = (newRows, newCols) => {
    if(newRows === 0 || newCols === 0) {
      console.log("Too little")
      //return;
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
  changeCellValue = (value, row, col) => {
    var newValues = this.state.allValues.slice();
    newValues[row][col] = value;
    this.setState({
      allValues: newValues
    });
  }

  addWork = (description, values) => {
    this.shownWork.push(
      <Matrix
        key={this.workStep++}
        displayOnly={true}
        message={`Step ${this.workStep}: ${description}`}
        values={values}
      />);
  }

  //takes a matrix as input, and retuns the matrix in rref'd form. (All lines beginning in 'this.*' are for the purpose of recording work.)
  rref = (input) => {
    let col = 0;
    let row = 0;
    let nextStep = [];
    this.workStep = 0;
    this.shownWork = [];
    nextStep = deepCopyMatrixValues(input);
    for(row = 0; row < this.state.rows; col++, row++) {

      //do a step of work on the matrix "nextStep", then record.
      let rVal = nextStep[row][col];
      while (rVal === 0) {
        col++;
        rVal = nextStep[row][col];
        if (col === this.state.cols) {return;}
      }
      if (rVal !== 1 && rVal) {
        nextStep[row] = nextStep[row].map( (item) => (item /= rVal));
        this.addWork(`Divide row ${row} by ${rVal}.`, deepCopyMatrixValues(nextStep));
      }

      //do a step of work on the matrix "nextStep"
      for(let r = row+1; r < this.state.rows; r++) {
        let rVal = nextStep[r][col];
        if (rVal) {
          // eslint-disable-next-line
          nextStep[r] = nextStep[r].map( (item, c) => (item -= nextStep[row][c]*rVal));
          this.addWork(`Subtract ${rVal}*(row ${row}) from row ${r} in order to zero out (${r}, ${col}).`, deepCopyMatrixValues(nextStep));
        }
      }

    }

    return nextStep;
  }

  zeroAll = () => {
    console.log("Zero all")
    const zeroVals = Array(this.state.rows).fill(Array(this.state.cols).fill(0));
    console.log(zeroVals);
    this.setState({allValues: zeroVals})
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
    var finalAnswer = this.rref(values);

    return (
      <div className="myApp">myApp
        <div className="ioPanel">ioPanel
          <div className="userInput">userInput
            <InputControls
              className="inputControls"
              controlsUsed={this.matrixSizeChange}
              zeroAll={this.zeroAll}
              rows={this.state.rows}
              cols={this.state.cols}/>
            <Matrix
              alterCell={this.changeCellValue}
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
          shownWork{this.shownWork}
        </div>
      </div>
    );
  }
}

export default App;
