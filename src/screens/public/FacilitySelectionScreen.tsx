import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { AppBackground } from '../../components/ui/AppBackground';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'FacilitySelection'>;

export const FacilitySelectionScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const facilities = [
    {
      id: 'mall',
      title: 'High-End Mall',
      description: 'Explore premium brands, exclusive discounts, and automated directories.',
      icon: 'shopping-outline',
      color: colors.zoneCommercial,
      action: () => navigation.navigate('MallBrands'),
    },
    {
      id: 'clinics',
      title: 'Smart Clinics',
      description: 'AI-assisted appointments, predictive wait times, and health services.',
      icon: 'hospital-building',
      color: colors.zoneMedical,
      action: () => console.log('Navigate to Clinics'), // To be implemented later
    },
    {
      id: 'offices',
      title: 'Residential Offices',
      description: 'Luxury automated workspaces and premium residential zones.',
      icon: 'office-building',
      color: colors.zoneResidential,
      action: () => console.log('Navigate to Offices'), // To be implemented later
    },
  ];

  const bgImage = require('../../../assets/cn05-night.png');

  return (
    <AppBackground imageSource={bgImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Select Destination</Text>
        </View>

        <Text style={styles.subtitle}>
          Where would you like to explore in the CN-05 Tower today?
        </Text>

        <View style={styles.cardsContainer}>
          {facilities.map((facility) => (
            <TouchableOpacity 
              key={facility.id} 
              style={styles.cardContainer}
              onPress={facility.action}
              activeOpacity={0.8}
            >
              <BlurView intensity={30} tint="dark" style={styles.card}>
                <View style={[styles.iconContainer, { backgroundColor: facility.color + '20' }]}>
                  <MaterialCommunityIcons name={facility.icon as any} size={40} color={facility.color} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{facility.title}</Text>
                  <Text style={styles.cardDescription}>{facility.description}</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={28} color={colors.textMuted} />
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  title: {
    fontFamily: typography.fontFamilies.orbitron,
    fontSize: 28,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: typography.fontFamilies.roboto,
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 40,
    lineHeight: 24,
  },
  cardsContainer: {
    gap: 20,
  },
  cardContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: colors.cardBackground,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: typography.fontFamilies.robotoBold,
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  cardDescription: {
    fontFamily: typography.fontFamilies.roboto,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
