import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { AppBackground } from '../../components/ui/AppBackground';
import { Typography } from '../../components/ui/Typography';
import { GlassCard } from '../../components/ui/GlassCard';
import { useAuthStore } from '../../store/useAuthStore';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const LoginScreen = () => {
  const { login } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AppBackground>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.brandingContainer}>
          <MaterialCommunityIcons name="office-building" size={64} color={colors.accentCyan} style={styles.logo} />
          <Typography variant="hero" fontFamily="orbitron" color={colors.textPrimary} align="center">
            CN-05 TOWER
          </Typography>
          <Typography variant="sm" color={colors.accentCyan} align="center" style={styles.subtitle}>
            INTELLIGENT MANAGEMENT SYSTEM
          </Typography>
        </View>

        <GlassCard style={styles.card} highlighted borderColor={colors.glassBorder}>
          <Typography variant="lg" fontFamily="orbitron" style={{ marginBottom: spacing.lg }}>
            SECURE ACCESS
          </Typography>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="account" size={20} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Operator ID"
              placeholderTextColor={colors.textMuted}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock" size={20} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Passcode"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={login} activeOpacity={0.8}>
            <Typography variant="md" fontFamily="orbitron" color={colors.background} style={{ fontWeight: 'bold' }}>
              INITIALIZE CONNECTION
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity style={styles.biometricBtn} activeOpacity={0.8}>
            <MaterialCommunityIcons name="fingerprint" size={32} color={colors.accentCyan} />
            <Typography variant="xs" color={colors.textSecondary} style={{ marginTop: 8 }}>
              BIOMETRIC LOGIN
            </Typography>
          </TouchableOpacity>
        </GlassCard>

      </KeyboardAvoidingView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.screenPadding,
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logo: {
    marginBottom: spacing.sm,
    textShadowColor: colors.glassGlowTeal,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    letterSpacing: 4,
    marginTop: 4,
  },
  card: {
    padding: spacing.xl,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 21, 38, 0.6)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: spacing.borderRadius.sm,
    marginBottom: spacing.md,
    height: 50,
    paddingHorizontal: spacing.md,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontFamily: 'Inter',
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.accentCyan,
    height: 50,
    borderRadius: spacing.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    shadowColor: colors.accentCyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  biometricBtn: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
});
