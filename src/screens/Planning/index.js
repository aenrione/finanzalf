import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTranslation } from 'react-i18next';

import routes from 'src/config/routes';
import { Colors, Typography } from 'src/styles';

import Goals from './goals';
import Budgets from './budget';

// Top Tabs
const Tab = createMaterialTopTabNavigator();

function TopTabs() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarLabelStyle: [Typography.TAGLINE, { color: Colors.WHITE }],
        tabBarStyle: {
          backgroundColor: Colors.BLACK,
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.PRIMARY
        },
        swipeEnabled: false,
        animationEnabled: true,
      }}>
      <Tab.Screen name={routes.Goals.name} options={{ tabBarLabel: t('planning_view.goals') }} component={Goals} />
      <Tab.Screen name={routes.Budgets.name} options={{ tabBarLabel: t('planning_view.budget') }} component={Budgets} />
    </Tab.Navigator>
  );
}

const Planning = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={[Typography.H1, { color: Colors.WHITE, marginBottom: 10 }]}>{t('navigation.Planning')}</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.iconContainer}
          onPress={() => navigation.navigate(routes.AddMoneyBox.name)}>
          <Icon name="plus" color={Colors.WHITE} size={15} />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={{ flex: 1 }}>
        <TopTabs />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK
  },
  // Header
  headerContainer: {
    padding: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.LIGHT_BLACK
  },
});

export default Planning;


