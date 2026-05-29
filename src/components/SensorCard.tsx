import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SensorReading } from '../types';
import { useTheme } from '../context/ThemeContext';

interface Props {
  sensor: SensorReading;
}

export function SensorCard({ sensor }: Props) {
  const { colors } = useTheme();

  const statusColor = {
    critical: colors.critical,
    warning: colors.warning,
    normal: colors.normal,
  }[sensor.status];

  const fillPercent = Math.min(
    100,
    Math.max(0, ((sensor.value - sensor.min) / (sensor.max - sensor.min)) * 100)
  );

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: statusColor }]}>
      <View style={styles.header}>
        <Text style={styles.icon}>{sensor.icon}</Text>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
      </View>

      <Text style={[styles.value, { color: colors.text }]}>
        {sensor.value}
        <Text style={[styles.unit, { color: colors.textSecondary }]}> {sensor.unit}</Text>
      </Text>

      <Text style={[styles.label, { color: colors.textSecondary }]}>{sensor.label}</Text>

      <View style={[styles.barBg, { backgroundColor: colors.surfaceAlt }]}>
        <View style={[styles.barFill, { width: `${fillPercent}%`, backgroundColor: statusColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    flex: 1,
    marginHorizontal: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    fontSize: 24,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  value: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  unit: {
    fontSize: 14,
    fontWeight: '400',
  },
  label: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  barBg: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: 4,
    borderRadius: 2,
  },
});
