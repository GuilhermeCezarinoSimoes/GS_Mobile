import { useState, useCallback } from 'react';
import { FavoriteItem, NasaApod } from '../types';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
} from '../storage/favoritesStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const loadFavorites = useCallback(async () => {
    const data = await getFavorites();
    setFavorites(data);
  }, []);

  const toggleFavorite = useCallback(
    async (apod: NasaApod) => {
      const already = await isFavorite(apod.date);
      if (already) {
        await removeFavorite(apod.date);
      } else {
        await addFavorite({
          id: apod.date,
          type: 'apod',
          data: apod,
          savedAt: new Date().toISOString(),
        });
      }
      await loadFavorites();
    },
    [loadFavorites]
  );

  const checkIsFavorite = useCallback((id: string) => isFavorite(id), []);

  return { favorites, loadFavorites, toggleFavorite, checkIsFavorite };
}
