import React from 'react';

class Square extends React.Component {
  render() {
    console.log(this.props);

    let myValue = this.props.value;
    var divStyle = {fontSize: figureFontSize(myValue)};
    let mySquare = (
      <input
        className="numberInput"
        type="text"
        disabled = {this.props.displayOnly}
        onChange = {(e) => this.props.handleInput(e)}
        value={myValue}
        style={divStyle}
      />
    );
    return (mySquare);
  }
}

function figureFontSize(n) {
  // let myLength = String(n).length;
  // let answer = 50/myLength;
  // if(answer >= 50) {answer = 35;}
  let answer = 36;
  return (answer + 'px');
}

export default Square;
