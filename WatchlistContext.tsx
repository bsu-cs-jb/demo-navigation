import React, {
  PropsWithChildren,
  useState,
  createContext,
  useContext,
} from "react";
import { genid } from "./utils";
import { Watchlist } from "./WatchlistTypes";

interface WatchlistContext {
  watchlistList: Watchlist[];
  addWatchlist: (name?: string) => void;
}
const WatchlistsContext = createContext<WatchlistContext>({
  watchlistList: [],
  addWatchlist: () => null,
});

export const useWatchlistContext = () => {
  return useContext(WatchlistsContext);
};

export function WatchlistsProvider({ children }: PropsWithChildren) {
  const [watchlistList, setWatchlistList] = useState<Watchlist[]>([
    {
      id: genid(),
      name: "FAANG",
    },
    {
      id: genid(),
      name: "Meme Stonks",
    },
    {
      id: genid(),
      name: "Media",
    },
  ]);

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
    watchlistList: watchlistList,
    addWatchlist: handleAddWatchlist,
  };

  return (
    <WatchlistsContext.Provider value={watchlistContext}>
      {children}
    </WatchlistsContext.Provider>
  );
}
