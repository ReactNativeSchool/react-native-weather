import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  View
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
    loadingCurrentWeather: true,
    forecast: [],
    loadingForecast: true
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.getCurrentWeather({ coords: position.coords });
      this.getForecast({ coords: position.coords });
    });
  }

  getCurrentWeather = ({ zipcode, coords }) =>
    weatherApi("/weather", { zipcode, coords })
      .then(response => {
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
        this.setState({
          loadingForecast: false,
          forecast: groupForecastByDay(response.list)
        });
      })
      .catch(err => {
        console.log("forecast error", err);
      });

  render() {
    if (this.state.loadingCurrentWeather || this.state.loadingForecast) {
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

            <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
              {this.state.forecast.map(day => (
                <BasicRow
                  key={day.day}
                  style={{ justifyContent: "space-between" }}
                >
                  <P>{format(new Date(day.day), "dddd, MMM D")}</P>
                  <View style={{ flexDirection: "row" }}>
                    <P style={{ fontWeight: "700", marginRight: 10 }}>
                      {Math.round(day.temp_max)}
                    </P>
                    <P>{Math.round(day.temp_min)}</P>
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
