import { useEffect, useState } from "react";

export default function useFilter(originalList) {
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    const filteredTracks = originalList.filter((track) => {
      const trackName = track.track.name;

      return trackName.includes(searchInput);
    });

    setFilteredData(filteredTracks);
  }, [searchInput, originalList]);

  const tracksToRender = searchInput.length > 0 ? filteredData : originalList;

  return { searchInput, setSearchInput, tracksToRender };
}
