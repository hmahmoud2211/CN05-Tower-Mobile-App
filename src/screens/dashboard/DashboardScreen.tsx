import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native';
import { AppBackground } from '../../components/ui/AppBackground';
import { Typography } from '../../components/ui/Typography';
import { GlassCard } from '../../components/ui/GlassCard';
import { CircularGauge } from '../../components/gauges/CircularGauge';
import { LineChart } from '../../components/charts/LineChart';
import { PulseIndicator } from '../../components/ui/PulseIndicator';
import { useTowerStore } from '../../store/useTowerStore';
import { useAuthStore } from '../../store/useAuthStore';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { mockData } from '../../data/mockData';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppHeader } from '../../components/layout/AppHeader';

const { width } = Dimensions.get('window');

const bgImage = require('../../../assets/cn05-night.png');

export const DashboardScreen = () => {
  const { health, activeAlarms, powerConsumptionKw, waterConsumptionM3 } = useTowerStore();
  const { user } = useAuthStore();

  return (
    <AppBackground imageSource={bgImage}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <AppHeader />
        <View style={{ height: 20 }} />

        {/* System Health Overview */}
        <GlassCard style={styles.card}>
          <View style={styles.cardHeader}>
            <Typography variant="md" fontFamily="orbitron" color={colors.textCyan}>
              SYSTEM HEALTH
            </Typography>
            <MaterialCommunityIcons name="heart-pulse" size={20} color={colors.accentCyan} />
          </View>
          
          <View style={styles.healthGrid}>
            <View style={styles.healthItem}>
              <Typography variant="hero" fontFamily="orbitron" color={colors.success}>
                {health.overall}%
              </Typography>
              <Typography variant="xs" color={colors.textSecondary} style={{ marginTop: 4 }}>OVERALL</Typography>
            </View>
            <View style={styles.healthDivider} />
            <View style={styles.healthItem}>
              <Typography variant="xxl" fontFamily="orbitron" color={colors.textPrimary}>
                {health.hvac}%
              </Typography>
              <Typography variant="xs" color={colors.textSecondary} style={{ marginTop: 4 }}>HVAC</Typography>
            </View>
            <View style={styles.healthDivider} />
            <View style={styles.healthItem}>
              <Typography variant="xxl" fontFamily="orbitron" color={colors.warning}>
                {health.elevators}%
              </Typography>
              <Typography variant="xs" color={colors.textSecondary} style={{ marginTop: 4 }}>LIFTS</Typography>
            </View>
          </View>
        </GlassCard>

        {/* Key Metrics Row */}
        <View style={styles.metricsRow}>
          <GlassCard style={[styles.card, styles.halfCard]}>
            <View style={styles.cardHeader}>
              <Typography variant="sm" fontFamily="orbitron" color={colors.textSecondary}>
                POWER
              </Typography>
              <MaterialCommunityIcons name="lightning-bolt" size={16} color={colors.warning} />
            </View>
            <View style={{ alignItems: 'center', paddingBottom: 8 }}>
              <CircularGauge
                value={powerConsumptionKw}
                max={6000}
                label="Current Load"
                unit="kW"
                size={110}
                color={colors.warning}
                gradientColors={[colors.warning, colors.danger]}
              />
            </View>
          </GlassCard>

          <GlassCard style={[styles.card, styles.halfCard]}>
            <View style={styles.cardHeader}>
              <Typography variant="sm" fontFamily="orbitron" color={colors.textSecondary}>
                WATER
              </Typography>
              <MaterialCommunityIcons name="water" size={16} color={colors.accentCyan} />
            </View>
            <View style={{ alignItems: 'center', paddingBottom: 8 }}>
              <CircularGauge
                value={waterConsumptionM3}
                max={200}
                label="Daily Usage"
                unit="m³"
                size={110}
                color={colors.accentCyan}
              />
            </View>
          </GlassCard>
        </View>

        {/* Energy Trend */}
        <GlassCard style={styles.card}>
          <View style={styles.cardHeader}>
            <Typography variant="md" fontFamily="orbitron" color={colors.textCyan}>
              ENERGY TREND (24H)
            </Typography>
          </View>
          <LineChart
            data={[3000, 3200, 2800, 2500, 2400, 2600, 3100, 4200, 5100, 4800, 4500, 4250]}
            labels={['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']}
            width={width - spacing.screenPadding * 2 - spacing.cardPadding * 2}
            height={160}
          />
        </GlassCard>

        {/* AI Insights Summary */}
        <GlassCard style={styles.card} highlighted borderColor={colors.accentCyan}>
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="robot-outline" size={18} color={colors.accentCyan} style={{ marginRight: 8 }} />
              <Typography variant="md" fontFamily="orbitron" color={colors.accentCyan}>
                AI INSIGHTS
              </Typography>
            </View>
            <View style={{ backgroundColor: 'rgba(34, 211, 238, 0.2)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 }}>
              <Typography variant="xs" color={colors.accentCyan}>2 NEW</Typography>
            </View>
          </View>
          <View style={{ marginTop: 12 }}>
            {mockData.aiInsights.map((insight, index) => (
              <View key={insight.id} style={{ marginBottom: index === 0 ? 12 : 0, flexDirection: 'row' }}>
                <MaterialCommunityIcons 
                  name={insight.type === 'warning' ? 'alert-circle-outline' : 'lightbulb-on-outline'} 
                  size={20} 
                  color={insight.type === 'warning' ? colors.warning : colors.accentCyan} 
                  style={{ marginRight: 12, marginTop: 2 }}
                />
                <View style={{ flex: 1 }}>
                  <Typography variant="sm" style={{ fontWeight: 'bold', marginBottom: 4 }}>
                    {insight.title}
                  </Typography>
                  <Typography variant="xs" color={colors.textSecondary} style={{ lineHeight: 16 }}>
                    {insight.description}
                  </Typography>
                </View>
              </View>
            ))}
          </View>
        </GlassCard>

      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: 100,
  },
  card: {
    marginBottom: spacing.md,
  },
  halfCard: {
    flex: 1,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  healthGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  healthItem: {
    flex: 1,
    alignItems: 'center',
  },
  healthDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});
