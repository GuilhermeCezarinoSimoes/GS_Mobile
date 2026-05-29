import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface Props {
  height?: number;
  style?: object;
}

export function LoadingCard({ height = 220, style }: Props) {
  const { colors } = useTheme();
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.card, { backgroundColor: colors.surface, height, opacity }, style]}
    >
      <View style={[styles.imageArea, { backgroundColor: colors.surfaceAlt }]} />
      <View style={styles.content}>
        <View style={[styles.bar, { backgroundColor: colors.surfaceAlt, width: '70%' }]} />
        <View style={[styles.bar, { backgroundColor: colors.surfaceAlt, width: '45%', marginTop: 8 }]} />
        <View style={[styles.bar, { backgroundColor: colors.surfaceAlt, width: '90%', marginTop: 12, height: 6 }]} />
        <View style={[styles.bar, { backgroundColor: colors.surfaceAlt, width: '80%', marginTop: 6, height: 6 }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  imageArea: {
    height: 130,
  },
  content: {
    padding: 14,
  },
  bar: {
    height: 12,
    borderRadius: 6,
  },
});
