import { useAtomValue } from "jotai/react";
import React from "react";
import { favoriteTracksStore } from "../../lib/store";
import TrackItem from "./TrackItem";

export default function TrackList({ tracksToRender }) {
  const titles = ["Image", "Title", "Popularity", "Link", "Favorites"];
  const favTracks = useAtomValue(favoriteTracksStore);
  return (
    <div className="flex rounded-sm border-2 border-black max-h-[50vh] bg-yellow-200/10  overflow-y-scroll overscroll-auto p-3  flex-col gap-4 ">
      <div className="flex flex-row justify-between px-5">
        {titles.map((title) => {
          return <span key={title}>{title}</span>;
        })}
      </div>
      {tracksToRender.map((item) => {
        return (
          <TrackItem
            key={item.track.id}
            isFav={!!favTracks[item.track.id]}
            trackData={item.track}
          />
        );
      })}
    </div>
  );
}
