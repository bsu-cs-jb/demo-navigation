export interface Watchlist {
  name: string;
  id: string;
}

export type StackNavParamList = {
  Watchlists: never;
  Watchlist: {
    watchlistId: string;
  };
  EditWatchlist: {
    watchlist: Watchlist;
  };
};
