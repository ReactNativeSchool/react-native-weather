import React from "react";
import { View, Image } from "react-native";

import { getWeatherIcon } from "../util/icons";

export const WeatherIcon = ({ icon }) => (
  <View style={{ alignItems: "center" }}>
    <Image
      source={getWeatherIcon(icon)}
      style={{ width: 200, height: 200, tintColor: "#fff" }}
      resizeMode="contain"
    />
  </View>
);
