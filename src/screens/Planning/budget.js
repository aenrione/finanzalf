import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import SwipeableFlatList from 'react-native-swipeable-list';

import routes from 'src/config/routes';
import { Colors, Typography } from 'src/styles';

import QuickActions from 'src/utils/quickActions';
import MoneyBoxCard from 'src/components/Cards/MoneyBoxCard';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getAllInfo } from 'src/actions/ObjectActions';
const mapStateToProps = function(state) {
  return {
    quotas: state.auth_reducer.quotas,
  };
};

const Quota = ({ navigation, ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { quotas } = props;

  // Delete Item
  const __delete = (id) => {
    deleteQuota(id);
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
        {quotas.length == 0 ?
          <View style={styles.emptyContainer}>
            <Text style={[Typography.H3, { color: Colors.WHITE, textAlign: 'center' }]}>{t('quotas_view.empty')}</Text>
          </View>
          :
          <SwipeableFlatList
            data={quotas}
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
    paddingTop: 10
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

export default connect(mapStateToProps)(Quota);


