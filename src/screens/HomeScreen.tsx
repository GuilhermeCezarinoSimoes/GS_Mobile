import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SensorCard } from '../components/SensorCard';
import { NasaCard } from '../components/NasaCard';
import { LoadingCard } from '../components/LoadingCard';
import { useTheme } from '../context/ThemeContext';
import { useNasaData } from '../hooks/useNasaData';
import { sensorReadings, alertLogs } from '../data/mockData';
import { HomeStackParamList, NasaApod } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>;
};

export function HomeScreen({ navigation }: Props) {
  const { colors, isDark } = useTheme();
  const { data: apodList, loading, error, reload } = useNasaData(4);

  const criticalCount = sensorReadings.filter(s => s.status === 'critical').length;
  const warningCount = sensorReadings.filter(s => s.status === 'warning').length;
  const overallStatus = criticalCount > 0 ? 'CRÍTICO' : warningCount > 0 ? 'ATENÇÃO' : 'NOMINAL';
  const overallColor = criticalCount > 0 ? colors.critical : warningCount > 0 ? colors.warning : colors.normal;

  const recentAlerts = alertLogs.filter(a => !a.resolved).slice(0, 2);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={reload}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.logo, { color: colors.primary }]}>NEXUS</Text>
            <Text style={[styles.logoSub, { color: colors.textSecondary }]}>
              Monitoramento Autônomo
            </Text>
          </View>
          <View style={[styles.statusPill, { backgroundColor: overallColor + '22', borderColor: overallColor }]}>
            <View style={[styles.dot, { backgroundColor: overallColor }]} />
            <Text style={[styles.statusText, { color: overallColor }]}>{overallStatus}</Text>
          </View>
        </View>

        {/* Summary bar */}
        <View style={[styles.summaryBar, { backgroundColor: colors.surface }]}>
          <SummaryItem label="Críticos" value={criticalCount} color={colors.critical} />
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <SummaryItem label="Alertas" value={warningCount} color={colors.warning} />
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <SummaryItem label="Sensores" value={sensorReadings.length} color={colors.primary} />
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <SummaryItem label="Ativos" value={alertLogs.filter(a => !a.resolved).length} color={colors.accent} />
        </View>

        {/* Sensor grid */}
        <SectionHeader title="TELEMETRIA DA BASE" />
        <View style={styles.grid}>
          {sensorReadings.slice(0, 2).map(s => <SensorCard key={s.id} sensor={s} />)}
        </View>
        <View style={styles.grid}>
          {sensorReadings.slice(2, 4).map(s => <SensorCard key={s.id} sensor={s} />)}
        </View>

        {/* Active alerts preview */}
        {recentAlerts.length > 0 && (
          <>
            <SectionHeader title="ALERTAS ATIVOS" />
            {recentAlerts.map(alert => (
              <View
                key={alert.id}
                style={[
                  styles.alertPreview,
                  {
                    backgroundColor: colors.surface,
                    borderLeftColor:
                      alert.severity === 'critical' ? colors.critical :
                      alert.severity === 'warning' ? colors.warning : colors.normal,
                  },
                ]}
              >
                <Text style={[styles.alertTitle, { color: colors.text }]} numberOfLines={1}>
                  {alert.title}
                </Text>
                <Text style={[styles.alertSector, { color: colors.textSecondary }]}>
                  📍 {alert.sector}
                </Text>
              </View>
            ))}
          </>
        )}

        {/* NASA APOD Section */}
        <SectionHeader title="EXPLORAÇÃO ESPACIAL · NASA APOD" />

        {error ? (
          <View style={[styles.errorBox, { backgroundColor: colors.surface, borderColor: colors.critical }]}>
            <Text style={styles.errorIcon}>📡</Text>
            <Text style={[styles.errorText, { color: colors.textSecondary }]}>{error}</Text>
            <TouchableOpacity
              onPress={reload}
              style={[styles.retryBtn, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.retryText}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : loading ? (
          <>
            <LoadingCard />
            <LoadingCard />
          </>
        ) : (
          apodList.map(apod => (
            <NasaCard
              key={apod.date}
              apod={apod}
              onPress={() => navigation.navigate('ApodDetail', { apod })}
            />
          ))
        )}

        <Text style={[styles.footer, { color: colors.textSecondary }]}>
          Dados fornecidos por NASA Open APIs · {new Date().toLocaleDateString('pt-BR')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionHeader({ title }: { title: string }) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{title}</Text>
  );
}

function SummaryItem({ label, value, color }: { label: string; value: number; color: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.summaryItem}>
      <Text style={[styles.summaryValue, { color }]}>{value}</Text>
      <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logo: { fontSize: 30, fontWeight: '800', letterSpacing: 5 },
  logoSub: { fontSize: 11, marginTop: 2, letterSpacing: 0.5 },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  dot: { width: 7, height: 7, borderRadius: 4 },
  statusText: { fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  summaryBar: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryItem: { alignItems: 'center' },
  summaryValue: { fontSize: 22, fontWeight: '700' },
  summaryLabel: { fontSize: 10, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 },
  divider: { width: 1, height: 32 },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 12,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  grid: { flexDirection: 'row', marginHorizontal: -6, marginBottom: 4 },
  alertPreview: {
    borderLeftWidth: 3,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  alertTitle: { fontSize: 13, fontWeight: '600' },
  alertSector: { fontSize: 11, marginTop: 3 },
  errorBox: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  errorIcon: { fontSize: 36, marginBottom: 8 },
  errorText: { fontSize: 13, textAlign: 'center', marginBottom: 14, lineHeight: 20 },
  retryBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  retryText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  footer: { fontSize: 10, textAlign: 'center', marginTop: 12 },
});
