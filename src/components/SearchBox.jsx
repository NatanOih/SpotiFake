import React from "react";
import SearchIcon from "./SearchIcon";
import Xicon from "./Xicon";
import { darkModeStorage } from "../lib/store";
import { useAtomValue } from "jotai";

export default function SearchBox({ searchInput, setSearchInput }) {
  const darkMode = useAtomValue(darkModeStorage);

  return (
    <div className="flex gap-2 justify-center items-center">
      <SearchIcon />
      <input
        placeholder="search track"
        className={`bg-gray-100/70 text-black placeholder-black/50 ${
          !darkMode && "bg-gray-900/80 text-white/70"
        } p-1 text-center rounded-lg`}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {searchInput && (
        <div className="cursor-pointer" onClick={() => setSearchInput("")}>
          <Xicon />
        </div>
      )}
    </div>
  );
}
