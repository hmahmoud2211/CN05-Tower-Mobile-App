import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
          backgroundColor: colors.background,
          borderTopColor: colors.glassBorder,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.accentCyan,
        tabBarInactiveTintColor: colors.textMuted,
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
