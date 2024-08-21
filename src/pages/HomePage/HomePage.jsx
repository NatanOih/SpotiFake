import { Link } from "react-router-dom";
import Headline from "../../components/Headline";

import useSpotifyAccess from "../../hooks/useSpotifyAccess";
import FaeturedPlaylists from "./FaeturedPlaylists";
import Button from "../../components/Button";
import { HeartIcon } from "../../components/HeartIcon";

export default function HomePage() {
  const { spotifyToken, spotifyTokenError, loadingToken } = useSpotifyAccess();

  if (loadingToken) {
    return <div>Loading Token...</div>;
  }

  if (spotifyTokenError) {
    return (
      <div>
        <h1>something went wrong with the token... </h1>
        <span> {spotifyTokenError}</span>

        <Link className="" to="/">
          <Button className={""}>go back</Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="flex flex-col h-screen p-10 pt-24 gap-2 justify-between items-center">
      <Headline className=" absolute top-4 ">
        hello /// Welcome to SpotiFake
      </Headline>

      <Link to="/favorites">
        <Button className="flex bg-red-200/20 justify-center gap-2 items-center">
          Favorites <HeartIcon />
        </Button>
      </Link>
      <FaeturedPlaylists />
    </section>
  );
}
