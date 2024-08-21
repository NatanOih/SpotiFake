import React from "react";
import { HeartIcon } from "../../components/HeartIcon";
import { useSetAtom } from "jotai";
import { favoriteTracksStore } from "../../lib/store";
import TrackTitles from "./TrackTitles";

export default function TrackItem({ trackData, isFav = false }) {
  const setFavoriteTracks = useSetAtom(favoriteTracksStore);

  const { id, popularity, artists, name, album, external_urls } = trackData;
  const imageUrl = album.images[0].url;

  const handleFav = () => {
    setFavoriteTracks((prev) => {
      if (prev[id]) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [id]: {
          popularity,
          artists,
          name,
          album,
          id,
          external_urls,
        },
      };
    });
  };
  return (
    <div className="flex select-none p-1 h-auto flex-row md:w-full w-fit bg-green-100/30  rounded-md md:gap-10 sm:gap-6 gap-4  md:text-lg text-sm px-2  md:justify-between items-center">
      <img
        className="max-w-20 h-auto border-black border-2  rounded-sm"
        src={imageUrl}
        alt={name}
        loading="lazy"
      />

      <TrackTitles name={name} artists={artists} />

      <div className="flex flex-col justify-center text-center items-center">
        <span>Popularity:</span>
        <span> {popularity} </span>
      </div>

      <a href={external_urls.spotify} rel="noopener noreferrer" target="_blank">
        Open on Spotify
      </a>

      <div
        className={`cursor-pointer px-2   hover:text-red-100/50 }`}
        onClick={handleFav}
      >
        <HeartIcon fill={isFav ? "red" : "none"} />
      </div>
    </div>
  );
}
