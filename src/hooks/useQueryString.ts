import { useSearchParams } from "react-router-dom";

export default function useQueryString() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParams = () => Object.fromEntries(searchParams);

  const getEachParam = (key: string) => searchParams.get(key);

  const setParams = (params: Record<string, any>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value === true) {
        newParams.set(key, "");
      } else if (value !== undefined && value !== null && value !== "") {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  const paramsClear = (keys: string[] = []) => {
    const newParams = new URLSearchParams();
    keys.forEach((key) => {
      const value = searchParams.get(key);
      if (value !== null) {
        newParams.set(key, value);
      }
    });
    setSearchParams(newParams);
  };

  return { getParams, getEachParam, setParams, paramsClear };
}
