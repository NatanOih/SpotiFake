import React, { useState } from "react";
import Tooltip from "../../components/Tooltip";
import { Link } from "react-router-dom";

export default function PlaylistItem({ playlistData, enableTooltip = true }) {
  const { description, images, name, tracks, owner, id } = playlistData;

  const [toolTip, setToolTip] = useState(false);
  const imageUrl = images[0].url;

  return (
    <Link to={`/playlists/${id}`}>
      <div
        onMouseEnter={() => {
          setToolTip(true);
        }}
        onMouseLeave={() => {
          setToolTip(false);
        }}
        className={` bg-green-800/20 relative hover:bg-green-200/20  transition-all hover:bg- rounded-md cursor-pointer p-2 flex flex-col gap-2 justify-center items-center  max-w-80 min-h-60`}
      >
        <div className="flex flex-col justify-center text-center items-center">
          <span className="font-bold text-xl"> {name} </span>
          <span> Playlist Owner: {owner.display_name} </span>
          <span> Number of Tracks : {tracks.total} </span>
          <Tooltip isShowing={toolTip && enableTooltip}>{description}</Tooltip>
        </div>

        <img
          className="max-w-full h-auto  rounded-sm"
          src={imageUrl}
          alt={name}
          loading="lazy"
        />
      </div>
    </Link>
  );
}
