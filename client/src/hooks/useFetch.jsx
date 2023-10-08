import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

// useFetch is the custom hook for fetching data from the API
const useFetch = (endpoint) => {
  const [data, setData] = useState();

  useEffect(() => {
    const makeApiRequest = async () => {
      const res = await fetchDataFromApi(endpoint);
      setData(res);
    };
    makeApiRequest();
  }, [endpoint]);

  return data;
};

export default useFetch;
