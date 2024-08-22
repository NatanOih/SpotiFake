import React from "react";

import { useAtom } from "jotai";
import { currentPlayListUsedStore, playListDataStore } from "../../lib/store";
import useFilter from "../../hooks/useFilter";

import SearchBox from "../../components/SearchBox";
import PlayListMetaData from "./PlayListMetaData";
import TrackList from "./TrackList";
import PlaylistItem from "../HomePage/PlaylistItem";

export default function PlayListContainer() {
  const [playListData, setPlayListData] = useAtom(currentPlayListUsedStore);
  const [allPlayLists, setAllPlayLists] = useAtom(playListDataStore);
  const originalTracksArray = playListData.tracks?.items || [];

  const { searchInput, setSearchInput } = useFilter(originalTracksArray);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-row justify-center items-center">
        <div className="sm:flex flex-wrap overflow-y-auto p-2 absolute left-8 top-[5%] hidden overflow-x-hidden overscroll-auto sm:max-h-[50vh] xl:max-h-[80vh] lg:max-h-[55vh] w-[20vw] justify-center items-center gap-14 ">
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
        <PlayListMetaData />
      </div>
      <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} />

      <TrackList />
    </section>
  );
}
