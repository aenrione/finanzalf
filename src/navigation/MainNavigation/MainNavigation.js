import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

import HomeScreen from '../../screens/Home'
import DetailsScreen from '../../screens/Details'
import AccountScreen from '../../screens/Accounts'
import CategoryScreen from '../../screens/Category'
import ProfileScreen from '../../screens/Profile'

function HomeTabNavigation() {
  return (
    <Tab.Navigator initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Details') {
            iconName = 'ios-list';
          } else if (route.name === 'Accounts') {
            iconName = 'ios-people';
          }


          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Details" component={DetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Dashboard" component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Accounts" component={AccountScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
export default function Navitagion() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeTabNavigation} />
      <Drawer.Screen name="Categories" component={CategoryScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  )
}
