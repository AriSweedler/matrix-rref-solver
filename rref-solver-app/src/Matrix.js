import React from 'react';
import Row from './Row.js';

class Matrix extends React.Component {
  render() {
    //passed an array (of arrays)
    let myValues = this.props.values;
    let myMatrix = [];
    for(let row = 0; row < myValues.length; row++){
      myMatrix.push(
        <Row
          key={row}
          handleInput={(e, col) => {this.props.handleInput(e, row, col)}}
          values={myValues[row]}
          displayOnly={this.props.displayOnly}
        />
      );
    }
    return (<div className="Matrix">{myMatrix}</div>);
  }
}

export default Matrix;
