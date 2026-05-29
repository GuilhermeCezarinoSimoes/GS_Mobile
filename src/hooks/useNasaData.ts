import { useState, useEffect, useCallback } from 'react';
import { NasaApod } from '../types';
import { fetchApodList } from '../services/nasaService';

interface UseNasaDataResult {
  data: NasaApod[];
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export function useNasaData(count = 6): UseNasaDataResult {
  const [data, setData] = useState<NasaApod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchApodList(count);
      setData(result);
    } catch (e) {
      setError('Falha ao conectar com a NASA. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  }, [count]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
