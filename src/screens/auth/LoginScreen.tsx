import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { AppBackground } from '../../components/ui/AppBackground';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>WELCOME TO</Text>
            <Text style={styles.title}>CN-05</Text>
            <Text style={styles.towerText}>TOWER</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <View style={styles.flatInputWrapper}>
                <TextInput
                  style={styles.flatInput}
                  placeholder="Username"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.flatInputWrapper}>
                <TextInput
                  style={styles.flatInput}
                  placeholder="Password"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.ghostLoginButton}
                onPress={login}
                activeOpacity={0.7}
              >
                <Text style={styles.ghostLoginText}>SIGN IN</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.ghostBiometricBtn} activeOpacity={0.7}>
                <MaterialCommunityIcons name="fingerprint" size={28} color={colors.accentCyan} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footerSpacing} />
        </ScrollView>
      </KeyboardAvoidingView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 32,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
    width: '100%',
  },
  welcomeText: {
    fontFamily: typography.fontFamilies.robotoMedium,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: typography.fontFamilies.orbitron,
    fontSize: 32,
    color: colors.accentCyan,
    letterSpacing: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  towerText: {
    fontFamily: typography.fontFamilies.orbitron,
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: -2,
  },
  subtitle: {
    fontFamily: typography.fontFamilies.roboto,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.45)',
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: '85%',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 8,
  },
  inputGroup: {
    marginBottom: 36,
  },
  flatInputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 24,
    height: 48,
    justifyContent: 'center',
  },
  flatInput: {
    color: colors.textPrimary,
    fontFamily: typography.fontFamilies.roboto,
    fontSize: 16,
    paddingVertical: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ghostLoginButton: {
    flex: 1,
    height: 56,
    borderWidth: 1.5,
    borderColor: colors.accentCyan,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostLoginText: {
    fontFamily: typography.fontFamilies.orbitron,
    fontSize: 14,
    color: colors.accentCyan,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  ghostBiometricBtn: {
    width: 56,
    height: 56,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  footerSpacing: {
    height: 60,
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
    width: 80,
    height: 32,
    marginLeft: 0,
  },
  logoSiemens: {
    width: 100,
    height: 32,
    marginRight: 0,
  },
});
