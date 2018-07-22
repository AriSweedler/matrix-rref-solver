import React from 'react';
import Matrix from './Matrix.js';
import InputControls from './InputControls.js';
import './matrixStyles.css';

//we don't want no references here
function cloneMatrix(input) {
  var output = [];
  for (let arr of input) {
    output.push(arr.slice())
  }
  return output;
}

class App extends React.Component {
  //hoist state to the App component
  state = {
    allValues: [[2, 6, 4], [1, 4, 5], [3, 7, 5]],
    rows: 3,
    cols: 3
  }

  //Changes the state of the rows/cols. Pushes numbers onto allValues if necesary.
  matrixSizeChange = (newRows, newCols) => {
    var newValues = cloneMatrix(this.state.allValues);

    //if we added rows, then push enough rows filled with 0s to the end of this.state.allValues
    while (newRows > newValues.length) {
      newValues.push(Array(newCols).fill(0)); // [0, 0, 0, 0] if newCols = 4
    }

    //if we added cols, then:
    //For each row: Push enough 0s to the end.
    for(let r = 0; r < newRows; r++) {
      while (newCols > newValues[r].length) {
        newValues[r].push(0);
      }
    }

    //update state
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

  addWork = (description, changedRow) => {
    this.shownWork.push(
      <Matrix
        message={`Step ${this.workStep}: ${description}`}
        key={this.workStep++}
        displayOnly={true}
        values={cloneMatrix(this.nextStep)}
        changed={changedRow}
      />
    );
    // console.log(`Step ${this.workStep++}: ${description.substring(0, 19)}\t...${values}.`)
  }

  //takes a matrix as input, and retuns the matrix in rref'd form. (All lines beginning in 'this.*' are for the purpose of recording work.)
  rref = (input) => {
    let col = 0;
    let row = 0;
    this.workStep = 0;
    this.shownWork = [];
    this.nextStep = cloneMatrix(input);
    this.addWork(`Here is our original matrix.`, );
    for(row = 0; row < this.state.rows; col++, row++) {

      //do a step of work on the matrix "this.nextStep", then record.
      let rVal = this.nextStep[row][col];
      while (rVal === 0) {
        col++;
        rVal = this.nextStep[row][col];
        if (col === this.state.cols) {break;}
      }
      if (rVal !== 1 && rVal) {
        this.nextStep[row] = this.nextStep[row].map( (item) => (item /= rVal));
        this.addWork(`Divide row ${row} by ${rVal}.`, row);
      }

      //do a step of work on the matrix "this.nextStep"
      for(let r = row+1; r < this.state.rows; r++) {
        let rVal = this.nextStep[r][col];
        if (rVal) {
          // eslint-disable-next-line
          this.nextStep[r] = this.nextStep[r].map( (item, c) => (item -= this.nextStep[row][c]*rVal));
          this.addWork(`Subtract ${rVal}*(row ${row}) from row ${r} in order to zero out (${r}, ${col}).`, r);
        }
      }
    }

    return this.nextStep;
  }

  zeroAll = () => {
    const zeroRow = Array(this.state.cols).fill(0);
    let zeroVals = [];
    for(let i = 0; i < this.state.rows; i++) {
      zeroVals.push(zeroRow.slice());
    }
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
          Shown Work:{this.shownWork}
        </div>
      </div>
    );
  }
}

export default App;
