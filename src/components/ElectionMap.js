import React, { Component } from "react";
import Datamap from "datamaps/dist/datamaps.usa.min.js";
import d3 from "d3";
import CanadaJson from "./usa.topo.json";

class ElectionMap extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // Datamaps expect data in format:
    // { "USA": { "fillColor": "#42a844", numberOfWhatever: 75},
    //   "FRA": { "fillColor": "#8dc386", numberOfWhatever: 43 } }
    let dataset = {};

    // We need to colorize every country based on "numberOfWhatever"
    // colors should be uniq for every value.
    // For this purpose we create palette(using min/max this.props.data-value)
    let onlyValues = this.props.data.map(function(obj) {
      return obj[1];
    });
    let minValue = Math.min.apply(null, onlyValues),
      maxValue = Math.max.apply(null, onlyValues);

    // create color palette function
    // color can be whatever you wish
    let paletteScale = d3.scale
      .linear()
      .domain([minValue, maxValue])
      .range(["#EC3323","#001AF5"]); // blue color

    // fill dataset in appropriate format
    this.props.data.forEach(function(item) {
      //
      // item example value ["USA", 70]
      let winner = '';
      if(item[2]>0) {
          winner = 'Democrats'
      }
      else {
          winner = 'Republicans'
      }
      let iso = item[0],
        value = item[1],
        win = Math.abs(Math.round(item[2]));
      dataset[iso] = { numberOfThings: win, fillColor: paletteScale(value), party: winner };
    });

    let map = new Datamap({
      element: document.getElementById("cloropleth_map"),
      scope: "usa",
      geographyConfig: {
        popupOnHover: true,
        highlightOnHover: true,
        borderColor: "#444",
        highlightBorderWidth: 1,
        borderWidth: 0.5,
        dataJson: CanadaJson,
        popupTemplate: function(geo, data) {
          // don't show tooltip if country don't present in dataset
          if (!data) {
            return;
          }
          // tooltip content
          return [
            '<div class="hoverinfo">',
            "<strong>",
            geo.properties.name,
            "</strong>",
            "<br>Winning Vote Margin: <strong>",
            data.numberOfThings,
            "</strong>",
            "</strong>",
            "<br>Winning Party: <strong>",
            data.party,
            "</strong>",
            "</div>"
          ].join("");
        }
      },
      fills: {
        HIGH: "#afafaf",
        LOW: "#123456",
        MEDIUM: "blue",
        UNKNOWN: "rgb(0,0,0)",
        defaultFill: "#eee"
      },
      data: dataset,
      setProjection: function(element) {
        var projection = d3.geo
          .mercator()
          .center([-95.7129, 34]) // always in [East Latitude, North Longitude]
          .scale(250)
          .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

        var path = d3.geo.path().projection(projection);
        return { path: path, projection: projection };
      }
    });
  }
  render() {
    return (
      <div
        id="cloropleth_map"
        style={{
          height: "100vh",
          width: "100vw"
        }}
      ></div>
    );
  }
}

export default ElectionMap;
