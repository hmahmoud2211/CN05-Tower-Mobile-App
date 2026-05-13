import React from 'react';
import { View, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native';
import { AppBackground } from '../../components/ui/AppBackground';
import { Typography } from '../../components/ui/Typography';
import { GlassCard } from '../../components/ui/GlassCard';
import { CircularGauge } from '../../components/gauges/CircularGauge';
import { LineChart } from '../../components/charts/LineChart';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { mockData } from '../../data/mockData';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export const EnergyScreen = () => {
  return (
    <AppBackground>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Typography variant="xl" fontFamily="orbitron" color={colors.textPrimary}>
            ENERGY ANALYTICS
          </Typography>
          <View style={styles.liveTag}>
            <View style={[styles.dot, { backgroundColor: colors.success }]} />
            <Typography variant="xs" color={colors.success}>LIVE</Typography>
          </View>
        </View>

        {/* Main KPI */}
        <View style={styles.mainKpiRow}>
          <GlassCard style={styles.mainKpiCard}>
            <View style={{ alignItems: 'center' }}>
              <Typography variant="sm" fontFamily="orbitron" color={colors.textSecondary}>
                CURRENT LOAD
              </Typography>
              <Typography variant="hero" fontFamily="orbitron" color={colors.warning} style={{ marginVertical: 8 }}>
                {mockData.energy.currentLoadKw}
                <Typography variant="sm" color={colors.textSecondary}> kW</Typography>
              </Typography>
              <View style={styles.trendTag}>
                <MaterialCommunityIcons name="arrow-down" size={14} color={colors.success} />
                <Typography variant="xs" color={colors.success}>12% vs yesterday</Typography>
              </View>
            </View>
          </GlassCard>

          <View style={styles.sideKpis}>
            <GlassCard style={styles.sideKpiCard} padding={12}>
              <Typography variant="xs" fontFamily="orbitron" color={colors.textSecondary}>PEAK LOAD</Typography>
              <Typography variant="lg" fontFamily="orbitron" color={colors.textPrimary} style={{ marginTop: 4 }}>
                {mockData.energy.peakLoadKw} <Typography variant="xs">kW</Typography>
              </Typography>
            </GlassCard>
            <GlassCard style={[styles.sideKpiCard, { marginTop: spacing.sm }]} padding={12}>
              <Typography variant="xs" fontFamily="orbitron" color={colors.textSecondary}>SOLAR GEN</Typography>
              <Typography variant="lg" fontFamily="orbitron" color={colors.success} style={{ marginTop: 4 }}>
                +{mockData.energy.solarGenerationKw} <Typography variant="xs">kW</Typography>
              </Typography>
            </GlassCard>
          </View>
        </View>

        {/* Charts */}
        <GlassCard style={styles.card}>
          <View style={styles.cardHeader}>
            <Typography variant="md" fontFamily="orbitron" color={colors.textCyan}>
              CONSUMPTION FORECAST
            </Typography>
          </View>
          <LineChart
            data={[3000, 3200, 3500, 4200, 4500, 4100, 3800, 3600, 3400, 3100]}
            labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            width={width - spacing.screenPadding * 2 - spacing.cardPadding * 2}
            height={160}
            color={colors.warning}
          />
        </GlassCard>

        {/* Sustainability */}
        <View style={styles.gridContainer}>
          <GlassCard style={styles.gridItem}>
            <Typography variant="sm" fontFamily="orbitron" color={colors.textSecondary} align="center" style={{ marginBottom: 16 }}>
              BUDGET UTILIZATION
            </Typography>
            <View style={{ alignItems: 'center' }}>
              <CircularGauge
                value={mockData.energy.budgetUtilizationPct}
                max={100}
                label="Monthly Budget"
                unit="%"
                size={110}
                color={colors.accentCyan}
              />
            </View>
          </GlassCard>
          
          <GlassCard style={styles.gridItem}>
            <Typography variant="sm" fontFamily="orbitron" color={colors.textSecondary} align="center" style={{ marginBottom: 16 }}>
              CARBON FOOTPRINT
            </Typography>
            <View style={{ alignItems: 'center' }}>
              <CircularGauge
                value={45}
                max={100}
                label="tons CO2e"
                unit=""
                size={110}
                color={colors.success}
              />
            </View>
          </GlassCard>
        </View>

      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.screenPadding,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  mainKpiRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  mainKpiCard: {
    flex: 2,
    marginRight: spacing.sm,
    justifyContent: 'center',
  },
  sideKpis: {
    flex: 1,
  },
  sideKpiCard: {
    flex: 1,
    justifyContent: 'center',
  },
  trendTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardHeader: {
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
  },
});
