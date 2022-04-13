import React, { Component, createContext } from "react";

export const ValueContext = createContext();

export class Context extends Component {
  state = {
    statement: "Working",
    good: {},
  };

  // componentDidMount() {
  //   fetch("http://localhost:8000/products/6252ec6ee4d72a9836720d8b")
  //     .then((response) => response.json())
  //     .then((json) => console.log(json));

  // }
  render() {
    return (
      <ValueContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </ValueContext.Provider>
    );
  }
}

export default Context;
