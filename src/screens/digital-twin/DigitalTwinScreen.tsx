import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform, Image, Animated, Easing, TouchableOpacity } from 'react-native';
import { AppBackground } from '../../components/ui/AppBackground';
import { Typography } from '../../components/ui/Typography';
import { GlassCard } from '../../components/ui/GlassCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getFloorData } from '../../data/mockData';

import { AppHeader } from '../../components/layout/AppHeader';

export const DigitalTwinScreen = () => {
  const [activeFloor, setActiveFloor] = useState(45);
  const [activeNode, setActiveNode] = useState<any>(null);
  const floors = Array.from({ length: 60 }, (_, i) => 60 - i);
  
  const currentData = getFloorData(activeFloor);

  // Simple scanline animation for the tech-y effect
  const [scanline] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(scanline, {
        toValue: 1,
        duration: 3500,
        easing: Easing.linear,
        useNativeDriver: false, // useNativeDriver must be false when animating top/bottom
      })
    ).start();
  }, []);

  useEffect(() => {
    // Reset active node when floor changes
    setActiveNode(null);
  }, [activeFloor]);

  const topPosition = scanline.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <AppBackground>
      <View style={styles.container}>
        <AppHeader />
        <View style={{ height: 10 }} />

        <View style={styles.content}>
          {/* Floor Selector (Left Side) */}
          <View style={styles.floorSelector}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {floors.map(floor => (
                <View 
                  key={floor} 
                  style={[styles.floorItem, floor === activeFloor && styles.floorItemActive]}
                  onTouchEnd={() => setActiveFloor(floor)}
                >
                  <Typography 
                    variant="xs" 
                    fontFamily="orbitron" 
                    color={floor === activeFloor ? colors.background : colors.textSecondary}
                    style={{ fontWeight: floor === activeFloor ? 'bold' : 'normal' }}
                  >
                    F{floor}
                  </Typography>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* 2D Plan / Visualization View (Right Side) */}
          <View style={styles.planView}>
            <GlassCard style={styles.planCard} highlighted>
              <View style={styles.planHeader}>
                <Typography variant="md" fontFamily="orbitron" color={colors.textCyan}>
                  FLOOR {activeFloor}: {currentData.type.toUpperCase()}
                </Typography>
                <View style={[styles.statusBadge, currentData.status === 'HIGH TRAFFIC' && { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
                  <Typography variant="xs" color={currentData.status === 'HIGH TRAFFIC' ? colors.warning : colors.success}>
                    {currentData.status}
                  </Typography>
                </View>
              </View>

              {/* Visualization Canvas */}
              <View style={styles.svgPlaceholder}>
                <Image 
                  source={require('../../../assets/tower-night.png')} 
                  style={styles.backgroundImage} 
                  resizeMode="cover"
                />
                
                {/* Tech overlay grid and scanline */}
                <View style={styles.gridOverlay} />
                <Animated.View style={[styles.scanline, { top: topPosition }]} />

                {/* Simulated Nodes mapped from data */}
                {currentData.nodes.map(node => (
                  <TouchableOpacity 
                    key={node.id} 
                    style={[
                      styles.node, 
                      { top: `${node.y}%`, left: `${node.x}%` },
                      node.status === 'warning' && styles.nodeWarning,
                      node.type === 'security' && styles.nodePrimary,
                      activeNode?.id === node.id && styles.nodeActive
                    ]}
                    onPress={() => setActiveNode(node)}
                    activeOpacity={0.8}
                  >
                    <MaterialCommunityIcons 
                      name={node.type === 'hvac' ? 'fan' : node.type === 'security' ? 'cctv' : 'lightning-bolt'} 
                      size={14} 
                      color={colors.background} 
                    />
                  </TouchableOpacity>
                ))}

                {/* Active Node Details Panel */}
                {activeNode && (
                  <View style={styles.nodeDetailsPanel}>
                    <GlassCard padding={12} borderColor={colors.accentCyan} style={{ backgroundColor: 'rgba(11, 21, 38, 0.9)' }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <MaterialCommunityIcons 
                            name={activeNode.type === 'hvac' ? 'fan' : activeNode.type === 'security' ? 'cctv' : 'lightning-bolt'} 
                            size={24} 
                            color={activeNode.status === 'warning' ? colors.warning : colors.accentCyan} 
                          />
                          <View style={{ marginLeft: 12 }}>
                            <Typography variant="sm" fontFamily="orbitron" color={colors.textPrimary}>
                              {activeNode.type.toUpperCase()} SENSOR {activeNode.id.toUpperCase()}
                            </Typography>
                            <Typography variant="xs" color={activeNode.status === 'warning' ? colors.warning : colors.success}>
                              STATUS: {activeNode.status.toUpperCase()}
                            </Typography>
                          </View>
                        </View>
                        <TouchableOpacity onPress={() => setActiveNode(null)} style={{ padding: 4 }}>
                          <MaterialCommunityIcons name="close" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>
                      </View>

                      <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                          <Typography variant="xs" color={colors.textSecondary}>Location</Typography>
                          <Typography variant="sm" fontFamily="orbitron">Flr {activeFloor}, Sec {activeNode.x}</Typography>
                        </View>
                        <View>
                          <Typography variant="xs" color={colors.textSecondary}>Reading</Typography>
                          <Typography variant="sm" fontFamily="orbitron" color={colors.accentCyan}>
                            {activeNode.type === 'hvac' ? '22.5°C / 45%' : activeNode.type === 'power' ? '42.5 kW' : 'Online / Recording'}
                          </Typography>
                        </View>
                        <View>
                          <Typography variant="xs" color={colors.textSecondary}>Uptime</Typography>
                          <Typography variant="sm" fontFamily="orbitron">99.8%</Typography>
                        </View>
                      </View>
                    </GlassCard>
                  </View>
                )}
              </View>

              {/* Floor KPI Summary */}
              <View style={styles.kpiRow}>
                <View style={styles.kpiItem}>
                  <Typography variant="xs" color={colors.textSecondary}>Occupancy</Typography>
                  <Typography variant="lg" fontFamily="orbitron" color={currentData.occupancy > 80 ? colors.warning : colors.textPrimary}>
                    {currentData.occupancy}%
                  </Typography>
                </View>
                <View style={styles.kpiItem}>
                  <Typography variant="xs" color={colors.textSecondary}>Avg Temp</Typography>
                  <Typography variant="lg" fontFamily="orbitron">{currentData.temperature}°</Typography>
                </View>
                <View style={styles.kpiItem}>
                  <Typography variant="xs" color={colors.textSecondary}>Air Qual</Typography>
                  <Typography variant="lg" fontFamily="orbitron" color={colors.success}>{currentData.airQuality}</Typography>
                </View>
              </View>
            </GlassCard>
          </View>
        </View>
      </View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 90, // Tab bar padding
  },
  floorSelector: {
    width: 60,
    borderRightWidth: 1,
    borderRightColor: colors.glassBorder,
    alignItems: 'center',
  },
  floorItem: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
    borderRadius: 20,
    cursor: 'pointer',
  },
  floorItemActive: {
    backgroundColor: colors.accentCyan,
  },
  planView: {
    flex: 1,
    padding: spacing.md,
  },
  planCard: {
    flex: 1,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
    zIndex: 2,
  },
  statusBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  svgPlaceholder: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.8)',
    overflow: 'hidden',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.1)',
  },
  scanline: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(34, 211, 238, 0.5)',
    shadowColor: colors.accentCyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    zIndex: 10,
  },
  node: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    zIndex: 20,
  },
  nodeWarning: {
    backgroundColor: colors.warning,
    shadowColor: colors.warning,
  },
  nodePrimary: {
    backgroundColor: colors.accentCyan,
    shadowColor: colors.accentCyan,
  },
  nodeActive: {
    transform: [{ scale: 1.3 }],
    borderWidth: 3,
    borderColor: '#ffffff',
    zIndex: 25,
  },
  nodeDetailsPanel: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    zIndex: 30,
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.glassBorder,
  },
  kpiItem: {
    alignItems: 'center',
  },
});
