import React, { useEffect } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import { useAtom } from "jotai";
import { playListDataStore } from "../../lib/store";
import PlayLists from "./PlayLists";
import {
  FEATURED_ALBUMS_ENDPOINT,
  mapAlbumsToPlaylistsResponse,
} from "../../lib/jamendo";

export default function FaeturedPlaylists() {
  const [, setPlayListStorage] = useAtom(playListDataStore);
  const { data: jamendoData } = useFetchApi(FEATURED_ALBUMS_ENDPOINT);

  useEffect(() => {
    //sync atom state with fetched data
    if (jamendoData?.results) {
      setPlayListStorage(mapAlbumsToPlaylistsResponse(jamendoData));
    }
  }, [jamendoData, setPlayListStorage]);

  return (
    <section className="flex flex-col justify-center gap-10 items-center">
      <PlayLists />
    </section>
  );
}
