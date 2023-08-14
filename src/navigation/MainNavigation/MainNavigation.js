import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomDrawer from '@/CustomDrawerContent';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

import HomeScreen from 'src/screens/Home';
import TransactionScreen from 'src/screens/Transaction';
import AccountScreen from 'src/screens/Accounts';
import CategoryScreen from 'src/screens/Category';
import AboutScreen from 'src/screens/Profile/About';
import Crypto from 'src/screens/Crypto';
import Transactions from 'src/screens/Wallety/transactions'
import AddTransaction from 'src/screens/Wallety/transactions/add-transaction';
import AddAccount from 'src/screens/Accounts/add-account';
import AddCategory from 'src/screens/Category/add-category';
import Notifications from 'src/screens/Wallety/home/notifications';
import MoneyBoxScreen from 'src/screens/Planning';
import AddMoneyBoxScreen from 'src/screens/Wallety/moneybox/add-money-box';
import routes from 'src/config/routes';

function HomeScreenNavigation() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddTransaction"
        component={AddTransaction}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddAccount"
        component={AddAccount}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddCategory"
        component={AddCategory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.AddMoneyBox}
        component={AddMoneyBoxScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.Notifications}
        component={Notifications}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          var iconName = routes[route.name] ? routes[route.name].icon : 'ios-information-circle';
          return <Ionicons name={iconName} size={size} color={color} />;
          // return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name={routes.Categories.name}
        component={CategoryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={routes.Transactions.name}
        component={Transactions}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={routes.Dashboard.name}
        component={HomeScreenNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={routes.Accounts.name}
        component={AccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={routes.Planning.name}
        component={MoneyBoxScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
export default function Navitagion() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerPosition="right"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeTabNavigation}
        options={{
          title: 'Dashboard',
          headerTitle: '',
          swipeEnabled: false,
          drawerIcon: ({ focused, size }) => (
            <Ionicons name="md-home" size={size} color={focused ? '#3B71F3' : '#ccc'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Crypto Market"
        component={Crypto}
        options={{
          swipeEnabled: false,
          drawerIcon: ({ focused, size }) => (
            <Ionicons name="logo-bitcoin" size={size} color={focused ? '#3B71F3' : '#ccc'} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          swipeEnabled: false,
          drawerIcon: ({ focused, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={focused ? '#3B71F3' : '#ccc'} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
