import { useEffect, useRef, useState } from "react";
import Error from "../components/Error";
import Loading from "../components/Loading";

export default function useFetchApi(url) {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const abortContollerRef = useRef();

  useEffect(() => {
    setError(null);

    const fetchData = async () => {
      abortContollerRef.current?.abort();
      abortContollerRef.current = new AbortController();
      try {
        setLoading(true);
        const response = await fetch(url, {
          signal: abortContollerRef.current?.signal,
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
  }, [url]);

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return { data };
}
