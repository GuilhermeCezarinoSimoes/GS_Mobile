import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteItem } from '../types';

const STORAGE_KEY = '@nexus_favorites';

export async function getFavorites(): Promise<FavoriteItem[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FavoriteItem[]) : [];
  } catch {
    return [];
  }
}

export async function addFavorite(item: FavoriteItem): Promise<void> {
  const current = await getFavorites();
  const updated = [item, ...current.filter(f => f.id !== item.id)];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function removeFavorite(id: string): Promise<void> {
  const current = await getFavorites();
  const updated = current.filter(f => f.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function isFavorite(id: string): Promise<boolean> {
  const current = await getFavorites();
  return current.some(f => f.id === id);
}
