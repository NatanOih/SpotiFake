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
import TrackList from "../PlaylistPage/TrackList";
import SortIcon from "../../components/SortIcon";

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
        className={`min-h-screen ${
          !darkMode && "bg-[#f5deb3]/90 text-black/80"
        } flex flex-col gap-4 justify-center font-bold items-center`}
      >
        <h1 className="text-4xl">Favorite Tracks</h1>

        {Object.keys(favTracks).length === 0 && (
          <div>No favorite tracks, Try to add some</div>
        )}

        <div className="flex select-none rounded-md border-2 border-black max-h-[50vh]  bg-orange-700/60 items-center  p-2  flex-col gap-4 ">
          <div className="flex flex-row w-full gap-4 justify-between items-center text-center px-1">
            <span className="w-20"> Image </span>
            <span className=" pl-10 w-[20vw]"> Titles </span>
            <span className="flex flex-row justify-center gap-1 items-center">
              Popularity
              <div
                className="cursor-pointer hover:text-red-700"
                // onClick={handleSort}
              >
                <SortIcon />
              </div>
            </span>
            <span className="w-10 pr-4"> Link </span>
            <span className="w-10"> </span>
          </div>
        </div>

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

        <div
          className={`${
            !darkMode && "bg-black/80"
          } flex flex-col max-h-[45vh] overflow-auto p-4 rounded-md gap-4`}
        >
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
