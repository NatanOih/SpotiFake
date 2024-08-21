import React from "react";
import SearchIcon from "./SearchIcon";
import Xicon from "./Xicon";

export default function SearchBox({ searchInput, setSearchInput }) {
  return (
    <div className="flex gap-2 justify-center items-center">
      <SearchIcon />
      <input
        placeholder="search track"
        className="bg-gray-300/30 p-1 rounded-lg"
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
