import React, { Component } from "react";
import Datamap from "datamaps/dist/datamaps.usa.min.js";
import d3 from "d3";
import CanadaJson from "./usa.topo.json";

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
