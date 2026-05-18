import React from 'react';
import { View, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { AppBackground } from '../../components/ui/AppBackground';
import { Typography } from '../../components/ui/Typography';
import { GlassCard } from '../../components/ui/GlassCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CircularGauge } from '../../components/gauges/CircularGauge';

import { AppHeader } from '../../components/layout/AppHeader';

const bgImage = require('../../../assets/cn05-night.png');

export const MaintenanceScreen = () => {
  const systems = [
    { name: 'HVAC Units', health: 92, status: 'normal' },
    { name: 'Elevators', health: 76, status: 'warning' },
    { name: 'Water Pumps', health: 98, status: 'normal' },
    { name: 'Generators', health: 100, status: 'normal' },
  ];

  const tasks = [
    { id: '1', title: 'Inspect Elevator E5 Motor', time: 'Today, 14:00', priority: 'High', type: 'predictive' },
    { id: '2', title: 'Replace HVAC Filters Floor 12', time: 'Tomorrow, 09:00', priority: 'Medium', type: 'routine' },
  ];

  return (
    <AppBackground imageSource={bgImage}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AppHeader />
        <View style={{ height: 20 }} />

        <View style={styles.gridContainer}>
          {systems.map((sys, idx) => (
            <GlassCard key={idx} style={styles.gridItem}>
              <View style={styles.sysHeader}>
                <Typography variant="sm" fontFamily="orbitron" color={colors.textSecondary}>
                  {sys.name.toUpperCase()}
                </Typography>
                <MaterialCommunityIcons 
                  name={sys.status === 'warning' ? 'alert' : 'check-circle'} 
                  size={16} 
                  color={sys.status === 'warning' ? colors.warning : colors.success} 
                />
              </View>
              <View style={{ alignItems: 'center', marginTop: 8 }}>
                <CircularGauge
                  value={sys.health}
                  max={100}
                  label="Health Score"
                  unit="%"
                  size={100}
                  color={sys.status === 'warning' ? colors.warning : colors.success}
                  gradientColors={sys.status === 'warning' ? [colors.warning, colors.danger] : [colors.success, colors.accentCyan]}
                />
              </View>
            </GlassCard>
          ))}
        </View>

        <Typography variant="md" fontFamily="orbitron" color={colors.textCyan} style={styles.sectionTitle}>
          AI RECOMMENDED TASKS
        </Typography>

        {tasks.map(task => (
          <GlassCard key={task.id} style={styles.taskCard} borderColor={task.priority === 'High' ? colors.warning : colors.glassBorder}>
            <View style={styles.taskHeader}>
              <View style={styles.taskBadge}>
                <Typography variant="xs" color={task.priority === 'High' ? colors.warning : colors.accentCyan} style={{ fontWeight: 'bold' }}>
                  {task.type.toUpperCase()}
                </Typography>
              </View>
              <Typography variant="xs" color={colors.textSecondary}>
                {task.time}
              </Typography>
            </View>
            <Typography variant="md" style={{ fontWeight: 'bold', marginTop: 8 }}>
              {task.title}
            </Typography>
            <View style={styles.taskFooter}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="alert-circle-outline" size={14} color={colors.textSecondary} style={{ marginRight: 4 }} />
                <Typography variant="xs" color={colors.textSecondary}>
                  Priority: {task.priority}
                </Typography>
              </View>
              <TouchableOpacity style={styles.assignBtn}>
                <Typography variant="xs" color={colors.background} style={{ fontWeight: 'bold' }}>
                  ASSIGN
                </Typography>
              </TouchableOpacity>
            </View>
          </GlassCard>
        ))}

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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: spacing.md,
  },
  sysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  taskCard: {
    marginBottom: spacing.md,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 12,
  },
  assignBtn: {
    backgroundColor: colors.accentCyan,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: spacing.borderRadius.full,
  },
});
