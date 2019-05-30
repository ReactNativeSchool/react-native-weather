import React from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  SafeAreaView
} from "react-native";
import { format } from "date-fns";

import { weatherApi } from "../util/weatherApi";
import { Container } from "../components/Container";
import { WeatherIcon } from "../components/WeatherIcon";
import { BasicRow } from "../components/List";
import { H1, H2, P } from "../components/Text";

const groupForecastByDay = list => {
  const data = {};

  list.forEach(item => {
    const [day] = item.dt_txt.split(" ");
    if (data[day]) {
      if (data[day].temp_max < item.main.temp_max) {
        data[day].temp_max = item.main.temp_max;
      }

      if (data[day].temp_min > item.main.temp_min) {
        data[day].temp_min = item.main.temp_min;
      }
    } else {
      data[day] = {
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max
      };
    }
  });

  const formattedList = Object.keys(data).map(key => ({
    day: key,
    ...data[key]
  }));

  return formattedList;
};

export default class Details extends React.Component {
  state = {
    currentWeather: {},
    forecast: {},
    currentWeatherLoading: true,
    forecastLoading: true
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
        this.setState({
          currentWeather: response,
          currentWeatherLoading: false
        });

        this.props.navigation.setParams({
          title: response.name
        });
      })
      .catch(err => {
        console.log("current error", err);
      });

  getForecast = ({ zipcode, coords }) =>
    weatherApi("/forecast", { zipcode, coords })
      .then(response => {
        console.log("forecast response", response);
        this.setState({
          forecast: groupForecastByDay(response.list),
          forecastLoading: false
        });
      })
      .catch(err => {
        console.log("forecast error", err);
      });

  render() {
    const {
      forecast,
      currentWeather,
      currentWeatherLoading,
      forecastLoading
    } = this.state;

    if (currentWeatherLoading || forecastLoading) {
      return (
        <Container>
          <ActivityIndicator size="large" color="#fff" />
        </Container>
      );
    }

    const { main, weather } = currentWeather;
    return (
      <Container>
        <ScrollView>
          <SafeAreaView>
            <WeatherIcon icon={weather[0].icon} />
            <BasicRow>
              <H1>{`${Math.round(main.temp)}°`}</H1>
            </BasicRow>
            <BasicRow>
              <H2>{`${main.humidity}%`}</H2>
            </BasicRow>
            <BasicRow>
              <H2>{`${Math.round(main.temp_min)}°`}</H2>
              <H2>{`${Math.round(main.temp_max)}°`}</H2>
            </BasicRow>

            <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
              {forecast.map(f => (
                <BasicRow
                  key={f.day}
                  style={{ justifyContent: "space-between" }}
                >
                  <P>{format(new Date(f.day), "dddd, MMM D")}</P>
                  <View style={{ flexDirection: "row" }}>
                    <P style={{ fontWeight: "700", marginRight: 10 }}>
                      {Math.round(f.temp_max)}
                    </P>
                    <P>{Math.round(f.temp_min)}</P>
                  </View>
                </BasicRow>
              ))}
            </View>
          </SafeAreaView>
        </ScrollView>
      </Container>
    );
  }
}
