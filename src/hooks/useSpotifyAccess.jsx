import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { token } from "../lib/store";
import Error from "../components/Error";
import Loading from "../components/Loading";

export default function useSpotifyAccess() {
  const [spotifyToken, setSpotifyToken] = useAtom(token);
  const [spotifyTokenError, setSpotifyTokenError] = useState(null);
  const [loadingToken, setLoadingToken] = useState(false);
  const abortContollerRef = useRef();

  useEffect(() => {
    if (spotifyToken) {
      return;
    }

    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    const encodedCredentials = btoa(`${clientId}:${clientSecret}`);

    const fetchToken = async () => {
      abortContollerRef.current?.abort();
      abortContollerRef.current = new AbortController();

      const authOptions = {
        signal: abortContollerRef.current?.signal,
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
        if (err.name === "AbortError") {
          console.log("Aborted auth");
          return;
        }
        setSpotifyTokenError(err.message);
      }

      setLoadingToken(false);
    };

    fetchToken();
  }, [spotifyToken, setSpotifyToken]);

  if (spotifyTokenError) {
    return <Error error={spotifyTokenError} />;
  }

  if (loadingToken) {
    return <Loading />;
  }

  // return { spotifyToken, spotifyTokenError, loadingToken };
  return { spotifyToken };
}
