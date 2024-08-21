import { useAtomValue } from "jotai";
import React from "react";
import { favoriteTracksStore } from "../../lib/store";
import TrackItem from "../PlaylistPage/TrackItem";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Headline from "../../components/Headline";

export default function FavoritePage() {
  const favTracks = useAtomValue(favoriteTracksStore);

  if (!favTracks) {
    return <div></div>;
  }
  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
      <Headline>Favorite Tracks</Headline>
      <Link to="/">
        <Button>Go back</Button>
      </Link>

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
  );
}
