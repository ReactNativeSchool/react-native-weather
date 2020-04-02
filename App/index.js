import React from "react";
import { TouchableOpacity, Image, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createCompatNavigatorFactory } from "@react-navigation/compat";

import Details from "./screens/Details";
import Search from "./screens/Search";

const HeaderRightButton = ({ onPress, style, icon }) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      source={icon}
      resizeMode="contain"
      style={[
        {
          marginRight: 10,
          width: 20,
          height: 20,
          tintColor: "#fff"
        },
        style
      ]}
    />
  </TouchableOpacity>
);

const AppStack = createCompatNavigatorFactory(createStackNavigator)(
  {
    Details: {
      screen: Details,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.getParam("title", ""),
        headerRight: () => (
          <>
            <StatusBar barStyle="light-content" />
            <HeaderRightButton
              icon={require("./assets/search.png")}
              onPress={() => navigation.navigate("Search")}
            />
          </>
        ),
        headerStyle: {
          backgroundColor: "#3145b7",
          borderBottomColor: "#3145b7"
        },
        headerTintColor: "#fff"
      })
    },
    Search: {
      screen: Search,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Search",
        headerRight: () => (
          <>
            <StatusBar barStyle="dark-content" />
            <HeaderRightButton
              icon={require("./assets/close.png")}
              onPress={() => navigation.popToTop()}
              style={{ tintColor: "#000" }}
            />
          </>
        ),
        headerLeft: null
      })
    }
  },
  {
    mode: "modal"
  }
);

export default () => (
  <NavigationContainer>
    <AppStack />
  </NavigationContainer>
);
