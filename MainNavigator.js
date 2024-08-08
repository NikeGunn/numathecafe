// MainNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import OrderScreen from './screens/OrderScreen';
import AuditScreen from './screens/AuditScreen';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ name, color, size }) => (
  <MaterialCommunityIcons name={name} size={size} color={color} />
);

const TabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.tabButton}
    onPress={onPress}
    activeOpacity={0.8}
  >
    {children}
  </TouchableOpacity>
);

const CustomTabBarLabel = ({ label }) => (
  <Text style={styles.tabLabel}>
    {label}
  </Text>
);

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarButton: (props) => <TabBarButton {...props} />,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Order') {
              iconName = 'silverware-fork-knife'; // Icon for order screen
            } else if (route.name === 'Audit') {
              iconName = 'clipboard-list'; // Icon for audit screen
            }

            return <TabBarIcon name={iconName} color={color} size={24} />;
          },
          tabBarLabel: ({ focused }) => (
            focused ? <CustomTabBarLabel label={route.name} /> : null
          ),
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            height: 70,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Order" component={OrderScreen} />
        <Tab.Screen name="Audit" component={AuditScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
});
