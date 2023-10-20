import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { LctView, TitleText } from "./Shared";
import sharedStyles from "./styles";
import { ScrollView } from "react-native";
import { log } from "./utils";
import { StackNavParamList } from "./WatchlistTypes";
import { useWatchlistContext } from "./WatchlistContext";
import { WatchlistItemView } from "./WatchlistItemView";

type WatchlistListViewProps = StackScreenProps<
  StackNavParamList,
  "Watchlists"
>;

export function WatchlistListView({
  navigation,
}: WatchlistListViewProps) {
  const { watchlistList, addWatchlist } = useWatchlistContext();

  // log(`WatchlistListView: ${watchlistList}`);

  const handleViewWatchlist = (id: string) => {
    log(`handleViewWatchlist(${id})`);
    navigation.navigate("Watchlist", {
      watchlistId: id,
    });
  };
  return (
    <LctView style={sharedStyles.container}>
      <TitleText>Watchlists</TitleText>
      <ScrollView style={sharedStyles.scrollContainer}>
        {watchlistList.map((watchlist) => (
          <WatchlistItemView
            key={watchlist.id}
            watchlist={watchlist}
            onView={handleViewWatchlist}
          />
        ))}
      </ScrollView>
    </LctView>
  );
}
