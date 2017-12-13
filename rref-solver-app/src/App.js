import React from 'react';
import Matrix from './Matrix.js';

import './styles.css';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.handleInput = (e, row, col) => {
      let myNewValue = this.state.value.slice();//copy old state
      myNewValue[row][col] = e.target.value;    //create new state
      this.setState({value: myNewValue})        //set new state
    }

    this.state = {value: [['', '', '', '']]}
  }
  render() {
    return (
    <div>
      <h2>Change what my App does in this file!</h2>

      <p>My input matrix</p>
      <Matrix
        values={this.state.value}
        displayOnly={false}
        handleInput={(e, row, col) => {this.handleInput(e, row, col)}}
      />

      <p>My output matrix</p>
      <Matrix values={rref(this.state.value)} displayOnly={true}/>

    </div>
    );
  }
}

function rref(inputMatrix) {
  let answer = inputMatrix.slice();

  //get all of the ones in the right spot.
  //for each row:
  for(let row = 0; row < answer.length; row++) {
    //find the first non-zero entry and divide the entire row by that number
    let one_i = 0;
    while (!answer[row][one_i]) {
      one_i++;
      if(one_i === answer[row].length) {break;}
    }
    if(one_i < answer[row].length) {
      for(let c = one_i; c < answer[row].length; c++) {
        answer[row][c] /= answer[row][one_i];
      }
    } else {
      for(let c = one_i; c < answer[row].length; c++) {
        answer[row][c] = 0;
      }
    }

    //subtract this row from those below it s.t. everything below the 1 is a 0
    for(let low_row = row+1; low_row < answer.length; low_row++) {
      console.log("Sweeping below row number " + row);
      if(answer[low_row][one_i]) {
        let rowSub = answer[low_row][one_i];
        for(let c = one_i; c < answer[low_row].length; c++) {
          answer[low_row][c] -= answer[row][c]*rowSub;
        }
      }
    }
  }



  return answer;
}

export default App;
