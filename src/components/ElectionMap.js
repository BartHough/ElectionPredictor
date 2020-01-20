import React, { Component } from "react";
import Datamap from "datamaps/dist/datamaps.usa.min.js";
import d3 from "d3";
import UsaJson from "./usa.topo.json";

class ElectionMap extends Component {

  componentDidMount() {
    let dataset = {};

    this.props.data.forEach(function(item) {
      let color = ''
      if (item[1] === 'republican') {
        color = "#EC3323"
      }
      else {
        color = "#001AF5"
      }
      let iso = item[0]
      dataset[iso] = { fillColor: color, party: item[2] };
    });
    const scale = this.props.scale;
    let map = new Datamap({
      element: document.getElementById("cloropleth_map"),
      scope: "usa",
      responsive: true,
      height: 40,
      geographyConfig: {
        popupOnHover: true,
        highlightOnHover: true,
        borderColor: "#444",
        highlightBorderWidth: 1,
        borderWidth: 0.5,
        dataJson: UsaJson,
        popupTemplate: function(geo, data) {
          if (!data) {
            return;
          }
          return [
            '<div class="hoverinfo">',
            "<strong>",
            geo.properties.name,
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
          .albersUsa()
          .translate([element.offsetWidth / 2, element.offsetHeight / 2]).scale(scale);
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
          margin: 0,
          alignContent: "center",
          position: "relative",
          // height: 100,
          // width: 100
        }}
      ></div>
    );
  }
}

export default ElectionMap;
