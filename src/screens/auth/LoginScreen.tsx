import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { AppBackground } from '../../components/ui/AppBackground';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../../store/useAuthStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const bgImage = require('../../../assets/cn05-night.png');

  return (
    <AppBackground imageSource={bgImage}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.logosContainer}>
          <Image source={require('../../../assets/ems.png')} style={styles.logoEms} resizeMode="contain" />
          <Image source={require('../../../assets/siemens.png')} style={styles.logoSiemens} resizeMode="contain" />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>CN-05</Text>
            <Text style={styles.subtitle}>Secure Access Portal</Text>

          </View>

          <View style={styles.loginCard}>
            <BlurView intensity={30} tint="dark" style={styles.cardBlur}>
              <Text style={styles.cardTitle}>Sign In</Text>

              <View style={styles.inputGroup}>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="account-outline" size={20} color={colors.accentCyan} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor={colors.textMuted}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="lock-outline" size={20} color={colors.accentCyan} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={colors.textMuted}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={login}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[colors.accentCyan, colors.accentTeal]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                  <MaterialCommunityIcons name="login" size={20} color={colors.background} />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.biometricBtn} activeOpacity={0.7}>
                <MaterialCommunityIcons name="fingerprint" size={32} color={colors.accentCyan} />
                <Text style={styles.biometricText}>Biometric Login</Text>
              </TouchableOpacity>
            </BlurView>
          </View>

          <TouchableOpacity
            style={styles.visitorLink}
            onPress={() => navigation.navigate('TowerInfo')}
          >
            <Text style={styles.visitorLinkText}>Visitor Access & Information</Text>
            <MaterialCommunityIcons name="arrow-right" size={16} color={colors.accentCyan} />
          </TouchableOpacity>

          <View style={styles.footerSpacing} />
        </ScrollView>
      </KeyboardAvoidingView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 24,
    paddingTop: 80,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  header: {
    marginBottom: 100,
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.fontFamilies.orbitron,
    fontSize: 36,
    color: colors.textPrimary,
    letterSpacing: 3,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.fontFamilies.robotoMedium,
    fontSize: 16,
    color: colors.accentCyan,
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  description: {
    fontFamily: typography.fontFamilies.roboto,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: '80%',
  },
  loginCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: colors.glassBorder,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 24,
  },
  cardBlur: {
    padding: 24,
  },
  cardTitle: {
    fontFamily: typography.fontFamilies.orbitron,
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontFamily: typography.fontFamilies.roboto,
    fontSize: 16,
  },
  loginButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.accentCyan,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  loginButtonText: {
    fontFamily: typography.fontFamilies.robotoBold,
    fontSize: 16,
    color: colors.background,
    marginRight: 10,
    textTransform: 'uppercase',
  },
  biometricBtn: {
    alignItems: 'center',
    marginTop: 24,
  },
  biometricText: {
    fontFamily: typography.fontFamilies.roboto,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
  },
  visitorLink: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 12,
  },
  visitorLinkText: {
    fontFamily: typography.fontFamilies.robotoMedium,
    fontSize: 14,
    color: colors.accentCyan,
    marginRight: 8,
  },
  footerSpacing: {
    height: 40,
  },
  logosContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    zIndex: 100,
  },
  logoEms: {
    width: 100,
    height: 40,
  },
  logoSiemens: {
    width: 120,
    height: 40,
  },
});
