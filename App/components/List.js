import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

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

export const SearchItem = ({ name, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      paddingHorizontal: 10,
      paddingVertical: 8,
      flexDirection: "row",
      justifyContent: "space-between"
    }}
  >
    <Text style={{ fontSize: 18, color: "#444" }}>{name}</Text>
  </TouchableOpacity>
);
