import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { StackNavParamList } from "./WatchlistTypes";
import { WatchlistsProvider } from "./WatchlistContext";
import { WatchlistListView } from "./WatchlistListView";
import { WatchlistView } from "./WatchlistView";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator<StackNavParamList>();

export default function StackNavDemo() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <WatchlistsProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Watchlists">
            <Stack.Screen
              name="Watchlists"
              component={WatchlistListView}
            />
            <Stack.Screen
              name="Watchlist"
              component={WatchlistView}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </WatchlistsProvider>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
