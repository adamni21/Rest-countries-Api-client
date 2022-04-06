import { useCallback, useState } from "react";

interface RequestError {
  status: number;
  statusText: string;
}

const useHttp = <T>(dataReducer?: (rawData: any) => T) => {
  type Data = typeof dataReducer extends undefined ? any : T | null;

  const [data, setData] = useState<Data>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | RequestError>(null);

  const request = useCallback( async (Url: string, init?: RequestInit) => {
    if(isLoading) {
      throw new Error("wait until current request is done")
    }
    setData(null);
    setIsLoading(true);
    setError(null);

    const response = await fetch(Url, init);
    if (!response.ok) {
      setError({ status: response.status, statusText: response.statusText });
      setIsLoading(false);
      return;
    }

    const data = dataReducer
      ? dataReducer(await response.json())
      : await response.json();
    setData(data);
    setIsLoading(false);
  }, [dataReducer, isLoading])

  return { data, isLoading, error, request };
};

export default useHttp;
