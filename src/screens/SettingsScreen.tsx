import React from 'react';
import { View, Text, Switch, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

export function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: colors.text }]}>Configurações</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Preferências do sistema NEXUS</Text>

        {/* Aparência */}
        <SectionLabel title="APARÊNCIA" colors={colors} />
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowIcon}>{isDark ? '🌙' : '☀️'}</Text>
              <View>
                <Text style={[styles.rowTitle, { color: colors.text }]}>Modo Dark</Text>
                <Text style={[styles.rowDesc, { color: colors.textSecondary }]}>
                  {isDark ? 'Interface escura ativada' : 'Interface clara ativada'}
                </Text>
              </View>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Sistema */}
        <SectionLabel title="SISTEMA" colors={colors} />
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <InfoRow label="Versão do App" value="1.0.0" colors={colors} />
          <Separator colors={colors} />
          <InfoRow label="SDK Expo" value="51.0.0" colors={colors} />
          <Separator colors={colors} />
          <InfoRow label="Protocolo" value="NEXUS-SOA v3" colors={colors} />
          <Separator colors={colors} />
          <InfoRow label="Conexão" value="🟢 Online" colors={colors} />
          <Separator colors={colors} />
          <InfoRow label="Base Remota" value="POLAR-ALPHA-01" colors={colors} />
        </View>

        {/* APIs */}
        <SectionLabel title="INTEGRAÇÕES" colors={colors} />
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <InfoRow label="NASA Open APIs" value="🟢 Conectado" colors={colors} />
          <Separator colors={colors} />
          <InfoRow label="Sensores IoT" value="🟡 4 ativos" colors={colors} />
          <Separator colors={colors} />
          <InfoRow label="Armazenamento" value="AsyncStorage" colors={colors} />
        </View>

        {/* ODS */}
        <SectionLabel title="ODS DA ONU ATENDIDOS" colors={colors} />
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <OdsRow icon="🏭" label="ODS 9" desc="Indústria, inovação e infraestrutura" colors={colors} />
          <Separator colors={colors} />
          <OdsRow icon="🌆" label="ODS 11" desc="Cidades e comunidades sustentáveis" colors={colors} />
          <Separator colors={colors} />
          <OdsRow icon="🌍" label="ODS 13" desc="Ação contra a mudança do clima" colors={colors} />
        </View>

        <Text style={[styles.footer, { color: colors.textSecondary }]}>
          NEXUS · Ecossistema de Monitoramento Autônomo{'\n'}
          Global Solution 2026 · FIAP
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionLabel({ title, colors }: { title: string; colors: any }) {
  return (
    <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>{title}</Text>
  );
}

function Separator({ colors }: { colors: any }) {
  return <View style={[styles.separator, { backgroundColor: colors.border }]} />;
}

function InfoRow({ label, value, colors }: { label: string; value: string; colors: any }) {
  return (
    <View style={styles.infoRow}>
      <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

function OdsRow({ icon, label, desc, colors }: { icon: string; label: string; desc: string; colors: any }) {
  return (
    <View style={styles.infoRow}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 18 }}>{icon}</Text>
        <View>
          <Text style={[styles.infoValue, { color: colors.text }]}>{label}</Text>
          <Text style={[styles.rowDesc, { color: colors.textSecondary }]}>{desc}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { fontSize: 13, marginBottom: 24, marginTop: 2 },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 10,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowIcon: { fontSize: 24 },
  rowTitle: { fontSize: 15, fontWeight: '600' },
  rowDesc: { fontSize: 12, marginTop: 2 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  infoLabel: { fontSize: 14 },
  infoValue: { fontSize: 14, fontWeight: '500' },
  separator: { height: 1, marginHorizontal: 16 },
  footer: { fontSize: 11, textAlign: 'center', lineHeight: 18, marginTop: 8 },
});
