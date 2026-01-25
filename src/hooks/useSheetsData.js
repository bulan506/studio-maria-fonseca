// src/hooks/useSheetsData.js
import { useState, useEffect } from 'react';

export function useSheetsData(sheetId, sheetName = 'Config') {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://opensheet.elk.sh/${sheetId}/${sheetName}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`Error ${response.status}`);
        
        const rawData = await response.json();
        setData(rawData);
        setError(null);
      } catch (err) {
        console.error('Error fetching sheets data:', err);
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sheetId, sheetName]);

  return { data, loading, error };
}