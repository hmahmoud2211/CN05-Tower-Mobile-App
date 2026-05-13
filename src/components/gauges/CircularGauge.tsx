import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle, Line } from 'react-native-svg';
import { Typography } from '../ui/Typography';
import { colors } from '../../theme/colors';

export interface CircularGaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  size?: number;
  color?: string;
  gradientColors?: string[];
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({
  value,
  max,
  label,
  unit,
  size = 120,
  color = colors.accentCyan,
  gradientColors = [color, colors.accentTeal],
}) => {
  const [animValue, setAnimValue] = useState(0);
  const strokeWidth = size * 0.08; // Thinner, more elegant stroke
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const gradId = `gaugeGrad-${label.replace(/\s+/g, '')}`;

  useEffect(() => {
    // Simple mock animation implementation using setInterval since Reanimated requires babel config
    const targetVal = Math.min(Math.max(value, 0), max);
    let current = 0;
    const duration = 1000;
    const frames = 30;
    const step = targetVal / frames;
    const intervalTime = duration / frames;

    const interval = setInterval(() => {
      current += step;
      if (current >= targetVal) {
        setAnimValue(targetVal);
        clearInterval(interval);
      } else {
        setAnimValue(current);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [value, max]);

  const progress = animValue / max;
  // Offset to start from bottom left and go to bottom right
  const arcLength = circumference * 0.75;
  const strokeDashoffset = circumference - (progress * arcLength);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={gradientColors[0]} />
            <Stop offset="100%" stopColor={gradientColors[1]} />
          </LinearGradient>
        </Defs>

        {/* Background track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={circumference - arcLength}
          strokeLinecap="round"
          transform={`rotate(135 ${size/2} ${size/2})`}
        />

        {/* Progress arc */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(135 ${size/2} ${size/2})`}
        />
      </Svg>

      <View style={[styles.valueContainer, { top: size * 0.35 }]}>
        <Typography variant="xxl" fontFamily="orbitron" color={colors.textPrimary}>
          {Math.round(animValue)}
        </Typography>
        <Typography variant="xs" color={colors.textSecondary} style={{ marginTop: -2 }}>
          {unit}
        </Typography>
      </View>
      
      <View style={styles.labelContainer}>
        <Typography variant="xs" color={colors.textSecondary}>
          {label}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  valueContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    position: 'absolute',
    bottom: 0,
  },
});
