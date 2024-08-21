import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button";
import useFetchApi from "../../hooks/useFetchApi";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import PlayListContainer from "./PlayListContainer";

import { currentPlayListUsedStore } from "../../lib/store";
import { useAtom } from "jotai/react";

export default function PlayListPage() {
  const [currentPlayList, setCurrentPlayList] = useAtom(
    currentPlayListUsedStore
  );

  const { playlistid } = useParams();
  const playlistURL = `https://api.spotify.com/v1/playlists/${playlistid}`;

  const { data: playListData, loading, error } = useFetchApi(playlistURL);

  useEffect(() => {
    if (!loading && !error && playListData) {
      setCurrentPlayList(playListData);
    }
  }, [error, loading, playListData, setCurrentPlayList]);

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

      <PlayListContainer />

      <Link to="/">
        <Button>Go back</Button>
      </Link>
    </div>
  );
}
