import React from "react";

const apiKey = "1648e403f1e44103b747e25c55f8c2fb";

export default class Details extends React.Component {
  componentDidMount() {
    // const zipcode = 94040;
    const zipcode = 37064;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&zip=${zipcode}&units=imperial`
    )
      .then(response => response.json())
      .then(response => {
        console.log("current response", response);
      })
      .catch(err => {
        console.log("current error", err);
      });

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&zip=${zipcode}&units=imperial`
    )
      .then(response => response.json())
      .then(response => {
        console.log("forecast response", response);
      })
      .catch(err => {
        console.log("forecast error", err);
      });
  }

  render() {
    return null;
  }
}
