import React from "react";
import { FlatList, Text, View } from "react-native";

import { SearchBar } from "../components/SearchBar";
import { SearchItem } from "../components/List";
import { getRecentSearch } from "../util/recentSearch";

class Search extends React.Component {
  state = {
    query: "",
    searchHistory: []
  };

  componentDidMount() {
    getRecentSearch().then(searchHistory => {
      this.setState({ searchHistory });
    });
  }

  render() {
    return (
      <FlatList
        data={this.state.searchHistory}
        renderItem={({ item }) => (
          <SearchItem
            {...item}
            onPress={() =>
              this.props.navigation.navigate("Details", {
                lat: item.lat,
                lon: item.lon
              })
            }
          />
        )}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={(
          <View>
            <SearchBar
              value={this.state.query}
              onChangeText={query => {
                this.setState({ query });
              }}
              searchButtonEnabled={this.state.query.length >= 5}
              onSearch={() =>
                this.props.navigation.navigate("Details", {
                  zipcode: this.state.query
                })
              }
              placeholder="Zipcode"
            />
            <Text
              style={{
                marginHorizontal: 10,
                fontSize: 16,
                color: "#aaa",
                marginTop: 10,
                marginBottom: 5
              }}
            >
              Recents
            </Text>
          </View>
)}
      />
    );
  }
}

export default Search;
