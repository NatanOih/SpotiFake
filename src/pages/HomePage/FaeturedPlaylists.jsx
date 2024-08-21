import React, { useEffect } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { useSetAtom } from "jotai";
import { playListDataStore } from "../../lib/store";
import PlayLists from "./PlayLists";

const ENDPOINT = "https://api.spotify.com/v1/browse/featured-playlists";

export default function FaeturedPlaylists() {
  const setPlayListStorage = useSetAtom(playListDataStore);
  const { data: playListsData, loading, error } = useFetchApi(ENDPOINT);

  useEffect(() => {
    if (error || loading) {
      return;
    }

    setPlayListStorage(playListsData);
  }, [error, loading, playListsData, setPlayListStorage]);

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="flex flex-col justify-center gap-10 items-center">
      <PlayLists />
    </section>
  );
}
