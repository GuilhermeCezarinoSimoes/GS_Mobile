import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertItem } from '../components/AlertItem';
import { useTheme } from '../context/ThemeContext';
import { alertLogs } from '../data/mockData';
import { SeverityLevel } from '../types';

type FilterOption = SeverityLevel | 'all';

const FILTERS: { key: FilterOption; label: string; icon: string }[] = [
  { key: 'all', label: 'Todos', icon: '📋' },
  { key: 'critical', label: 'Crítico', icon: '🔴' },
  { key: 'warning', label: 'Alerta', icon: '🟡' },
  { key: 'normal', label: 'Normal', icon: '🟢' },
];

export function AlertsScreen() {
  const { colors, isDark } = useTheme();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  const filtered = useMemo(() => {
    return alertLogs.filter(alert => {
      const matchesSeverity = activeFilter === 'all' || alert.severity === activeFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        q === '' ||
        alert.title.toLowerCase().includes(q) ||
        alert.sector.toLowerCase().includes(q) ||
        alert.description.toLowerCase().includes(q);
      return matchesSeverity && matchesSearch;
    });
  }, [search, activeFilter]);

  const criticalCount = alertLogs.filter(a => a.severity === 'critical' && !a.resolved).length;

  const filterColor = (key: FilterOption) => {
    if (key === activeFilter) {
      if (key === 'critical') return colors.critical;
      if (key === 'warning') return colors.warning;
      if (key === 'normal') return colors.normal;
      return colors.primary;
    }
    return colors.textSecondary;
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>Logs de Crises</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {filtered.length} registro{filtered.length !== 1 ? 's' : ''} · {criticalCount} crítico{criticalCount !== 1 ? 's' : ''} ativo{criticalCount !== 1 ? 's' : ''}
            </Text>
          </View>
          {criticalCount > 0 && (
            <View style={[styles.criticalBadge, { backgroundColor: colors.critical + '22', borderColor: colors.critical }]}>
              <Text style={[styles.criticalBadgeText, { color: colors.critical }]}>⚠ {criticalCount}</Text>
            </View>
          )}
        </View>

        {/* Search */}
        <View style={[styles.searchBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Buscar por título, setor..."
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={[styles.clearBtn, { color: colors.textSecondary }]}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filters */}
        <View style={styles.filters}>
          {FILTERS.map(f => {
            const isActive = f.key === activeFilter;
            const fc = filterColor(f.key);
            return (
              <TouchableOpacity
                key={f.key}
                onPress={() => setActiveFilter(f.key)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isActive ? fc + '22' : colors.surface,
                    borderColor: isActive ? fc : colors.border,
                  },
                ]}
              >
                <Text style={styles.chipIcon}>{f.icon}</Text>
                <Text style={[styles.chipLabel, { color: isActive ? fc : colors.textSecondary }]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <AlertItem alert={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>🔎</Text>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Nenhum registro encontrado.
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
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { fontSize: 12, marginTop: 2 },
  criticalBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1 },
  criticalBadgeText: { fontSize: 12, fontWeight: '700' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 12,
    gap: 8,
  },
  searchIcon: { fontSize: 15 },
  searchInput: { flex: 1, fontSize: 14 },
  clearBtn: { fontSize: 14, paddingHorizontal: 4 },
  filters: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    gap: 5,
  },
  chipIcon: { fontSize: 12 },
  chipLabel: { fontSize: 12, fontWeight: '600' },
  list: { paddingBottom: 40 },
  empty: { alignItems: 'center', marginTop: 50 },
  emptyIcon: { fontSize: 40, marginBottom: 10 },
  emptyText: { fontSize: 14 },
});
