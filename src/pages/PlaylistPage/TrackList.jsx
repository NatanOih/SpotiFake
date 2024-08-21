import { useAtomValue } from "jotai/react";
import React, { useState } from "react";
import { favoriteTracksStore } from "../../lib/store";
import TrackItem from "./TrackItem";
import SortIcon from "../../components/SortIcon";

export default function TrackList({ tracksToRender }) {
  const [RenderList, setRenderList] = useState(tracksToRender);
  const [sorted, setSorted] = useState(false);
  const titles = ["Image", "Title", "Popularity", "Link", "Favorites"];
  const favTracks = useAtomValue(favoriteTracksStore);

  const handleSort = () => {
    if (sorted) {
      tracksToRender.sort((a, b) => a.track.popularity - b.track.popularity);
      setSorted(false);
    } else {
      setRenderList(
        tracksToRender.sort((a, b) => b.track.popularity - a.track.popularity)
      );
      setSorted(true);
    }
  };
  return (
    <div className="flex select-none rounded-sm border-2 border-black max-h-[50vh] bg-yellow-200/10  overflow-y-scroll overscroll-auto p-3  flex-col gap-4 ">
      <div className="flex flex-row justify-between px-5">
        {titles.map((title) => {
          return (
            <span className="flex flex-row gap-2" key={title}>
              {title}
              {title === "Popularity" && (
                <div
                  className="cursor-pointer hover:text-red-200"
                  onClick={handleSort}
                >
                  <SortIcon />
                </div>
              )}
            </span>
          );
        })}
      </div>
      {RenderList.map((item) => {
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
