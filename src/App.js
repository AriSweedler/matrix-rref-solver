import React from 'react';
import Matrix from './Matrix.js';
import InputControls from './InputControls.js'

import './styles.css';

class App extends React.Component {
  state = {
    values: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    rows: 3,
    cols: 3
  }

  matrixSizeChange = (newRows, newCols) => {
    if(newRows === 0 || newCols === 0) {
      console.log("Too little")
      return;
    }

    var curRows = this.state.values.length;
    var curCols = this.state.values[0].length;
    var newValues = this.state.values.slice();

    //if we added rows, then push a row filled with 0s to the end of this.state.values
    if (newRows > curRows) {
      for(let r = curRows; r <= newRows; r++) {
        newValues.push(Array(curCols).fill(0)); // [0, 0, 0, 0] if curCols = 4
      }
    }

    //if we added cols, then:
    //For each row: Push enough 0s to the end.
    if (newCols > this.state.values[0].length) {
      for(let r = 0; r < curRows; r++) {
        for(let c = curCols; c <= newCols; c++) {
          newValues[r].push(0);
        }
      }
    }
    this.setState({
      rows: newRows,
      cols: newCols,
      values: newValues
    });
  }

  changeValues = (value, row, col) => {
    var newValues = this.state.values.slice();
    newValues[row][col] = value;
    this.setState({
      values: newValues
    });
  }

  render() {
    var displayValues = []
    for(var i = 0; i < this.state.rows; i++) {
      displayValues.push(this.state.values[i].slice(0, this.state.cols));
    }
    return (
      <div>
        <h2>Change what my App does in this file!</h2>
        <p>My input row</p>
        <InputControls
          controlsUsed={this.matrixSizeChange}
          rows={this.state.rows}
          cols={this.state.cols}/>
        <Matrix
          alterRecordedValues={this.changeValues}
          values={displayValues}/>
      </div>
    );
  }
}

export default App;
