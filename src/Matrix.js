import React from 'react';

class Matrix extends React.Component {
  changeMatrix = (value, row, col) => {
    //console.log(`Just changed (${row}, ${col}).`);
    this.props.alterRecordedValues(value, row, col);
  }

  render() {
    let myValues = this.props.values;
    let myMatrix = [];
    for(let row = 0; row < myValues.length; row++){
      myMatrix.push(
        <Row
          key={row}
          index={row}
          values={myValues[row]}
          alterMatrix={this.changeMatrix}
        />
      );
    }
    return (<div className="Matrix">{myMatrix}</div>);
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
          value={myValues[col]}
          alterRow={this.changeRow}
        />
      );
    }
    return (<div className="Row">{myRow}</div>);
  }

}

class Square extends React.Component{
  changeSquare = (event) => {
    this.props.alterRow(event.target.value, this.props.index);
  }

  render() {
    return (
      <input
        className="numberInput"
        type="text"
        value={this.props.value}
        onChange={this.changeSquare}
      />
    );
  }

}

export default Matrix;
