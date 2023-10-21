import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { BigButton, LctView, TitleText } from "./Shared";
import sharedStyles from "./styles";
import { ScrollView, StyleSheet } from "react-native";
import { StackNavParamList } from "./WatchlistTypes";
import { useWatchlistContext } from "./WatchlistContext";
import { WatchlistItemView } from "./WatchlistItemView";
import { EditWatchlistModal } from "./EditWatchlistModal";

type WatchlistListViewProps = StackScreenProps<
  StackNavParamList,
  "Watchlists"
>;

export function WatchlistListView({
  navigation,
}: WatchlistListViewProps) {
  const { watchlistList, addWatchlist } = useWatchlistContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [editName, setEditName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const handleAddList = () => {
    setEditId(null);
    setEditName(`New List ${watchlistList.length}`);
    setModalVisible(true);
  };

  const handleSaveList = (name: string) => {
    setModalVisible(false);
    if (editId) {
      // TODO: Update watchlist
      const watchlist = watchlistList.find((wl) => wl.id === editId);
      if (watchlist) {
        watchlist.name = name;
      }
    } else {
      addWatchlist(name);
    }
  };

  const handleCancelEdit = () => {
    setModalVisible(false);
  };

  const handleEditWatchlist = (id: string) => {
    const watchlist = watchlistList.find((wl) => wl.id === id);
    if (watchlist) {
      setEditId(watchlist.id);
      setEditName(watchlist.name);
      setModalVisible(true);
    }
  };
  const handleViewWatchlist = (id: string) => {
    navigation.navigate("Watchlist", {
      watchlistId: id,
    });
  };
  return (
    <LctView style={sharedStyles.screenContainer}>
      <EditWatchlistModal
        name={editName}
        visible={modalVisible}
        onSave={handleSaveList}
        onCancel={handleCancelEdit}
      />
      <TitleText>Watchlists</TitleText>
      <ScrollView
        style={sharedStyles.scrollContainer}
        contentContainerStyle={styles.watchlistContainer}
      >
        {watchlistList.map((watchlist) => (
          <WatchlistItemView
            key={watchlist.id}
            watchlist={watchlist}
            onView={handleViewWatchlist}
            onEdit={handleEditWatchlist}
          />
        ))}
      </ScrollView>
      <BigButton title="Add List" onPress={handleAddList} />
    </LctView>
  );
}

export const styles = StyleSheet.create({
  watchlistContainer: {
    alignSelf: "flex-start",
    width: "100%",
    gap: 8,
  },
});
