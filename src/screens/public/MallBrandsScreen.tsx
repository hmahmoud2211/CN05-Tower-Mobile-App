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

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MallBrands'>;

interface Brand {
  id: string;
  name: string;
  location: string;
  discount: string | null;
}

const BRANDS: Brand[] = [
  { id: '1', name: 'Sephora', location: 'Ground Floor - G12', discount: '15% OFF' },
  { id: '2', name: 'Louis Vuitton', location: 'Level 1 - L101', discount: null },
  { id: '3', name: 'Rolex', location: 'Level 1 - L105', discount: '5% OFF' },
  { id: '4', name: 'Gucci', location: 'Level 1 - L102', discount: null },
  { id: '5', name: 'Chanel', location: 'Level 1 - L104', discount: '10% OFF' },
  { id: '6', name: 'Dior', location: 'Level 1 - L103', discount: null },
  { id: '7', name: 'Prada', location: 'Level 2 - L201', discount: '20% OFF' },
  { id: '8', name: 'Cartier', location: 'Level 1 - L106', discount: null },
  { id: '9', name: 'Hermès', location: 'Level 1 - L107', discount: '5% OFF' },
  { id: '10', name: 'Bvlgari', location: 'Level 1 - L108', discount: null },
];

export const MallBrandsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const bgImage = require('../../../assets/cn05-night.png');

  return (
    <AppBackground imageSource={bgImage}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Mall Directory</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>


        <Text style={styles.sectionTitle}>High-End Brands</Text>

        <View style={styles.list}>
          {BRANDS.map((brand, index) => (
            <View key={brand.id} style={styles.brandCardWrapper}>
              <BlurView intensity={40} tint="dark" style={styles.brandCard}>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>{index + 1}</Text>
                </View>

                <View style={styles.brandInfo}>
                  <Text style={styles.brandName}>{brand.name}</Text>
                  <View style={styles.locationRow}>
                    <MaterialCommunityIcons name="map-marker" size={14} color={colors.textSecondary} />
                    <Text style={styles.brandLocation}>{brand.location}</Text>
                  </View>
                </View>

                <View style={styles.discountContainer}>
                  {brand.discount ? (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>{brand.discount}</Text>
                    </View>
                  ) : (
                    <Text style={styles.noDiscountText}>No Discount</Text>
                  )}
                </View>
              </BlurView>
            </View>
          ))}
        </View>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'rgba(11, 21, 38, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: colors.glassBorder,
    zIndex: 10,
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
    fontSize: 24,
    color: colors.textPrimary,
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  infoText: {
    fontFamily: typography.fontFamilies.roboto,
    fontSize: 14,
    color: colors.textCyan,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  sectionTitle: {
    fontFamily: typography.fontFamilies.robotoBold,
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  list: {
    gap: 12,
  },
  brandCardWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: colors.cardBackground,
  },
  brandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rankText: {
    fontFamily: typography.fontFamilies.robotoBold,
    fontSize: 14,
    color: colors.textSecondary,
  },
  brandInfo: {
    flex: 1,
  },
  brandName: {
    fontFamily: typography.fontFamilies.robotoBold,
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLocation: {
    fontFamily: typography.fontFamilies.roboto,
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  discountContainer: {
    marginLeft: 12,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  discountBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: colors.success,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    fontFamily: typography.fontFamilies.robotoBold,
    fontSize: 13,
    color: colors.success,
  },
  noDiscountText: {
    fontFamily: typography.fontFamilies.roboto,
    fontSize: 13,
    color: colors.textMuted,
  },
});
