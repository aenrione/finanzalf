import React, { } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import SwipeableFlatList from 'react-native-swipeable-list';

import routes from 'src/config/routes';
import { Colors, Typography } from 'src/styles';

import QuickActions from 'src/utils/quickActions';
import MoneyBoxCard from 'src/components/Cards/MoneyBoxCard';
import { deleteGoal } from 'src/dbHelpers/goalHelper';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getAllInfo } from 'src/actions/ObjectActions';

const mapStateToProps = function(state) {
  return {
    goals: state.auth_reducer.goals,
  };
};

const Goals = ({ navigation, ...props }) => {
  const { goals } = props
  const { t } = useTranslation();
  const dispatch = useDispatch();


  // Delete Item
  const __delete = (id) => {
    deleteGoal(id);
    dispatch(getAllInfo())
  }

  // Update Item
  const __update = (item) => {
    navigation.navigate(routes.AddGoal.name, { item: item })
  }

  return (
    <View style={styles.container}>
      {/* Body */}
      <View style={styles.bodyContainer}>
        {goals.length == 0 ?
          <View style={styles.emptyContainer}>
            <Text style={[Typography.H3, { color: Colors.WHITE, textAlign: 'center' }]}>{t('goal_view.empty')}</Text>
          </View>
          :
          <SwipeableFlatList
            data={goals}
            maxSwipeDistance={140}
            shouldBounceOnMount={true}
            keyExtractor={(_item, index) => index.toString()}
            renderQuickActions={({ item }) => QuickActions(item, __update, __delete)}
            renderItem={({ item, index }) => {
              return <MoneyBoxCard key={index} item={item} currency={"$"} />
            }}
          />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    paddingTop: 10,
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
  // Body
  bodyContainer: {
    flex: 1,
    paddingRight: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default connect(mapStateToProps)(Goals);
