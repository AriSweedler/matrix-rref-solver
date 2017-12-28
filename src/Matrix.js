import React from 'react';

class Matrix extends React.Component {
  changeMatrix = (value, row, col) => {
    this.props.alterCell(value, row, col);
  }

  render() {
    let myValues = this.props.values;
    let myMatrix = [];
    for(let row = 0; row < myValues.length; row++){
      myMatrix.push(
        <Row
          key={row}
          index={row}
          displayOnly={this.props.displayOnly}
          values={myValues[row]}
          alterMatrix={this.changeMatrix}
          changed={this.props.changed===row}
        />
      );
    }
    return (
      <div className="Matrix">
        <div>{this.props.message}</div>
        <div>{myMatrix}</div>
      </div>
    );
  }
}

class Row extends React.Component{
  changeRow = (value, col) => {
    this.props.alterMatrix(value, this.props.index, col);
  }

  render() {
    let myValues = this.props.values;
    let myRow = [];
    for(let col = 0; col < myValues.length; col++){
      myRow.push(
        <Square
          key={col}
          index={col}
          displayOnly={this.props.displayOnly}
          value={myValues[col]}
          alterRow={this.changeRow}
          changed={this.props.changed}
        />
      );
    }
    let className = "Row";
    if (this.props.changed) {
      className += " changed";
    }
    return (<div className={className}>{myRow}</div>);
  }

}

class Square extends React.Component{
  changeSquare = (event) => {
    this.props.alterRow(event.target.value, this.props.index);
  }

  render() {
    var className="Cell";
    if (isNaN(this.props.value)) {
      className += " NaN";
    }
    if (this.props.changed) {
      className += " changed";
    }
    return (
      <input
        className={className}
        type="text"
        value={this.props.value}
        disabled={this.props.displayOnly}
        onChange={this.changeSquare}
      />
    );
  }

}

export default Matrix;
