import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { NasaApod } from '../types';
import { useTheme } from '../context/ThemeContext';
import { isFavorite, addFavorite, removeFavorite } from '../storage/favoritesStorage';
import { formatDate, truncate } from '../utils/formatters';

const { width } = Dimensions.get('window');

interface Props {
  apod: NasaApod;
  compact?: boolean;
  onPress?: () => void;
}

export function NasaCard({ apod, compact = false, onPress }: Props) {
  const { colors } = useTheme();
  const [fav, setFav] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    isFavorite(apod.date).then(setFav);
  }, [apod.date]);

  const toggleFav = async () => {
    if (fav) {
      await removeFavorite(apod.date);
    } else {
      await addFavorite({
        id: apod.date,
        type: 'apod',
        data: apod,
        savedAt: new Date().toISOString(),
      });
    }
    setFav(f => !f);
  };

  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.85 : 1}
      onPress={onPress}
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      {/* Image */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: apod.url }} style={styles.image} resizeMode="cover" />
        <View style={styles.overlay}>
          <View style={[styles.badge, { backgroundColor: colors.primary + '33', borderColor: colors.primary + '66' }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>🛸 NASA APOD</Text>
          </View>
          <TouchableOpacity onPress={toggleFav} style={styles.favButton}>
            <Text style={styles.favIcon}>{fav ? '⭐' : '☆'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {apod.title}
        </Text>

        <View style={styles.metaRow}>
          <Text style={[styles.meta, { color: colors.textSecondary }]}>
            📅 {formatDate(apod.date)}
          </Text>
          {apod.copyright && (
            <Text style={[styles.meta, { color: colors.textSecondary }]} numberOfLines={1}>
              © {truncate(apod.copyright.trim(), 20)}
            </Text>
          )}
        </View>

        {!compact && (
          <>
            <Text
              style={[styles.explanation, { color: colors.textSecondary }]}
              numberOfLines={expanded ? undefined : 3}
            >
              {apod.explanation}
            </Text>
            <TouchableOpacity onPress={() => setExpanded(e => !e)}>
              <Text style={[styles.toggle, { color: colors.primary }]}>
                {expanded ? 'Ver menos ▲' : 'Ver mais ▼'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  imageWrapper: {
    height: 180,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  favButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favIcon: {
    fontSize: 18,
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 21,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 4,
  },
  meta: {
    fontSize: 12,
  },
  explanation: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 6,
  },
  toggle: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});
