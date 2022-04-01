import { useState, useEffect } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!url) return;

    (async () => {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    })()

  }, [url]);

  return data;
}