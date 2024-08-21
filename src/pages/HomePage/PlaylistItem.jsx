import React, { useState } from "react";
import Tooltip from "../../components/Tooltip";
import { Link } from "react-router-dom";

//// item: {
////   collaborative: false,
////   description: 'הפלייליסט הכי גדול בישראל, עם השירים הכי חמים של היום ומחר. קאבר: אושר כהן  ',
////   external_urls: {…},
////   id: "37i9dQZF1DWSYF6geMtQMW",
////   images: Array(1) {height: null, url: 'https://i.scdn.co/image/ab67706f0000000236d1483cc9fcc5aa6e204334', width: null}
////   name: "הלהיטים הגדולים של ישראל",
////   tracks: href: "https://api.spotify.com/v1/playlists/37i9dQZF1DWSYF6geMtQMW/tracks"
////   owner: {
////      display_name: "Spotify"
////   }
//   }

export default function PlaylistItem({ playlistData }) {
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
        className={` bg-green-800/20 relative  hover:bg-green-200/20  transition-all    hover:bg- rounded-md cursor-pointer p-2 flex flex-col gap-2 justify-center items-center  max-w-100 min-h-60`}
      >
        <div className="flex flex-col justify-center items-center">
          <span className="font-bold text-xl"> {name} </span>
          <span> Playlist Owner: {owner.display_name} </span>
          <span> Number of Tracks : {tracks.total} </span>
          <Tooltip isShowing={toolTip}> {description} </Tooltip>
        </div>

        <img
          className="max-w-full h-auto p-2 rounded-sm"
          src={imageUrl}
          alt={name}
          loading="lazy"
        />
      </div>
    </Link>
  );
}
