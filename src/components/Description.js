import React, { Component } from "react";
import "../styles/Description.css";

export class Description extends Component {
  render() {
    return (
      <div>
        <div className="descriptionContainer">
          <h2>2020 Presidential Election Prediction</h2>
        </div>
        <div className="votes">
          <h3>Democratic Electoral Votes: {this.props.dem}</h3>
          <h3>Republican Electoral Votes: {this.props.rep}</h3>
        </div>
      </div>
    );
  }
}

export default Description;
