import React, { useEffect, useState } from "react";
import Headline from "../../components/Headline";
import SearchIcon from "../../components/SearchIcon";
import TrackItem from "./TrackItem";
import { useAtomValue } from "jotai";
import { favoriteTracksStore } from "../../lib/store";

export default function PlayListContainer({ playListData }) {
  const [searchTrack, setSearchTrack] = useState("");
  const [filteredData, setFilteredData] = useState({});

  const { description, name, followers, id, images, tracks } = playListData;
  const originalTracksArray = tracks.items;
  const imageUrl = images[0]?.url;
  const favTracks = useAtomValue(favoriteTracksStore);

  const titles = ["Image", "Title", "Popularity", "Link", "Favorites"];

  useEffect(() => {
    const filteredTracks = originalTracksArray.filter((track) => {
      const trackName = track.track.name;

      return trackName.includes(searchTrack);
    });

    console.log("filteredTracks", filteredTracks);
    setFilteredData(filteredTracks);
  }, [searchTrack, originalTracksArray]);

  const tracksToRender =
    searchTrack.length > 0 ? filteredData : originalTracksArray;
  console.log("tracksToRender", tracksToRender);

  return (
    <div>
      {" "}
      <div className="flex flex-col gap-2 justify-center items-center">
        <Headline> {name} </Headline>
        <span> {description} </span>
        <span> followers: {followers.total} </span>
        <img
          className="max-w-full h-auto p-2 rounded-lg"
          src={imageUrl}
          alt={name}
          loading="lazy"
        />
      </div>
      <div className="flex gap-2 justify-center items-center">
        <SearchIcon />
        <input
          placeholder="search track"
          className="bg-gray-300/30 p-1 rounded-lg"
          value={searchTrack}
          onChange={(e) => setSearchTrack(e.target.value)}
        />
      </div>
      <div className="flex select-none flex-row  p-1   rounded-md gap-10  md:text-lg text-sm px-4  justify-center items-center">
        {titles.map((x) => {
          return (
            <div className={`px-5 underline text-lg  text-center`} key={x}>
              {x}
            </div>
          );
        })}
      </div>
      <div className="flex justify-start items-start flex-col gap-2 ">
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
    </div>
  );
}
