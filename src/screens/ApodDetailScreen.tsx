import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { HomeStackParamList } from '../types';
import { isFavorite, addFavorite, removeFavorite } from '../storage/favoritesStorage';
import { formatDate } from '../utils/formatters';

const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'ApodDetail'>;
  route: RouteProp<HomeStackParamList, 'ApodDetail'>;
};

export function ApodDetailScreen({ navigation, route }: Props) {
  const { apod } = route.params;
  const { colors, isDark } = useTheme();
  const [fav, setFav] = useState(false);

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
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Custom header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={[styles.backIcon, { color: colors.primary }]}>‹</Text>
          <Text style={[styles.backLabel, { color: colors.primary }]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFav} style={styles.favBtn}>
          <Text style={styles.favIcon}>{fav ? '⭐' : '☆'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: apod.hdurl ?? apod.url }} style={styles.image} resizeMode="cover" />

        <View style={styles.content}>
          <View style={[styles.badge, { backgroundColor: colors.primary + '22', borderColor: colors.primary + '55' }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>🛸 NASA — Astronomy Picture of the Day</Text>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>{apod.title}</Text>

          <View style={styles.metaRow}>
            <MetaChip icon="📅" label={formatDate(apod.date)} colors={colors} />
            {apod.copyright && (
              <MetaChip icon="©" label={apod.copyright.trim()} colors={colors} />
            )}
          </View>

          <View style={[styles.separator, { backgroundColor: colors.border }]} />

          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>DESCRIÇÃO</Text>
          <Text style={[styles.explanation, { color: colors.text }]}>{apod.explanation}</Text>

          <View style={[styles.infoBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.infoBoxTitle, { color: colors.textSecondary }]}>🌌 SOBRE O NEXUS</Text>
            <Text style={[styles.infoBoxText, { color: colors.textSecondary }]}>
              O NEXUS integra dados da NASA para fornecer contexto científico do ambiente espacial às operações de bases remotas — conectando monitoramento terrestre à economia espacial global.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MetaChip({ icon, label, colors }: { icon: string; label: string; colors: any }) {
  return (
    <View style={[styles.chip, { backgroundColor: colors.surfaceAlt }]}>
      <Text style={[styles.chipText, { color: colors.textSecondary }]}>{icon} {label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  backIcon: { fontSize: 28, fontWeight: '300', lineHeight: 32 },
  backLabel: { fontSize: 15, fontWeight: '600' },
  favBtn: { padding: 4 },
  favIcon: { fontSize: 24 },
  image: { width, height: width * 0.65 },
  content: { padding: 20 },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  badgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  title: { fontSize: 22, fontWeight: '800', lineHeight: 30, marginBottom: 12 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  chipText: { fontSize: 12 },
  separator: { height: 1, marginBottom: 16 },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  explanation: { fontSize: 15, lineHeight: 24, marginBottom: 20 },
  infoBox: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 40,
  },
  infoBoxTitle: { fontSize: 10, fontWeight: '700', letterSpacing: 2, marginBottom: 8 },
  infoBoxText: { fontSize: 13, lineHeight: 20 },
});
