import React from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button";

import useFetchApi from "../../hooks/useFetchApi";

import Loading from "../../components/Loading";
import Error from "../../components/Error";

import PlayListContainer from "./PlayListContainer";

export default function PlayListPage() {
  const { playlistid } = useParams();
  const playlistURL = `https://api.spotify.com/v1/playlists/${playlistid}`;

  const { data: playListData, loading, error } = useFetchApi(playlistURL);

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center gap-10 p-10 items-center min-h-screen flex-col">
      <Link to="/">
        <Button>Go back</Button>
      </Link>

      <PlayListContainer playListData={playListData} />

      <Link to="/">
        <Button>Go back</Button>
      </Link>
    </div>
  );
}
