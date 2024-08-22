import React from "react";
import { HeartIcon } from "../../components/HeartIcon";
import { useSetAtom } from "jotai";
import { favoriteTracksStore } from "../../lib/store";
import TrackNames from "./TrackNames";

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
    <div className="flex select-none w-full p-1 h-auto flex-row md:w-full  bg-green-100/50  rounded-md md:gap-10 sm:gap-6 gap-4  md:text-lg text-sm px-1  justify-between items-center">
      <img
        className="max-w-20 h-auto border-black border-2  rounded-sm"
        src={imageUrl}
        alt={name}
        loading="lazy"
      />

      <TrackNames name={name} artists={artists} />

      <div className="flex tracking-tighter max-w-4 px-1  flex-col   text-center ">
        <span> {popularity} </span>
      </div>

      <a
        className=" max-w-12 text-wrap text-center px-1 hover:underline "
        href={external_urls.spotify}
        rel="noopener noreferrer"
        target="_blank"
      >
        Open on Spotify
      </a>

      <div
        className={`cursor-pointer px-1   hover:text-red-100/50 }`}
        onClick={handleFav}
      >
        <HeartIcon fill={isFav ? "red" : "none"} />
      </div>
    </div>
  );
}
