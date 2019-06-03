import React from "react";
import { ActivityIndicator, ScrollView, SafeAreaView } from "react-native";

import { weatherApi } from "../util/weatherApi";
import { Container } from "../components/Container";
import { WeatherIcon } from "../components/WeatherIcon";
import { BasicRow } from "../components/List";
import { H1, H2 } from "../components/Text";

export default class Details extends React.Component {
  state = {
    currentWeather: {},
    loadingCurrentWeather: true
  };

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

        this.props.navigation.setParams({ title: response.name });
        this.setState({
          currentWeather: response,
          loadingCurrentWeather: false
        });
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
    if (this.state.loadingCurrentWeather) {
      return (
        <Container>
          <ActivityIndicator color="#fff" size="large" />
        </Container>
      );
    }

    const { weather, main } = this.state.currentWeather;

    return (
      <Container>
        <ScrollView>
          <SafeAreaView>
            <WeatherIcon icon={weather[0].icon} />
            <H1>{`${Math.round(main.temp)}°`}</H1>
            <BasicRow>
              <H2>{`Humidity: ${main.humidity}%`}</H2>
            </BasicRow>
            <BasicRow>
              <H2>{`Low: ${Math.round(main.temp_min)}°`}</H2>
              <H2>{`High: ${Math.round(main.temp_max)}°`}</H2>
            </BasicRow>
          </SafeAreaView>
        </ScrollView>
      </Container>
    );
  }
}
