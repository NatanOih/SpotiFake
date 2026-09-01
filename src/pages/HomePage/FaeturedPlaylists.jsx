import React, { useEffect, useState } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import { useAtom } from "jotai";
import { playListDataStore } from "../../lib/store";
import PlayLists from "./PlayLists";
import SearchBox from "../../components/SearchBox";
import {
  getAlbumsEndpoint,
  mapAlbumsToPlaylistsResponse,
} from "../../lib/jamendo";

const PAGE_SIZE = 30;

export default function FaeturedPlaylists() {
  const [, setPlayListStorage] = useAtom(playListDataStore);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setOffset(0);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const url = getAlbumsEndpoint({
    search: debouncedSearch,
    offset,
    limit: PAGE_SIZE,
  });
  const { data: jamendoData } = useFetchApi(url);

  useEffect(() => {
    if (!jamendoData?.results) {
      return;
    }

    const message = debouncedSearch
      ? `Results for "${debouncedSearch}"`
      : "Popular Albums";
    const mapped = mapAlbumsToPlaylistsResponse(jamendoData, message);

    setHasMore(Boolean(jamendoData.headers?.next));

    setPlayListStorage((prev) => {
      if (offset === 0) {
        return mapped;
      }
      return {
        ...mapped,
        playlists: {
          items: [
            ...(prev.playlists?.items || []),
            ...mapped.playlists.items,
          ],
        },
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jamendoData]);

  return (
    <>
      <SearchBox searchInput={searchInput} setSearchInput={setSearchInput} />

      <PlayLists />

      {hasMore && (
        <button
          onClick={() => setOffset((prev) => prev + PAGE_SIZE)}
          className="bg-green-800/60 hover:bg-green-800/80 transition-all rounded-md px-6 py-2 font-bold"
        >
          Load More
        </button>
      )}
    </>
  );
}
