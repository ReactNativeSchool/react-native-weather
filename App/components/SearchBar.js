import React from "react";
import { View, TextInput, Image } from "react-native";

export const SearchBar = ({ ...props }) => (
  <View
    style={{
      flexDirection: "row",
      marginHorizontal: 10,
      marginVertical: 10,
      paddingHorizontal: 10,
      paddingVertical: 15,
      borderRadius: 10,
      backgroundColor: "#3145b7"
      // backgroundColor: "rgba(49, 69, 183, 0.75)"
    }}
  >
    <Image
      source={require("../assets/search.png")}
      resizeMode="contain"
      style={{
        width: 20,
        height: 20,
        marginRight: 10,
        tintColor: "rgba(255, 255, 255, 0.4)"
      }}
    />
    <TextInput
      style={{
        fontSize: 18,
        flex: 1,
        color: "#fff"
      }}
      placeholderTextColor="rgba(255, 255, 255, 0.4)"
      {...props}
    />
  </View>
);
