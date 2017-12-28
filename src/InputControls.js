import React from 'react';

class InputControls extends React.Component {
  decrementRow = () => {
    console.log("Row minus");
    this.props.controlsUsed(this.props.rows-1, this.props.cols);
  }

  incrementRow = () => {
    console.log("Row plus");
    this.props.controlsUsed(this.props.rows+1, this.props.cols);
  }

  changeRow = (event) => {
    var newValue = event.target.value;
    this.props.controlsUsed(newValue, this.props.cols);
  }

  decrementCol = () => {
    console.log("Col minus");
    this.props.controlsUsed(this.props.rows, this.props.cols-1);
  }

  incrementCol = () => {
    console.log("Col plus");
    this.props.controlsUsed(this.props.rows, this.props.cols+1);
  }

  changeCol = (event) => {
    var newValue = event.target.value;
    this.props.controlsUsed(this.props.rows, newValue);
  }

  zeroAll = () => {
    this.props.zeroAll();
  }

  render() {
    return (
      <div className="InputControls">
        <div>
          <button onClick={this.decrementRow}>Row-1</button>
          <input onChange={this.changeRow} value={this.props.rows} />
          <button onClick={this.incrementRow}>Row+1</button>
        </div>
        <div>
          <button onClick={this.decrementCol}>Col-1</button>
          <input onChange={this.changeCol} value={this.props.cols} />
          <button onClick={this.incrementCol}>Col+1</button>
        </div>
        <div>
          <button onClick={this.zeroAll}>Reset values</button>
        </div>
      </div>
    );
  }
}

export default InputControls;