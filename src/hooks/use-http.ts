import { useState } from "react";

interface RequestError {
  status: number;
  statusText: string;
}

const useHttp = <T>(URL: string, dataReducer?: (rawData: any) => T) => {
  type Data = typeof dataReducer extends undefined ? any : T | null;

  const [data, setData] = useState<Data>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | RequestError>(null);

  const request = async (init?: RequestInit) => {
    setData(null);
    setIsLoading(true);
    setError(null);

    const response = await fetch(URL, init);
    if (!response.ok) {
      setError({ status: response.status, statusText: response.statusText });
      setIsLoading(false);
      return;
    }
    
    const data = dataReducer
      ? dataReducer((await response.json())[0])
      : (await response.json())[0];
    setData(data);
    setIsLoading(false);
  };

  return {data, isLoading, error, request}
};

export default useHttp;
