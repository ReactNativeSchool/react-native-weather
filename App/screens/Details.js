import React from "react";
import { weatherApi } from "../util/weatherApi";

export default class Details extends React.Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log("position", position);
      this.getCurrentWeather({ coords: position.coords });
      this.getForecast({ coords: position.coords });
    });
  }

  getCurrentWeather = ({ zipcode, coords }) =>
    weatherApi("/weather", { zipcode, coords })
      .then(response => {
        console.log("current response", response);
      })
      .catch(err => {
        console.log("current error", err);
      });

  getForecast = ({ zipcode, coords }) =>
    weatherApi("/forecast", { zipcode, coords })
      .then(response => {
        console.log("forecast response", response);
      })
      .catch(err => {
        console.log("forecast error", err);
      });

  render() {
    return null;
  }
}
