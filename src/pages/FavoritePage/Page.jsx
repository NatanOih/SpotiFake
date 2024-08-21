import { useAtomValue } from "jotai";
import React from "react";
import { favoriteTracksStore } from "../../lib/store";
import TrackItem from "../PlaylistPage/TrackItem";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

export default function FavoritePage() {
  const favTracks = useAtomValue(favoriteTracksStore);
  console.log("favTracks", favTracks);

  if (!favTracks) {
    return <div></div>;
  }
  return (
    <div>
      <Link to="/">
        <Button>Go back</Button>
      </Link>

      {Object.entries(favTracks).map(([id, track]) => {
        return <TrackItem key={id} isFav={!!favTracks[id]} trackData={track} />;
      })}
    </div>
  );
}
