import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import useFetchApi from "../../hooks/useFetchApi";

import PlayListContainer from "./PlayListContainer";

import { currentPlayListUsedStore, darkModeStorage } from "../../lib/store";
import { useAtom, useAtomValue } from "jotai/react";
import Nav from "../../components/Nav";
import {
  getAlbumTracksEndpoint,
  mapAlbumTracksToPlaylistResponse,
} from "../../lib/jamendo";

export default function PlayListPage() {
  const darkMode = useAtomValue(darkModeStorage);

  const [, setCurrentPlayList] = useAtom(currentPlayListUsedStore);

  const { playlistid } = useParams();
  const albumTracksURL = getAlbumTracksEndpoint(playlistid);

  const { data: jamendoData } = useFetchApi(albumTracksURL);

  useEffect(() => {
    if (jamendoData?.results) {
      setCurrentPlayList(mapAlbumTracksToPlaylistResponse(jamendoData));
    }

    return () => {
      setCurrentPlayList([]);
    };
  }, [jamendoData, setCurrentPlayList]);

  return (
    <>
      <Nav />
      <div
        className={`flex ${
          !darkMode && "bg-[#f5deb3]/90 text-black/80"
        } justify-center gap-10 p-10 items-center min-h-screen flex-col`}
      >
        <PlayListContainer />
      </div>
    </>
  );
}
