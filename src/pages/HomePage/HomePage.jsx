import useSpotifyAccess from "../../hooks/useSpotifyAccess";
import FaeturedPlaylists from "./FaeturedPlaylists";

import Nav from "../../components/Nav";
import { useAtomValue } from "jotai";
import { darkModeStorage } from "../../lib/store";
import Nav2 from "../../components/Nav2";

export default function HomePage() {
  const darkMode = useAtomValue(darkModeStorage);
  useSpotifyAccess();

  return (
    <>
      <Nav />
      <section
        className={`flex ${
          !darkMode && "bg-[#f5deb3]/90 text-black/80"
        }  flex-col min-h-screen p-10 pt-24 gap-2 justify-between items-center`}
      >
        <FaeturedPlaylists />
      </section>
    </>
  );
}
