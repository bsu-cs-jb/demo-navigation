export interface Watchlist {
  name: string;
  id: string;
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
