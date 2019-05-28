import React from "react";
import { FlatList, TextInput, Text } from "react-native";

class List extends React.Component {
  state = {
    query: ""
  };

  render() {
    return (
      <FlatList
        data={[]}
        ListHeaderComponent={(
          <React.Fragment>
            <TextInput
              value={this.state.query}
              onChangeText={query => {
                this.setState({ query });
              }}
              onSubmitEditing={() =>
                this.props.navigation.navigate("Details", {
                  zipcode: this.state.query
                })
              }
              style={{ backgroundColor: "#e4e4e4", padding: 20 }}
            />
            <Text>Recents</Text>
          </React.Fragment>
)}
      />
    );
  }
}

export default List;
