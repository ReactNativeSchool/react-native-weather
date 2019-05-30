import React from "react";

const apiKey = "1648e403f1e44103b747e25c55f8c2fb";

export default class Details extends React.Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log("position", position);
      this.getCurrentWeather({ coords: position.coords });
      this.getForecast({ coords: position.coords });
    });
  }

  getCurrentWeather = ({ zipcode, coords }) => {
    let suffix = "";

    if (zipcode) {
      suffix = `zip=${zipcode}`;
    } else if (coords) {
      suffix = `lat=${coords.latitude}&lon=${coords.longitude}`;
    }

    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&${suffix}`
    )
      .then(response => response.json())
      .then(response => {
        console.log("current response", response);
      })
      .catch(err => {
        console.log("current error", err);
      });
  };

  getForecast = ({ zipcode, coords }) => {
    let suffix = "";

    if (zipcode) {
      suffix = `zip=${zipcode}`;
    } else if (coords) {
      suffix = `lat=${coords.latitude}&lon=${coords.longitude}`;
    }

    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&${suffix}`
    )
      .then(response => response.json())
      .then(response => {
        console.log("forecast response", response);
      })
      .catch(err => {
        console.log("forecast error", err);
      });
  };

  render() {
    return null;
  }
}
