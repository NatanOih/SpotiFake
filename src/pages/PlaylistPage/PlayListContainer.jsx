import React from "react";

import { useAtomValue } from "jotai";
import { currentPlayListUsedStore, playListDataStore } from "../../lib/store";
import useFilter from "../../hooks/useFilter";
import SortIcon from "../../components/SortIcon";
import SearchBox from "../../components/SearchBox";
import PlayListMetaData from "./PlayListMetaData";
import TrackList from "./TrackList";
import PlaylistItem from "../HomePage/PlaylistItem";

export default function PlayListContainer() {
  const playListData = useAtomValue(currentPlayListUsedStore);
  const ALLplayLists = useAtomValue(playListDataStore);
  const originalTracksArray = playListData.tracks?.items;

  const { searchInput, setSearchInput, tracksToRender } =
    useFilter(originalTracksArray);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-row justify-center items-center">
        <div className="sm:flex flex-wrap overflow-y-auto p-2 absolute left-8 top-[5%] hidden overflow-x-hidden overscroll-auto sm:max-h-[50vh] xl:max-h-[80vh] lg:max-h-[55vh] w-[20vw] justify-center items-center gap-14 ">
          {ALLplayLists.playlists?.items.map((playlist) => {
            return (
              <PlaylistItem
                enableTooltip={false}
                playlistData={playlist}
                key={playlist.id}
              />
            );
          })}
        </div>
        <PlayListMetaData playListData={playListData} />
      </div>
      <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} />

      <TrackList tracksToRender={tracksToRender} />
    </section>
  );
}
