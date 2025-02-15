import * as React from 'react';
import { PersistenceStorage } from 'src/app/utils/persistence-storage';

export const useFetch = <T>(url: string) => {
  const [data, setData] = React.useState<T>();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = PersistenceStorage.token.get();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setData(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = async () => {
    await fetchData();
  };

  return { data, loading, error, refetch };
};
