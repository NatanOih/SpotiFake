import { useAtomValue } from "jotai";
import React from "react";
import { darkModeStorage, favoriteTracksStore } from "../../lib/store";
import TrackItem from "../PlaylistPage/TrackItem";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Headline from "../../components/Headline";
import Nav from "../../components/Nav";
import Nav2 from "../../components/Nav2";

export default function FavoritePage() {
  const darkMode = useAtomValue(darkModeStorage);
  const favTracks = useAtomValue(favoriteTracksStore);

  if (!favTracks) {
    return <div></div>;
  }
  return (
    <>
      <Nav />
      <div
        className={`min-h-screen ${
          !darkMode && "bg-[#f5deb3]/90 text-black/80"
        } flex flex-col gap-4 justify-center font-bold items-center`}
      >
        <h1 className="text-4xl">Favorite Tracks</h1>

        {Object.keys(favTracks).length === 0 && (
          <div>No favorite tracks, Try to add some</div>
        )}

        <div className="flex flex-col gap-4">
          {Object.entries(favTracks).map(([id, track]) => {
            return (
              <TrackItem key={id} isFav={!!favTracks[id]} trackData={track} />
            );
          })}
        </div>
      </div>
    </>
  );
}
