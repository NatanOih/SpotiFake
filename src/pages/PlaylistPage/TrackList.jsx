import { useAtom } from "jotai/react";
import React, { useEffect, useState } from "react";
import { favoriteTracksStore, tracksToRenderStore } from "../../lib/store";
import TrackItem from "./TrackItem";
import SortIcon from "../../components/SortIcon";
import Loading from "../../components/Loading";
import { areArraysEqual } from "../../lib/helpers";

export default function TrackList() {
  const [tracksToRender, setTracksToRender] = useAtom(tracksToRenderStore);
  const [favTracks, setFavTracks] = useAtom(favoriteTracksStore);
  const [sorted, setSorted] = useState(false);

  const titles = ["Image", "Title", "Popularity", "Link", "Favorites"];

  const handleSort = () => {
    const sortedTracks = [...tracksToRender];
    if (sorted) {
      sortedTracks.sort((a, b) => a.track.popularity - b.track.popularity);
    } else {
      sortedTracks.sort((a, b) => b.track.popularity - a.track.popularity);
    }
    setTracksToRender(sortedTracks);
    setSorted(!sorted);
  };

  if (!tracksToRender) {
    return <Loading />;
  }

  return (
    <div className="flex select-none rounded-md border-2 border-black max-h-[50vh] bg-yellow-200/10 items-center  overflow-y-scroll overscroll-auto p-3  flex-col gap-4 ">
      <div className="flex flex-row   justify-between px-5">
        {titles.map((title) => {
          return (
            <div
              className="flex min-w-14 flex-row px-4 justify-center gap-2 items-center "
              key={title}
            >
              <span>{title}</span>
              {title === "Popularity" && (
                <div
                  className="cursor-pointer hover:text-red-700"
                  onClick={handleSort}
                >
                  <SortIcon />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {tracksToRender?.length ? (
        tracksToRender.map((item, index) => {
          const track = item?.track;
          if (!track) {
            return null;
          }
          return (
            <TrackItem
              key={track.id || index}
              isFav={!!favTracks[track.id]}
              trackData={track}
            />
          );
        })
      ) : (
        <div className="w-full "></div>
      )}
    </div>
  );
}
