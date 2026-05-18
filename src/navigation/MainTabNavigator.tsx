import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { DigitalTwinScreen } from '../screens/digital-twin/DigitalTwinScreen';
import { AIAssistantScreen } from '../screens/ai-assistant/AIAssistantScreen';
import { MaintenanceScreen } from '../screens/maintenance/MaintenanceScreen';
import { EnergyScreen } from '../screens/energy/EnergyScreen';
import { colors } from '../theme/colors';

export type MainTabParamList = {
  Dashboard: undefined;
  DigitalTwin: undefined;
  AIAssistant: undefined;
  Maintenance: undefined;
  Energy: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 24 : 16,
          left: 16,
          right: 16,
          height: 68,
          borderRadius: 34,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.15)',
          backgroundColor: 'rgba(11, 21, 38, 0.5)',
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 15,
          overflow: 'hidden',
          paddingBottom: Platform.OS === 'ios' ? 12 : 10,
          paddingTop: 10,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={45}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarActiveTintColor: colors.accentCyan,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginTop: -2,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DigitalTwin"
        component={DigitalTwinScreen}
        options={{
          tabBarLabel: 'Digital Twin',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="office-building" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AIAssistant"
        component={AIAssistantScreen}
        options={{
          tabBarLabel: 'AI Assistant',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="robot" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Maintenance"
        component={MaintenanceScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tools" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Energy"
        component={EnergyScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightning-bolt" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
