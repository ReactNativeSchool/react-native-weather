import React from "react";
import { View } from "react-native";

export const Container = ({ children }) => (
  <View style={{ flex: 1, backgroundColor: "#3145b7" }}>{children}</View>
);
