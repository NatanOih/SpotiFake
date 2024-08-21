import React from "react";
import { HeartIcon } from "../../components/HeartIcon";
import { useAtom, useSetAtom } from "jotai";
import { favoriteTracksStore } from "../../lib/store";

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
    <div className="flex select-none flex-row w-full bg-green-300/20  rounded-md gap-10  md:text-lg text-sm px-2  justify-start items-center">
      <img
        className="max-w-20 h-auto p-1 rounded-sm"
        src={imageUrl}
        alt={name}
        loading="lazy"
      />

      <div className=" p-1 w-[15vw] gap-1 h-fit tracking-tighter rounded-md bg-red-300/20 text-center flex flex-col justify-center items-center  ">
        <span className="truncate w-full "> {name} </span>

        <span className="flex flex-wrap truncate w-full  justify-center items-center ">
          {artists.map((artist) => {
            return (
              <span className="truncate" key={artist.name}>
                {artist.name}
              </span>
            );
          })}{" "}
        </span>
      </div>

      <a href={external_urls.spotify} rel="noopener noreferrer" target="_blank">
        Open in Spotify
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
