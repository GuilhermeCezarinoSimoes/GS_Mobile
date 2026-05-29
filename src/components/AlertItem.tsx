import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertLog } from '../types';
import { StatusBadge } from './StatusBadge';
import { useTheme } from '../context/ThemeContext';
import { formatTimestamp } from '../utils/formatters';

interface Props {
  alert: AlertLog;
}

export function AlertItem({ alert }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.topRow}>
        <StatusBadge severity={alert.severity} />
        {alert.resolved && (
          <Text style={[styles.resolved, { color: colors.normal }]}>✓ Resolvido</Text>
        )}
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{alert.title}</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
        {alert.description}
      </Text>

      <View style={styles.footer}>
        <Text style={[styles.meta, { color: colors.textSecondary }]}>📍 {alert.sector}</Text>
        <Text style={[styles.meta, { color: colors.textSecondary }]}>
          🕐 {formatTimestamp(alert.timestamp)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: { fontSize: 14, fontWeight: '600', marginBottom: 4, lineHeight: 20 },
  description: { fontSize: 13, lineHeight: 18, marginBottom: 10 },
  footer: { flexDirection: 'row', justifyContent: 'space-between' },
  meta: { fontSize: 11 },
  resolved: { fontSize: 11, fontWeight: '600' },
});
