import { useAtom } from "jotai/react";
import React, { useEffect, useState } from "react";
import { favoriteTracksStore, tracksToRenderStore } from "../../lib/store";
import TrackItem from "./TrackItem";
import SortIcon from "../../components/SortIcon";
import Loading from "../../components/Loading";

export default function TrackList() {
  const [tracksToRender, _] = useAtom(tracksToRenderStore);

  const [RenderList, setRenderList] = useState([]);

  const [sorted, setSorted] = useState(false);
  const [favTracks, _2] = useAtom(favoriteTracksStore);

  const titles = ["Image", "Title", "Popularity", "Link", "Favorites"];

  useEffect(() => {
    setRenderList(tracksToRender);
  }, [tracksToRender]);

  const handleSort = () => {
    const sortedTracks = [...tracksToRender];
    if (sorted) {
      sortedTracks.sort((a, b) => a.track.popularity - b.track.popularity);
      setSorted(false);
    } else {
      sortedTracks.sort((a, b) => b.track.popularity - a.track.popularity);
      setSorted(true);
    }
    setRenderList(sortedTracks);
  };

  if (tracksToRender.length < 1) {
    return <Loading />;
  }

  if (RenderList.length < 1) {
    return <Loading />;
  }

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
      {RenderList?.length ? (
        RenderList.map((item, index) => {
          const track = item?.track;
          if (!track) {
            return null;
          }
          return (
            <TrackItem
              key={track.id || index}
              isFav={!!favTracks[track.id]}
              // isFav={false}
              trackData={track}
            />
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
}
