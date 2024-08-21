import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const token = atomWithStorage("spotifyToken", null);

export const favoriteTracksStore = atomWithStorage("favoriteTracks", {});
