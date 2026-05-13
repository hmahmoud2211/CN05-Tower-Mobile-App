import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface PulseIndicatorProps {
  color?: string;
  size?: number;
}

export const PulseIndicator: React.FC<PulseIndicatorProps> = ({ 
  color = colors.success, 
  size = 8 
}) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [anim]);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View
        style={[
          styles.pulse,
          {
            backgroundColor: color,
            width: size * 2.5,
            height: size * 2.5,
            borderRadius: size * 1.25,
            opacity: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 0],
            }),
            transform: [
              {
                scale: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1.5],
                }),
              },
            ],
          },
        ]}
      />
      <View
        style={[
          styles.dot,
          { backgroundColor: color, width: size, height: size, borderRadius: size / 2 },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
  },
  pulse: {
    position: 'absolute',
  },
});
