import React from "react";
import { View } from "react-native";

export const BasicRow = ({ children, style = {} }) => (
  <View
    style={[
      {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10
      },
      style
    ]}
  >
    {children}
  </View>
);
