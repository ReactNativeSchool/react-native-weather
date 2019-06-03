import { AsyncStorage } from "react-native";

// import AsyncStorage from '@react-native-community/async-storage';
// yarn add @react-native-community/async-storage
// react-native link @react-native-community/async-storage

const KEY = "@WeatherApp/searchHistory";

export const getRecentSearch = () =>
  AsyncStorage.getItem(KEY).then(str => {
    if (str) {
      return JSON.parse(str);
    }

    return [];
  });

export const addRecentSearch = item =>
  getRecentSearch().then(history => {
    const oldHistory = history.filter(
      existingItem => existingItem.id !== item.id
    );
    const newHistory = [item, ...oldHistory];

    return AsyncStorage.setItem(KEY, JSON.stringify(newHistory));
  });
