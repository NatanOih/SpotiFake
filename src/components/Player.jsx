import React from "react";
import { useAtom } from "jotai";
import { nowPlayingStore } from "../lib/store";
import Xicon from "./Xicon";

export default function Player() {
  const [nowPlaying, setNowPlaying] = useAtom(nowPlayingStore);

  if (!nowPlaying) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-row flex-wrap gap-3 items-center bg-black/95 text-white p-3 border-t-2 border-black">
      <img
        src={nowPlaying.image}
        alt={nowPlaying.name}
        className="w-12 h-12 rounded-sm object-cover"
      />
      <div className="flex flex-col truncate max-w-[35vw]">
        <span className="truncate font-bold text-sm">{nowPlaying.name}</span>
        <span className="truncate text-xs text-gray-400">
          {nowPlaying.artistName}
        </span>
      </div>

      <audio
        key={nowPlaying.id}
        src={nowPlaying.audio}
        controls
        autoPlay
        className="flex-1 min-w-[200px]"
        onEnded={() => setNowPlaying(null)}
      />

      <button
        onClick={() => setNowPlaying(null)}
        className="text-gray-400 hover:text-white"
        aria-label="Close player"
      >
        <Xicon />
      </button>
    </div>
  );
}
