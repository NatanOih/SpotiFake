import { useEffect, useState } from "react";
import { tracksToRenderStore } from "../lib/store";
import { useAtom } from "jotai";

export default function useFilter(originalList) {
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [tracksToRender, setTracksToRender] = useAtom(tracksToRenderStore);

  useEffect(() => {
    if (!originalList) {
      setFilteredData([]);
      return;
    }

    const lowercasedSearchInput = searchInput.toLowerCase();

    const filteredTracks = originalList.filter((track) => {
      const trackName = track?.track?.name || "";
      return trackName.toLowerCase().includes(lowercasedSearchInput);
    });

    setFilteredData(filteredTracks);
  }, [searchInput, originalList]);

  useEffect(() => {
    const updatedTracksToRender =
      searchInput.length > 0 ? filteredData : originalList;
    setTracksToRender(updatedTracksToRender);
  }, [searchInput, filteredData, originalList, setTracksToRender]);

  return { searchInput, setSearchInput };
}
