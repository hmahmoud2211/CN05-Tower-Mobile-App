import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { MainTabNavigator } from './MainTabNavigator';
import { useAuthStore } from '../store/useAuthStore';
import { colors } from '../theme/colors';
import { TowerInfoScreen } from '../screens/public/TowerInfoScreen';
import { FacilitySelectionScreen } from '../screens/public/FacilitySelectionScreen';
import { MallBrandsScreen } from '../screens/public/MallBrandsScreen';

export type RootStackParamList = {
  TowerInfo: undefined;
  FacilitySelection: undefined;
  MallBrands: undefined;
  Login: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { isAuthenticated } = useAuthStore();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
      text: colors.textPrimary,
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="TowerInfo" component={TowerInfoScreen} />
            <Stack.Screen name="FacilitySelection" component={FacilitySelectionScreen} />
            <Stack.Screen name="MallBrands" component={MallBrandsScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};


