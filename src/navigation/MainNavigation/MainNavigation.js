import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomDrawer from '@/CustomDrawerContent';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

import HomeScreen from 'src/screens/Home';
// import TransactionScreen from 'src/screens/Transaction';
import AccountScreen from 'src/screens/Accounts';
import CategoryScreen from 'src/screens/Category';
import AboutScreen from 'src/screens/Profile/About';
import Crypto from 'src/screens/Crypto';
import Transactions from 'src/screens/Transaction'
import AddTransaction from 'src/screens/Transaction/add-transaction';
import AddAccount from 'src/screens/Accounts/add-account';
import AddCategory from 'src/screens/Category/add-category';
import Notifications from 'src/screens/Home/notifications';
import GoalScreen from 'src/screens/Planning';
import AddGoalScreen from 'src/screens/Goal/add-goal';
import routes from 'src/config/routes';

function HomeScreenNavigation() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen */}
      {/*   name="Transaction" */}
      {/*   component={TransactionScreen} */}
      {/*   options={{ */}
      {/*     headerShown: false, */}
      {/*   }} */}
      {/* /> */}
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
        name={routes.AddGoal.name}
        component={AddGoalScreen}
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
  const { t } = useTranslation();
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
          title: t(`navigation.${routes.Categories.name}`)
        }}
      />
      <Tab.Screen
        name={routes.Transactions.name}
        component={Transactions}
        options={{
          headerShown: false,
          title: t(`navigation.${routes.Transactions.name}`)
        }}
      />
      <Tab.Screen
        name={routes.Dashboard.name}
        component={HomeScreenNavigation}
        options={{
          headerShown: false,
          title: t(`navigation.${routes.Dashboard.name}`)
        }}
      />
      <Tab.Screen
        name={routes.Accounts.name}
        component={AccountScreen}
        options={{
          headerShown: false,
          title: t(`navigation.${routes.Accounts.name}`)
        }}
      />
      <Tab.Screen
        name={routes.Planning.name}
        component={GoalScreen}
        options={{
          headerShown: false,
          title: t(`navigation.${routes.Planning.name}`)
        }}
      />
    </Tab.Navigator>
  );
}
export default function Navitagion() {
  const { t } = useTranslation();
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
          title: t(`navigation.${routes.Dashboard.name}`),
          headerTitle: '',
          swipeEnabled: false,
          drawerIcon: ({ focused, size }) => (
            <Ionicons name="md-home" size={size} color={focused ? '#3B71F3' : '#ccc'} />
          ),
        }}
      />
      <Drawer.Screen
        name={routes.Crypto.name}
        component={Crypto}
        options={{
          title: t(`navigation.${routes.Crypto.name}`),
          swipeEnabled: false,
          drawerIcon: ({ focused, size }) => (
            <Ionicons name={routes.Crypto.icon} size={size} color={focused ? '#3B71F3' : '#ccc'} />
          ),
        }}
      />
      <Drawer.Screen
        name={routes.About.name}
        component={AboutScreen}
        options={{
          title: t(`navigation.${routes.About.name}`),
          swipeEnabled: false,
          drawerIcon: ({ focused, size }) => (
            <Ionicons name={routes.About.icon} size={size} color={focused ? '#3B71F3' : '#ccc'} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
