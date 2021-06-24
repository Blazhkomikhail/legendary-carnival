import React from "react";
// import ReactDOM from "react";
import Greeter from '../components/greeter'; 

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Greeter name="Bob" />
      </div>
    )
  }
}