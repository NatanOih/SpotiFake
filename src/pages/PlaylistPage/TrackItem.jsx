import React from "react";
import { HeartIcon } from "../../components/HeartIcon";
import { PlayIcon } from "../../components/PlayIcon";
import ImageWithLoader from "../../components/ImageWithLoader";
import { useAtom, useSetAtom } from "jotai";
import { favoriteTracksStore, nowPlayingStore } from "../../lib/store";
import TrackNames from "./TrackNames";
import { DeleteIcon } from "../../components/DeleteIcon";

function formatDuration(totalSeconds) {
  if (!Number.isFinite(totalSeconds)) {
    return "--:--";
  }
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function TrackItem({
  enableDeleteIcon = false,
  trackData,
  isFav = false,
}) {
  const setFavoriteTracks = useSetAtom(favoriteTracksStore);
  const [nowPlaying, setNowPlaying] = useAtom(nowPlayingStore);

  const { id, duration, artists, name, album, audio, external_urls } =
    trackData;
  const imageUrl = album.images[0].url;
  const isPlaying = nowPlaying?.id === id;

  const handleFav = () => {
    setFavoriteTracks((prev) => {
      if (prev[id]) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [id]: {
          duration,
          artists,
          name,
          album,
          audio,
          id,
          external_urls,
        },
      };
    });
  };

  const handlePlay = () => {
    setNowPlaying({
      id,
      name,
      artistName: artists.map((artist) => artist.name).join(", "),
      image: imageUrl,
      audio,
    });
  };
  return (
    <div
      className={`flex select-none w-full p-1 h-auto flex-row md:w-full rounded-lg shadow-sm hover:shadow-md md:gap-10 sm:gap-6 gap-4 md:text-lg text-sm px-2 py-1.5 justify-between items-center transition-all ${
        isPlaying
          ? "bg-green-700/60 ring-1 ring-green-400/60"
          : "bg-green-100/50 hover:bg-green-100/80"
      }`}
    >
      <div className="relative rounded-md overflow-hidden shadow">
        <ImageWithLoader
          src={imageUrl}
          alt={name}
          containerClassName="w-20 h-20"
          className="w-full h-full object-cover"
        />
        <button
          onClick={handlePlay}
          aria-label={`Play ${name}`}
          className={`absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity text-white ${
            isPlaying ? "opacity-100" : ""
          }`}
        >
          <PlayIcon className={isPlaying ? "text-green-400" : ""} />
        </button>
      </div>

      <TrackNames name={name} artists={artists} />

      <div className="flex tracking-tighter max-w-4 px-1  flex-col   text-center ">
        <span> {formatDuration(duration)} </span>
      </div>

      <a
        className=" max-w-12 leading-5 items-center justify-center flex text-wrap text-center pl-6 hover:underline "
        href={external_urls.jamendo}
        rel="noopener noreferrer"
        target="_blank"
      >
        Open on Jamendo
      </a>

      <div
        className={`cursor-pointer px-1   hover:text-red-100/50 }`}
        onClick={handleFav}
      >
        {enableDeleteIcon ? (
          <DeleteIcon />
        ) : (
          <HeartIcon fill={isFav ? "red" : "none"} />
        )}
      </div>
    </div>
  );
}
