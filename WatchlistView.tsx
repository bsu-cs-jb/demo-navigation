import React from "react";
import { LctView, SubtitleText, TitleText } from "./Shared";
import sharedStyles from "./styles";
import { ScrollView } from "react-native";
import { log } from "./utils";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavParamList } from "./WatchlistTypes";
import { useWatchlistContext } from "./WatchlistContext";

type WatchlistViewProps = StackScreenProps<
  StackNavParamList,
  "Watchlist"
>;
export function WatchlistView({
  navigation,
  route,
}: WatchlistViewProps) {
  const { watchlistList } = useWatchlistContext();
  const { watchlistId } = route.params;
  log(`WatchlistView(): ${watchlistId}`);
  const watchlist = watchlistList.find((wl) => wl.id === watchlistId);
  // console.log(route.params);
  return (
    <LctView style={sharedStyles.container}>
      <TitleText>Watchlist: {watchlist?.name}</TitleText>
      <ScrollView style={sharedStyles.scrollContainer}>
        <SubtitleText>Stock 1</SubtitleText>
        <SubtitleText>Stock 2</SubtitleText>
        <SubtitleText>Stock 3</SubtitleText>
        <SubtitleText>Stock 4</SubtitleText>
      </ScrollView>
    </LctView>
  );
}
