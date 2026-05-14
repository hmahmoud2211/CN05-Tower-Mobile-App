import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { AppBackground } from '../../components/ui/AppBackground';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TowerInfo'>;

export const TowerInfoScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const AI_IDEAS = [
    {
      icon: 'robot-outline',
      title: 'Robotic Concierge',
      description: 'Programmed physical robots directing visitors to specific clinics, stores, or offices.',
    },
    {
      icon: 'chat-processing-outline',
      title: 'Smart Chatbot',
      description: 'Instant AI answers for mall directories, clinic appointments, and residential inquiries.',
    },
    {
      icon: 'microphone',
      title: 'Voice Assistant',
      description: 'Voice-activated navigators in elevators and smart kiosks throughout the tower.',
    },
    {
      icon: 'chart-line',
      title: 'Predictive Analytics',
      description: 'Real-time modeling for wait times, crowd control, and energy management.',
    },
  ];

  const bgImage = require('../../../assets/cn05-night.png');

  return (
    <AppBackground imageSource={bgImage}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>CN-05</Text>
          <Text style={styles.subtitle}>Smart Tower Digital Twin</Text>
          <Text style={styles.description}>
            Experience the future of integrated living and commerce. The CN-05 Tower seamlessly combines luxury residential offices, a high-end mall, and state-of-the-art medical clinics, all managed by advanced AI.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Integration Ideas</Text>
          {AI_IDEAS.map((idea, index) => (
            <View key={index} style={styles.card}>
              <BlurView intensity={20} tint="dark" style={styles.cardBlur}>
                <View style={styles.cardHeader}>
                  <MaterialCommunityIcons name={idea.icon as any} size={24} color={colors.accentCyan} />
                  <Text style={styles.cardTitle}>{idea.title}</Text>
                </View>
                <Text style={styles.cardDescription}>{idea.description}</Text>
              </BlurView>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[colors.accentCyan, colors.accentTeal]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.signupButtonText}>Sign Up for Discounts</Text>
            <MaterialCommunityIcons name="arrow-right" size={24} color={colors.background} />
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.footerSpacing} />
      </ScrollView>
    </AppBackground>
  );
};

// We need to import LinearGradient, let's just use it above and add import here
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  scrollContent: {
    padding: 24,
    paddingTop: 10,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.fontFamilies.orbitron,
    fontSize: 24,
    color: colors.textPrimary,
    letterSpacing: 2,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.fontFamilies.robotoMedium,
    fontSize: 12,
    color: colors.accentCyan,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontFamily: typography.fontFamilies.roboto,
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontFamily: typography.fontFamilies.robotoBold,
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 14,
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderColor: colors.glassBorder,
    borderWidth: 1,
    backgroundColor: colors.cardBackground,
  },
  cardBlur: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: typography.fontFamilies.robotoBold,
    fontSize: 14,
    color: colors.textPrimary,
    marginLeft: 12,
  },
  cardDescription: {
    fontFamily: typography.fontFamilies.roboto,
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  signupButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: colors.accentCyan,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  signupButtonText: {
    fontFamily: typography.fontFamilies.robotoBold,
    fontSize: 14,
    color: colors.background,
    marginRight: 8,
  },
  footerSpacing: {
    height: 40,
  },
  topHeader: {
    paddingTop: 40,
    paddingHorizontal: 20,
    zIndex: 100,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});
