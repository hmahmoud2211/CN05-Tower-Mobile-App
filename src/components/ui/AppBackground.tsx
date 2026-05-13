import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

export const AppBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradientTop, colors.gradientMid, colors.gradientBottom]}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Decorative background grid (optional) */}
      <View style={styles.gridOverlay} />

      {/* Ambient glow effects */}
      <View style={[styles.glow, styles.glowTopLeft]} />
      <View style={[styles.glow, styles.glowBottomRight]} />

      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.05,
    // A simple CSS grid pattern could be implemented here via an SVG or Image,
    // but we'll leave it as a tinted overlay for now
    backgroundColor: 'transparent',
  },
  glow: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    opacity: 0.15,
    zIndex: 1,
    backgroundColor: colors.accentCyan,
    // React Native doesn't support filter: blur, so we just use a low opacity shape
  },
  glowTopLeft: {
    top: -width * 0.2,
    left: -width * 0.2,
  },
  glowBottomRight: {
    bottom: -width * 0.2,
    right: -width * 0.2,
    backgroundColor: colors.zoneResidential,
  },
});
