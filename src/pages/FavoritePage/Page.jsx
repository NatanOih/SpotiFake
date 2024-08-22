import { useAtom, useAtomValue } from "jotai";
import React from "react";
import {
  darkModeStorage,
  favoriteTracksStore,
  playListDataStore,
} from "../../lib/store";
import TrackItem from "../PlaylistPage/TrackItem";

import Nav from "../../components/Nav";
import PlaylistItem from "../HomePage/PlaylistItem";

export default function FavoritePage() {
  const darkMode = useAtomValue(darkModeStorage);
  const favTracks = useAtomValue(favoriteTracksStore);
  const [allPlayLists, setAllPlayLists] = useAtom(playListDataStore);

  if (!favTracks) {
    return <div></div>;
  }
  return (
    <>
      <Nav />
      <div
        className={`h-[80vh] ${
          !darkMode && "bg-[#f5deb3]/90 text-black/80"
        } flex flex-col gap-4 justify-center font-bold items-center`}
      >
        <h1 className="text-4xl">Favorite Tracks</h1>

        {Object.keys(favTracks).length === 0 && (
          <div>No favorite tracks, Try to add some</div>
        )}

        <div className="sm:flex flex-wrap overflow-y-auto p-2 absolute left-8 top-[12%] hidden overflow-x-hidden overscroll-auto sm:max-h-[45vh] xl:max-h-[80vh] lg:max-h-[55vh] w-[20vw] justify-center items-center gap-6 text-sm  ">
          {allPlayLists.playlists?.items?.map((playlist) => {
            return (
              <PlaylistItem
                enableTooltip={false}
                playlistData={playlist}
                key={playlist.id}
              />
            );
          })}
        </div>

        <div className="flex flex-col max-h-[45vh] overflow-auto p-2 gap-4">
          {Object.entries(favTracks).map(([id, track]) => {
            return (
              <TrackItem
                enableDeleteIcon={true}
                key={id}
                isFav={!!favTracks[id]}
                trackData={track}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
