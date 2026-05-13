import React from 'react';
import { View, StyleSheet, ViewProps, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { gradients } from '../../theme/gradients';

export interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  borderColor?: string;
  padding?: number;
  highlighted?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  borderColor = colors.glassBorder,
  padding = spacing.cardPadding,
  highlighted = false,
  style,
  ...rest
}) => {
  return (
    <View style={[styles.wrapper, style]} {...rest}>
      <View
        style={[
          styles.container,
          { borderColor: highlighted ? colors.accentCyan : borderColor },
        ]}
      >
        <View style={styles.rimTop} />
        
        <LinearGradient
          colors={gradients.glowTeal as [string, string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.rimBottom}
        />

        <View style={{ padding, zIndex: 5, flex: 1 }}>
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    borderRadius: spacing.borderRadius.lg,
  },
  container: {
    position: 'relative',
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1.5,
    overflow: 'hidden',
    backgroundColor: colors.cardBackground,
    flex: 1,
  },
  rimTop: {
    position: 'absolute',
    top: 0,
    left: '5%',
    right: '5%',
    height: 1,
    backgroundColor: colors.glassHighlight,
    zIndex: 2,
  },
  rimBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    zIndex: 2,
  },
});
