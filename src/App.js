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
      dem: "",
      rep: "",
      data: [],
      scale: 1000
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
    console.log(apiData);
    apiData.forEach(usState => {
      data.push([usState[0], usState[1], usState[1]]);
    });
    console.log(data);
    this.setState({
      ...this.state,
      rep,
      dem,
      data
    });
  }
  componentWillMount() {
    const height = window.innerHeight;
    const width = window.innerWidth;
    console.log(height, width);
    if (height + width < 1400) {
      this.setState({
        ...this.state,
        scale: 400
      });
    }
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div
      // style={{
      //   height: "100vh",
      //   width: "100vw"
      // }}
      >
        <Description dem={this.state.dem[1]} rep={this.state.rep[1]} />
        {this.state.data.length > 1 && (
          <ElectionMap data={this.state.data} scale={this.state.scale} />
        )}
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
