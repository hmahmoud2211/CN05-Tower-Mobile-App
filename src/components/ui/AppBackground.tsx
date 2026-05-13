import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

interface AppBackgroundProps {
  children?: React.ReactNode;
  imageSource?: ImageSourcePropType;
}

export const AppBackground: React.FC<AppBackgroundProps> = ({ children, imageSource }) => {
  if (imageSource) {
    return (
      <View style={styles.container}>
        <ImageBackground 
          source={imageSource} 
          style={[StyleSheet.absoluteFillObject, { width: '100%', height: '100%' }]} 
          imageStyle={{ resizeMode: 'cover', width: '100%', height: '100%' }}
        >
          <View style={styles.darkOverlay} />
        </ImageBackground>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    );
  }

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
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 11, 20, 0.7)', // Adds darkness over the image to keep text readable
    zIndex: 1,
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
