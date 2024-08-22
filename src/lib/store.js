import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const token = atomWithStorage("spotifyToken", null);

export const favoriteTracksStore = atomWithStorage("favoriteTracksStore", {});
export const playListDataStore = atomWithStorage("playListDataStore", {});
export const currentPlayListUsedStore = atomWithStorage(
  "currentPlayListUsedStore",
  {}
);

export const tracksToRenderStore = atomWithStorage("tracksToRenderStore", []);
export const darkModeStorage = atomWithStorage("darkModeStorage", true);
