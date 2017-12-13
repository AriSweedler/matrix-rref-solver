import React from 'react';
import Square from './Square.js';

class Row extends React.Component {
  render() {
    //passed one array
    let myValues = this.props.values;
    let myRow = [];
    for(let col = 0; col < myValues.length; col++){
      myRow.push(
        <Square
          key={col}
          value={myValues[col]}
          displayOnly={this.props.displayOnly}
          handleInput={(e) => {this.props.handleInput(e, col)}}
        />
      );
    }
    return (<div className="Row">{myRow}</div>);
  }
}

export default Row;
