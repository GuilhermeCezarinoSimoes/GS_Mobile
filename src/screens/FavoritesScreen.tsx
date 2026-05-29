import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { NasaCard } from '../components/NasaCard';
import { useTheme } from '../context/ThemeContext';
import { getFavorites } from '../storage/favoritesStorage';
import { FavoriteItem } from '../types';

export function FavoritesScreen() {
  const { colors, isDark } = useTheme();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      getFavorites().then(setFavorites);
    }, [])
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>Favoritos</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {favorites.length} imagem{favorites.length !== 1 ? 's' : ''} salva{favorites.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <View style={[styles.countBadge, { backgroundColor: colors.accent + '22', borderColor: colors.accent + '55' }]}>
            <Text style={[styles.countText, { color: colors.accent }]}>⭐ {favorites.length}</Text>
          </View>
        </View>

        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <NasaCard
              apod={item.data}
              onPress={() => {
                getFavorites().then(setFavorites);
              }}
            />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>🌌</Text>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                Nenhuma imagem salva
              </Text>
              <Text style={[styles.emptyDesc, { color: colors.textSecondary }]}>
                Acesse o Dashboard, explore as imagens da NASA e toque em ☆ para salvar suas favoritas aqui.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { fontSize: 13, marginTop: 2 },
  countBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
  },
  countText: { fontSize: 13, fontWeight: '700' },
  list: { paddingBottom: 40 },
  empty: { alignItems: 'center', marginTop: 60, paddingHorizontal: 20 },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  emptyDesc: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
});
