import React, { Component } from "react";
import "./App.css";

import ElectionMap from "./components/ElectionMap";
import Description from "./components/Description";

class App extends Component {
  state = {
    data: [
      ["AL", -1],
      ["AK", 1],
      ["AZ", 1],
      ["AR", 1],
      ["CA", 1],
      ["CO", 1],
      ["CT", 1],
      ["DE", 1],
      ["DC", 1],
      ["FL", 1],
      ["GA", 1],
      ["HI", 1],
      ["ID", -1],
      ["IL", 1],
      ["IN", -1],
      ["IA", 1],
      ["KS", -1],
      ["KY", 1],
      ["LA", 1],
      ["ME", 1],
      ["MD", 1],
      ["MA", 1],
      ["MI", 1],
      ["MN", 1],
      ["MS", -1],
      ["MO", 1],
      ["MT", -1],
      ["NE", -1],
      ["NV", 1],
      ["NH", 1],
      ["NJ", 1],
      ["NM", 1],
      ["NY", 1],
      ["NC", 1],
      ["ND", -1],
      ["OH", -1],
      ["OK", -1],
      ["OR", 1],
      ["PA", 1],
      ["RI", 1],
      ["SC", -1],
      ["SD", -1],
      ["TN", -1],
      ["TX", 1],
      ["UT", -1],
      ["VT", 1],
      ["VA", -1],
      ["WA", 1],
      ["WV", 1],
      ["WI", -1],
      ["WY", -1]
    ]
  };
  render() {
    return (
      <div
        style={{
          height: "100%",
          width: "100%"
        }}
      >
        <Description />
        <ElectionMap data={this.state.data} />
      </div>
    );
  }
}

export default App;
