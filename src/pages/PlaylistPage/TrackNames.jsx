import React from "react";

export default function TrackNames({ name, artists }) {
  return (
    <div className="p-1 w-[20vw] gap-1 tracking-tighter  rounded-md text-center flex flex-col justify-center items-center">
      <span className=" w-full" title={name}>
        {name}
      </span>
      <span className=" truncate w-full justify-center items-center">
        {artists.map((artist) => (
          <span className="" key={artist.name} title={artist.name}>
            {artist.name}
          </span>
        ))}
      </span>
    </div>
  );
}
