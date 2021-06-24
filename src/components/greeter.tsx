import React from "react";
// import { ReactDOM } from "react";

type MyProps = {
  name: string;
};

type MyState = {
  count: number;
};

export default class Greeter extends React.Component <MyProps, MyState> {
  render() { 
    return (
      <div>
        Hello {this.props.name}
      </div>
    )
  }
}