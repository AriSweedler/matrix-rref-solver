import React from 'react'
import ReactDOM from 'react-dom'
import ReactBodymovin from 'react-bodymovin'

import animation1 from './animations/first.json'
import animation2 from './animations/second.json'

function App() {
  return (
    <div>
      <CanvasCreation path={animation1} />
      <CanvasCreation path={animation2} />
    </div>
  );
}

class CanvasCreation extends React.Component {
  render() {
    const bodymovinOptions = {
      loop: true,
      autoplay: true,
      prerender: true,
      animationData: this.props.path
    }

    return (
      <div>
        <ReactBodymovin options={bodymovinOptions} />
      </div>
    );
  }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
