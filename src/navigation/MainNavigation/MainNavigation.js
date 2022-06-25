import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

import HomeScreen from '../../screens/Home'
import TransactionScreen from '../../screens/Transaction'
import DetailsScreen from '../../screens/Details'
import AccountScreen from '../../screens/Accounts'
import ToBuyScreen from '../../screens/ToBuy'
import CategoryScreen from '../../screens/Category'
import ProfileScreen from '../../screens/Profile'

function HomeScreenNavigation() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Transaction" component={TransactionScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );

}

function HomeTabNavigation() {
  return (
    <Tab.Navigator initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          var iconName = 'ios-people'
          switch (route.name) {
            case 'To Buy':
              iconName = 'cart-outline'
              break;
            case 'Accounts':
              iconName = 'ios-people';
              break;
            case 'Details':
              iconName = 'ios-list';
              break
            default:
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
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
      <Tab.Screen name="Dashboard" component={HomeScreenNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Accounts" component={AccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="To Buy" component={ToBuyScreen}
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
