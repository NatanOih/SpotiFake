import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { token } from "../lib/store";

export default function useSpotifyAccess() {
  const [spotifyToken, setSpotifyToken] = useAtom(token);
  const [spotifyTokenError, setSpotifyTokenError] = useState(null);
  const [loadingToken, setLoadingToken] = useState(false);

  useEffect(() => {
    if (spotifyToken) {
      return;
    }

    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    const encodedCredentials = btoa(`${clientId}:${clientSecret}`);

    const fetchToken = async () => {
      const authOptions = {
        method: "POST",
        headers: {
          Authorization: "Basic " + encodedCredentials,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      };

      setLoadingToken(true);

      try {
        const response = await fetch(
          "https://accounts.spotify.com/api/token",
          authOptions
        );

        const data = await response.json();
        setSpotifyToken(data["access_token"]);
      } catch (err) {
        setSpotifyTokenError(err.message);
      }

      setLoadingToken(false);
    };

    fetchToken();
  }, [spotifyToken]);

  return { spotifyToken, spotifyTokenError, loadingToken };
}
