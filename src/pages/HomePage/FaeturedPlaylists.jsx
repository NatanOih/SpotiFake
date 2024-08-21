import React from "react";
import useFetchApi from "../../hooks/useFetchApi";
import Headline from "../../components/Headline";
import PlaylistItem from "./PlaylistItem";

const ENDPOINT = "https://api.spotify.com/v1/browse/featured-playlists";

//data looks like this:
// message:String -- headline
// href: "https://api.spotify.com/v1/browse/featured-playlists?offset=0&limit=20&locale=en,en-US;q%3D0.9,he;q%3D0.8,en-GB;q%3D0.7,en-AU;q%3D0.6"
// playlists: items[]
//   total: 50
//   next: "https://api.spotify.com/v1/browse/featured-playlists?offset=20&limit=20&locale=en,en-US;q%3D0.9,he;q%3D0.8,en-GB;q%3D0.7,en-AU;q%3D0.6"
// }

export default function FaeturedPlaylists() {
  const { data: playListsData, loading, error } = useFetchApi(ENDPOINT);

  if (error) {
    return <div>something went wrong</div>;
  }

  if (loading) {
    return (
      <div className="text-xl flex justify-center items-center gap-4">
        Loading Playlists Items...
        <div className=" rounded-full border-0 border-t-2 w-4 h-4 animate-spin border-white " />
      </div>
    );
  }

  return (
    <section className="flex flex-col justify-center gap-10 items-center">
      <Headline className="underline decoration-double">
        {playListsData.message}
      </Headline>

      <div className="flex flex-wrap max-w-[75vw] justify-center items-center gap-14 p-10 ">
        {playListsData.playlists.items.map((playlist) => {
          return <PlaylistItem playlistData={playlist} key={playlist.id} />;
        })}
      </div>
    </section>
  );
}
