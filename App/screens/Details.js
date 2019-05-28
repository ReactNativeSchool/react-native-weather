import React from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  SafeAreaView
} from "react-native";

import { format } from "date-fns";
import { Container } from "../components/Container";
import { H1, H2, P } from "../components/Text";
import { WeatherIcon } from "../components/WeatherIcon";
import { BasicRow } from "../components/List";

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

  const formattedlist = Object.keys(data).map(key => ({
    day: key,
    ...data[key]
  }));

  return formattedlist;
};

const apiKey = "1648e403f1e44103b747e25c55f8c2fb";

class Details extends React.Component {
  state = {
    currentWeather: {},
    loadingCurrentWeather: true,
    forecast: {},
    loadingForecast: true
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(res => {
      this.getCurrent({ coords: res.coords });
      this.getForecast({ coords: res.coords });
    });
  }

  componentDidUpdate(prevProps) {
    const oldZipcode = prevProps.navigation.getParam("zipcode");
    const zipcode = this.props.navigation.getParam("zipcode");
    if (zipcode && oldZipcode !== zipcode) {
      this.getCurrent({ zipcode });
      this.getForecast({ zipcode });
    }
  }

  getCurrent = ({ zipcode, coords }) => {
    let suffix = "";
    if (zipcode) {
      suffix = `zip=${zipcode}`;
    } else if (coords) {
      suffix = `lat=${coords.latitude}&lon=${coords.longitude}`;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&${suffix}`
    )
      .then(res => res.json())
      .then(currentWeather => {
        this.props.navigation.setParams({
          title: currentWeather.name
        });

        this.setState({ currentWeather, loadingCurrentWeather: false });
      })
      .catch(err => {
        console.log("details err", err);
      });
  };

  getForecast = ({ zipcode, coords }) => {
    let suffix = "";
    if (zipcode) {
      suffix = `zip=${zipcode}`;
    } else if (coords) {
      suffix = `lat=${coords.latitude}&lon=${coords.longitude}`;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&${suffix}`
    )
      .then(res => res.json())
      .then(forecast => {
        this.setState({
          forecast: groupForecastByDay(forecast.list),
          loadingForecast: false
        });
      })
      .catch(err => {
        console.log("forecast err", err);
      });
  };

  render() {
    const {
      currentWeather,
      loadingCurrentWeather,
      loadingForecast,
      forecast
    } = this.state;
    if (loadingCurrentWeather || loadingForecast) {
      return (
        <Container>
          <ActivityIndicator color="#fff" />
        </Container>
      );
    }

    const { main, weather } = currentWeather;
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
            <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
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

export default Details;
