import React from "react";
import { FlatList, Text, View } from "react-native";

import { SearchBar } from "../components/SearchBar";
import { SearchItem } from "../components/List";

class Search extends React.Component {
  state = {
    query: ""
  };

  render() {
    return (
      <FlatList
        data={[{ id: 123, name: "Franklin" }, { id: 321, name: "Nashville" }]}
        renderItem={({ item }) => <SearchItem {...item} />}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={(
          <View>
            <SearchBar
              value={this.state.query}
              onChangeText={query => {
                this.setState({ query });
              }}
              onSubmitEditing={() =>
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
