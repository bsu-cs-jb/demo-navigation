import "react-native-gesture-handler";
import React, {
  PropsWithChildren,
  useState,
  createContext,
  useContext,
} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { genid } from "./utils";
import { StackNavParamList } from "./WatchlistTypes";
import { WatchlistsProvider } from "./WatchlistContext";
import { WatchlistListView } from "./WatchlistListView";
import { WatchlistView } from "./WatchlistView";

const Stack = createStackNavigator<StackNavParamList>();

export default function StackNavDemo() {
  return (
    <WatchlistsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Watchlists">
          <Stack.Screen
            name="Watchlists"
            component={WatchlistListView}
          />
          <Stack.Screen name="Watchlist" component={WatchlistView} />
        </Stack.Navigator>
      </NavigationContainer>
    </WatchlistsProvider>
  );
}

export const styles = StyleSheet.create({
  watchlistItem: {
    flex: 1,
    flexDirection: "row",
  },
});
