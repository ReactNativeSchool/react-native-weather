import { createAppContainer, createStackNavigator } from "react-navigation";

import List from "./screens/List";
import Details from "./screens/Details";

const AppStack = createStackNavigator(
  {
    List: {
      screen: List,
      navigationOptions: {
        headerTitle: "List"
      }
    },
    Details: {
      screen: Details,
      navigationOptions: {
        headerTitle: "Details"
      }
    }
  },
  {
    initialRouteName: "Details"
  }
);

export default createAppContainer(AppStack);
