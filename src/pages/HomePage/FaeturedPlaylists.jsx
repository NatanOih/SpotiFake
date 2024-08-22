import React, { useEffect } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import { useAtom } from "jotai";
import { playListDataStore } from "../../lib/store";
import PlayLists from "./PlayLists";

const ENDPOINT = "https://api.spotify.com/v1/browse/featured-playlists";

export default function FaeturedPlaylists() {
  const [, setPlayListStorage] = useAtom(playListDataStore);
  const { data: playListsData } = useFetchApi(ENDPOINT);

  useEffect(() => {
    //sync atom state with fetched data
    if (playListsData) {
      setPlayListStorage(playListsData);
    }
  }, [playListsData, setPlayListStorage]);

  return (
    <section className="flex flex-col justify-center gap-10 items-center">
      <PlayLists />
    </section>
  );
}
