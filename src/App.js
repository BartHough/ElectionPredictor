import React, { Component } from "react";
import "./App.css";

import ElectionMap from "./components/ElectionMap";
import Description from "./components/Description";
import FadeLoader from "react-spinners/FadeLoader";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dem: '',
      rep: '',
      data: []
    };
  }
  getData() {
    fetch(
      "https://qrc8ez3de6.execute-api.us-east-2.amazonaws.com/Prod/prediction/"
    )
      .then(res => res.json())
      .then(apiData => {
        this.parseData(apiData);
      });
  }
  parseData(apiData) {
    const rep = apiData.pop();
    const dem = apiData.pop();
    let data = [];
    apiData.forEach(usState => {
      if (usState[1] < 0) {
        data.push([usState[0], -1, usState[1]]);
      } else if (usState[1] > 200000) {
        data.push([usState[0], 1, usState[1]]);
      } else {
        data.push([usState[0], 0, usState[1]]);
      }
    });
    this.setState({
      ...this.state,
      rep,
      dem,
      data
    });
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div
        style={{
          height: "100%",
          width: "100%"
        }}
      >
        <Description dem={this.state.dem[1]} rep={this.state.rep[1]} />
        {this.state.data.length > 1 && <ElectionMap data={this.state.data} />}
        <div style={style}>
          <FadeLoader
            size={500}
            color={"#000000"}
            loading={!(this.state.data.length > 1)}
          />
        </div>
      </div>
    );
  }
}

export default App;
