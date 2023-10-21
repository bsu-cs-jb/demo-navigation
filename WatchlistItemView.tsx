import React from "react";
import { BigButton, FlexFill, LabelText, LctView } from "./Shared";
import { Watchlist } from "./WatchlistTypes";
import { StyleSheet } from "react-native";

interface WatchListItemViewProps {
  watchlist: Watchlist;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}
export function WatchlistItemView({
  watchlist,
  onView,
  onEdit,
}: WatchListItemViewProps) {
  return (
    <LctView style={styles.watchlistItem}>
      <LabelText>{watchlist.name}</LabelText>
      <FlexFill />
      <BigButton title="Edit" onPress={() => onEdit(watchlist.id)} />
      <BigButton title="View" onPress={() => onView(watchlist.id)} />
    </LctView>
  );
}

export const styles = StyleSheet.create({
  watchlistItem: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
});
