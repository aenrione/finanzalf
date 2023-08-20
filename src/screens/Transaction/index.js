import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import routes from 'src/config/routes';
import { Colors, Typography } from 'src/styles';

import Income from './income';
import Expense from './expense';
import All from './all';
import { useTranslation } from 'react-i18next';

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
      <Tab.Screen name={routes.All.name} options={{ tabBarLabel: t('transaction_view.all') }} component={All} />
      <Tab.Screen name={routes.Income.name} options={{ tabBarLabel: t('transaction_view.incomes') }} component={Income} />
      <Tab.Screen name={routes.Expense.name} options={{ tabBarLabel: t('transaction_view.expenses') }} component={Expense} />
    </Tab.Navigator>
  );
}

const Transactions = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={[Typography.H1, { color: Colors.WHITE, marginBottom: 10 }]}>{t('navigation.Transactions')}</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.iconContainer}
          onPress={() => navigation.navigate(routes.AddTransaction.name)}>
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

export default Transactions;

