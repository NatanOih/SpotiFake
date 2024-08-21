import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { token } from "../lib/store";

export default function useFetchApi(url) {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const spotifyToken = useAtomValue(token);

  useEffect(() => {
    if (!spotifyToken) {
      setError("Not Authenticated");
      setLoading(false);
      return;
    }
    setError(null);
    const reqHeader = `Bearer ${spotifyToken}`;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          headers: {
            Authorization: reqHeader,
            "Content-Type": "application/json",
          },
        });

        const parsedFetchedData = await response.json();

        setData(parsedFetchedData);
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    };

    fetchData();
  }, [url, spotifyToken]);

  return { data, loading, error };
}
