import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export interface TypographyProps extends TextProps {
  variant?: keyof typeof typography.sizes;
  fontFamily?: 'inter' | 'orbitron';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'md',
  fontFamily = 'inter',
  color = colors.textPrimary,
  align = 'left',
  style,
  children,
  ...rest
}) => {
  return (
    <Text
      style={[
        {
          fontSize: typography.sizes[variant],
          fontFamily: typography.fontFamilies[fontFamily],
          color,
          textAlign: align,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};
