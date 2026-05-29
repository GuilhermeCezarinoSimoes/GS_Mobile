import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SeverityLevel } from '../types';
import { useTheme } from '../context/ThemeContext';

interface Props {
  severity: SeverityLevel;
}

const LABELS: Record<SeverityLevel, string> = {
  critical: 'CRÍTICO',
  warning: 'ALERTA',
  normal: 'NORMAL',
};

export function StatusBadge({ severity }: Props) {
  const { colors } = useTheme();

  const color = {
    critical: colors.critical,
    warning: colors.warning,
    normal: colors.normal,
  }[severity];

  return (
    <View style={[styles.badge, { backgroundColor: `${color}22`, borderColor: color }]}>
      <Text style={[styles.text, { color }]}>{LABELS[severity]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  text: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});
