import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthScreen from './screens/auth/AuthScreen';
import HomeScreen from './screens/home/HomeScreen';
import ServicesScreen from './screens/services/ServicesScreen';
import BookingScreen from './screens/booking/BookingScreen';
import PaymentScreen from './screens/payment/PaymentScreen';
import MyBookingsScreen from './screens/bookings/MyBookingsScreen';
import BookingDetailsScreen from './screens/bookings/BookingDetailsScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import VehicleManagementScreen from './screens/profile/VehicleManagementScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 18,
      },
      headerTintColor: '#333',
    }}
  >
    <Stack.Screen 
      name="HomeMain" 
      component={HomeScreen} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Services" 
      component={ServicesScreen}
      options={{ title: 'All Services' }}
    />
    <Stack.Screen 
      name="Booking" 
      component={BookingScreen}
      options={{ title: 'Book Service' }}
    />
    <Stack.Screen 
      name="Payment" 
      component={PaymentScreen}
      options={{ title: 'Payment' }}
    />
  </Stack.Navigator>
);

const BookingsStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { fontWeight: '600', fontSize: 18 },
      headerTintColor: '#333',
    }}
  >
    <Stack.Screen 
      name="BookingsList" 
      component={MyBookingsScreen}
      options={{ title: 'My Bookings' }}
    />
    <Stack.Screen 
      name="BookingDetails" 
      component={BookingDetailsScreen}
      options={{ title: 'Booking Details' }}
    />
  </Stack.Navigator>
);

const ProfileStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { fontWeight: '600', fontSize: 18 },
      headerTintColor: '#333',
    }}
  >
    <Stack.Screen 
      name="ProfileMain" 
      component={ProfileScreen}
      options={{ title: 'Profile' }}
    />
    <Stack.Screen 
      name="VehicleManagement" 
      component={VehicleManagementScreen}
      options={{ title: 'My Vehicles' }}
    />
  </Stack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
        else if (route.name === 'Bookings') iconName = focused ? 'calendar' : 'calendar-outline';
        else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FF6B35',
      tabBarInactiveTintColor: '#999',
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopColor: '#f0f0f0',
        borderTopWidth: 1,
        paddingBottom: 5,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen 
      name="HomeTab" 
      component={HomeStackNavigator}
      options={{ title: 'Home' }}
    />
    <Tab.Screen 
      name="Bookings" 
      component={BookingsStackNavigator}
      options={{ title: 'Bookings' }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileStackNavigator}
      options={{ title: 'Profile' }}
    />
  </Tab.Navigator>
);

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setIsSignedIn(!!token);
    } catch (error) {
      console.error('Error checking user status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <AppTabs />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
