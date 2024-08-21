import React from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button";
import useFetchApi from "../../hooks/useFetchApi";
import TrackItem from "./TrackItem";
import { useAtomValue } from "jotai";
import { favoriteTracksStore } from "../../lib/store";

export default function PlayListPage() {
  const { playlistid } = useParams();
  const playlistURL = `https://api.spotify.com/v1/playlists/${playlistid}`;

  const { data: playListData, loading, error } = useFetchApi(playlistURL);

  const favTracks = useAtomValue(favoriteTracksStore);

  if (error) {
    return (
      <div>
        something went wrong - {error}
        <Link to="/">
          <Button>Home Page</Button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-xl flex justify-center items-center gap-4">
        Loading Playlists Items...
        <div className=" rounded-full border-0 border-t-2 w-4 h-4 animate-spin border-white " />
      </div>
    );
  }

  const { description, name, followers, id, images, tracks } = playListData;

  const imageUrl = images[0]?.url;

  return (
    <div className="flex justify-center gap-10 p-10 items-center min-h-screen flex-col">
      <span> {name} </span>
      <span> {description} </span>
      <span> followers: {followers.total} </span>
      <Link to="/">
        <Button>Go back</Button>
      </Link>
      <img
        className="max-w-full h-auto p-2 rounded-sm"
        src={imageUrl}
        alt={name}
        loading="lazy"
      />

      <div className="flex justify-start items-start flex-col gap-2 ">
        {tracks.items.map((item) => {
          return (
            <TrackItem
              key={item.track.id}
              isFav={!!favTracks[item.track.id]}
              trackData={item.track}
            />
          );
        })}
      </div>

      <Link to="/">
        <Button>Go back</Button>
      </Link>
    </div>
  );
}
