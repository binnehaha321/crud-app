import { useState, useEffect } from "react";
import request from "~/utils/request";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const handleFetchData = async () => {
    setIsLoading(true);
    try {
      const res = await request.get(url);
      setData(await res?.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [url]);

  return { data, isLoading, isError };
};

export default useFetch;
