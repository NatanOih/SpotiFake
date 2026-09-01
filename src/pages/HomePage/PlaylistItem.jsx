import React, { useState } from "react";
import Tooltip from "../../components/Tooltip";
import ImageWithLoader from "../../components/ImageWithLoader";
import { Link } from "react-router-dom";

export default function PlaylistItem({ playlistData, enableTooltip = true }) {
  const { description, images, name, releaseDate, owner, id } = playlistData;

  const [toolTip, setToolTip] = useState(false);
  const imageUrl = images[0].url;

  return (
    <Link to={`/playlists/${id}`}>
      <div
        onMouseEnter={() => setToolTip(true)}
        onMouseLeave={() => setToolTip(false)}
        className="group relative w-64 aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-green-900/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-white/10"
      >
        <ImageWithLoader
          src={imageUrl}
          alt={name}
          containerClassName="absolute inset-0"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />

        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-0.5 text-white">
          <span className="font-bold text-lg leading-tight truncate drop-shadow">
            {name}
          </span>
          <span className="text-sm text-gray-300 truncate">
            Artist: {owner.display_name}
          </span>
          <span className="text-xs text-gray-400 truncate">
            Released: {releaseDate}
          </span>
        </div>

        <Tooltip isShowing={toolTip && enableTooltip}>{description}</Tooltip>
      </div>
    </Link>
  );
}
