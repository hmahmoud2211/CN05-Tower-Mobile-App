import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, LinearGradient, Stop, Defs } from 'react-native-svg';
import { colors } from '../../theme/colors';
import { Typography } from '../ui/Typography';

export interface LineChartProps {
  data: number[];
  labels: string[];
  width?: number;
  height?: number;
  color?: string;
  title?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  labels,
  width = Dimensions.get('window').width - 64, // Default padding
  height = 150,
  color = colors.accentCyan,
  title,
}) => {
  if (!data || data.length === 0) return null;

  const padding = 20;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Calculate points
  const points = data.map((val, index) => {
    const x = padding + (index / (data.length - 1)) * innerWidth;
    const y = padding + innerHeight - ((val - min) / range) * innerHeight;
    return `${x},${y}`;
  });

  const pathData = `M ${points.join(' L ')}`;
  
  // For the area under the line
  const areaData = `${pathData} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;

  return (
    <View style={styles.container}>
      {title && (
        <Typography variant="sm" color={colors.textSecondary} style={{ marginBottom: 8 }}>
          {title}
        </Typography>
      )}
      
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <Stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </LinearGradient>
        </Defs>

        {/* Grid Lines (simplified) */}
        <Path d={`M ${padding} ${padding} L ${width - padding} ${padding}`} stroke="rgba(255,255,255,0.05)" />
        <Path d={`M ${padding} ${height / 2} L ${width - padding} ${height / 2}`} stroke="rgba(255,255,255,0.05)" />
        <Path d={`M ${padding} ${height - padding} L ${width - padding} ${height - padding}`} stroke="rgba(255,255,255,0.05)" />

        {/* Area */}
        <Path d={areaData} fill="url(#gradient)" />

        {/* Line */}
        <Path d={pathData} fill="none" stroke={color} strokeWidth="2" />
      </Svg>
      
      <View style={[styles.labelsContainer, { width, paddingHorizontal: padding }]}>
        {labels.map((label, i) => (
          <Typography key={i} variant="xs" color={colors.textMuted}>
            {label}
          </Typography>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 8,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
});
