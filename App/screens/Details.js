import React from "react";
import {
  Image,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  SafeAreaView
} from "react-native";

import { getWeatherIcon } from "../util/icons";

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

class Details extends React.Component {
  state = {
    currentWeather: {},
    loadingCurrentWeather: true,
    forecast: {},
    loadingForecast: true
  };

  componentDidMount() {
    const zipcode = 37064;
    const apiKey = "1648e403f1e44103b747e25c55f8c2fb";
    // https://openweathermap.org/current
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}&units=imperial`
    )
      .then(res => res.json())
      .then(currentWeather => {
        // console.log("current weather res", currentWeather);
        this.setState({ currentWeather, loadingCurrentWeather: false });
      })
      .catch(err => {
        console.log("details err", err);
      });

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&appid=${apiKey}&units=imperial`
    )
      .then(res => res.json())
      .then(forecast => {
        // console.log("forecast res", forecast);
        this.setState({
          forecast: groupForecastByDay(forecast.list),
          loadingForecast: false
        });
      })
      .catch(err => {
        console.log("forecast err", err);
      });
  }

  render() {
    const {
      currentWeather,
      loadingCurrentWeather,
      loadingForecast,
      forecast
    } = this.state;
    if (loadingCurrentWeather || loadingForecast) {
      return <ActivityIndicator />;
    }

    const { main, weather } = currentWeather;
    return (
      <ScrollView>
        <SafeAreaView>
          <Image
            source={getWeatherIcon(weather[0].icon)}
            style={{ width: 300, height: 300 }}
            resizeMode="contain"
          />
          <Text style={{ textAlign: "center", fontSize: 40 }}>
            {`${main.temp}°`}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text>
              Low:
              {`${main.temp_min}°`}
            </Text>
            <Text>{`Humidity: ${main.humidity}%`}</Text>
            <Text>
              High:
              {`${main.temp_max}°`}
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            {forecast.map(f => (
              <View
                key={f.day}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text>{f.day}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "600" }}>{f.temp_max}</Text>
                  <Text>{f.temp_min}</Text>
                </View>
              </View>
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default Details;
