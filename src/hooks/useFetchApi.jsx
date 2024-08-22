import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { token } from "../lib/store";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function useFetchApi(url) {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const spotifyToken = useAtomValue(token);
  const abortContollerRef = useRef();

  useEffect(() => {
    if (!spotifyToken) {
      setError("Not Authenticated");
      setLoading(false);
    }
    setError(null);
    const reqHeader = `Bearer ${spotifyToken}`;

    const fetchData = async () => {
      abortContollerRef.current?.abort();
      abortContollerRef.current = new AbortController();
      try {
        setLoading(true);
        const response = await fetch(url, {
          signal: abortContollerRef.current?.signal,
          headers: {
            Authorization: reqHeader,
            "Content-Type": "application/json",
          },
        });

        const parsedFetchedData = await response.json();

        setData(parsedFetchedData);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Aborted");
          return;
        }
        setError(err.message);
      }

      setLoading(false);
    };

    fetchData();
  }, [url, spotifyToken]);

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return { data };
}
