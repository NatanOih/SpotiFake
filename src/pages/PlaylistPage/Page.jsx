import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button";
import useFetchApi from "../../hooks/useFetchApi";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import PlayListContainer from "./PlayListContainer";

import { currentPlayListUsedStore, darkModeStorage } from "../../lib/store";
import { useAtom, useAtomValue } from "jotai/react";
import Nav from "../../components/Nav";

export default function PlayListPage() {
  const darkMode = useAtomValue(darkModeStorage);

  const [currentPlayList, setCurrentPlayList] = useAtom(
    currentPlayListUsedStore
  );

  const { playlistid } = useParams();
  const playlistURL = `https://api.spotify.com/v1/playlists/${playlistid}`;

  const { data: playListData } = useFetchApi(playlistURL);

  useEffect(() => {
    if (playListData) {
      setCurrentPlayList(playListData);
    }

    return () => {
      setCurrentPlayList([]);
    };
  }, [playListData, setCurrentPlayList]);

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
