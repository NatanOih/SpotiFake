import React from "react";
import Headline from "../../components/Headline";
import PlaylistItem from "./PlaylistItem";
import { useAtomValue } from "jotai";
import { playListDataStore } from "../../lib/store";

export default function PlayLists() {
  const playListsData = useAtomValue(playListDataStore);

  return (
    <>
      <Headline className="underline md:text-6xl  sm:text-5xl text-4xl text-nowrap text-center decoration-double">
        {playListsData?.message}
      </Headline>

      <div className="flex flex-wrap max-w-[75vw] justify-center items-center gap-14 p-10 ">
        {playListsData.playlists?.items.map((playlist) => {
          return <PlaylistItem playlistData={playlist} key={playlist.id} />;
        })}
      </div>
    </>
  );
}
