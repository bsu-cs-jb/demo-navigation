import "react-native-gesture-handler";
import React, {
  PropsWithChildren,
  useState,
  createContext,
  useContext,
} from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StackScreenProps,
  createStackNavigator,
} from "@react-navigation/stack";
import {
  BigButton,
  FlexFill,
  LabelText,
  LctView,
  SubtitleText,
  TitleText,
} from "./Shared";
import sharedStyles from "./styles";
import { StyleSheet, ScrollView } from "react-native";
import { genid, log } from "./utils";

interface Watchlist {
  name: string;
  id: string;
}

interface WatchlistContext {
  watchlistList: Watchlist[];
  addWatchlist: (name?: string) => void;
}

const WatchlistsContext = createContext<WatchlistContext>({
  watchlistList: [],
  addWatchlist: () => null,
});

const useWatchlistContext = () => {
  return useContext(WatchlistsContext);
};

function WatchlistsProvider({ children }: PropsWithChildren) {
  const [watchlistList, setWatchlistList] = useState<Watchlist[]>([]);

  const handleAddWatchlist = (name?: string) => {
    setWatchlistList([
      ...watchlistList,
      {
        id: genid(),
        name: name || `New List ${watchlistList.length}`,
      },
    ]);
  };

  const watchlistContext: WatchlistContext = {
    watchlistList: [],
    addWatchlist: handleAddWatchlist,
  };

  return (
    <WatchlistsContext.Provider value={watchlistContext}>
      {children}
    </WatchlistsContext.Provider>
  );
}

export type StackNavParamList = {
  Watchlists: {};
  Watchlist: {
    watchlistId: string;
  };
  EditWatchlist: {
    watchlist: Watchlist;
  };
};

const Stack = createStackNavigator<StackNavParamList>();
interface WatchListItemViewProps {
  watchlist: Watchlist;
  onView: (id: string) => void;
}

function WatchlistItemView({
  watchlist,
  onView,
}: WatchListItemViewProps) {
  return (
    <LctView style={styles.watchlistItem}>
      <LabelText>{watchlist.name}</LabelText>
      <FlexFill />
      <BigButton title="View" onPress={() => onView(watchlist.id)} />
    </LctView>
  );
}

interface WatchlistListViewProps {
  navigation: StackScreenProps<StackNavParamList, "Watchlists">;
}

function WatchlistListView({ navigation }: WatchlistListViewProps) {
  const handleViewWatchlist = (id: string) => {
    log(`handleViewWatchlist(${id})`);
  };
  const { watchlistList, addWatchlist } = useWatchlistContext();

  return (
    <LctView style={sharedStyles.container}>
      <TitleText>Watchlists</TitleText>
      <ScrollView style={sharedStyles.scrollContainer}>
        {watchlistList.map((watchlist) => (
          <WatchlistItemView
            watchlist={{ name: "Hot Picks", id: "d23" }}
            onView={handleViewWatchlist}
          />
        ))}
      </ScrollView>
    </LctView>
  );
}

function WatchlistView() {
  return (
    <LctView style={sharedStyles.container}>
      <TitleText>Watchlists</TitleText>
      <ScrollView style={sharedStyles.scrollContainer}>
        <SubtitleText>Stock 1</SubtitleText>
        <SubtitleText>Stock 2</SubtitleText>
        <SubtitleText>Stock 3</SubtitleText>
        <SubtitleText>Stock 4</SubtitleText>
      </ScrollView>
    </LctView>
  );
}

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

const styles = StyleSheet.create({
  watchlistItem: {
    flex: 1,
    flexDirection: "row",
  },
});
