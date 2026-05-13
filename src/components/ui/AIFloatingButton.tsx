import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export const AIFloatingButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Animated.View
        style={[
          styles.glow,
          {
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />
      <MaterialCommunityIcons name="robot-outline" size={28} color={colors.background} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.accentCyan,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: colors.accentCyan,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    zIndex: 100,
  },
  glow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.accentCyan,
    opacity: 0.5,
  },
});
