import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SwipeableFlatList from 'react-native-swipeable-list';
import QuickActions from 'src/utils/quickActions';
import CategoryCard from 'src/components/Cards/CategoryCard';
import { connect } from 'react-redux';

import routes from 'src/config/routes';
import { Colors, Typography } from 'src/styles';

const mapStateToProps = function(state) {
  return {
    categories: state.auth_reducer.categories
  };
};

const Categories = ({ navigation, ...props }) => {
  const { categories } = props

  // Delete Item
  const __delete = (id) => {
    deleteCategory(id);
  }

  // Update Item
  const __update = (item) => {
    navigation.navigate(routes.AddCategory.name, { item: item });
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={[Typography.H1, { color: Colors.WHITE, marginBottom: 10 }]}>Categories</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.iconContainer}
          onPress={() => navigation.navigate(routes.AddCategory.name)}>
          <Icon name="plus" color={Colors.WHITE} size={15} />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {categories.length == 0 ?
            <View style={styles.emptyContainer}>
              <Text style={[Typography.H3, { color: Colors.WHITE, textAlign: 'center' }]}>You don't have any categories!</Text>
            </View>
            :
            <SwipeableFlatList
              data={categories}
              maxSwipeDistance={140}
              shouldBounceOnMount={true}
              keyExtractor={(item) => item.id.toString()}
              renderQuickActions={({ item }) => QuickActions(item, __update, __delete)}
              renderItem={({ item, index }) => {
                return <CategoryCard currency={item.currency_symbol} key={index} category={item} />
              }}
            />
          }
        </View>
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
  container: {
    flex: 1,
    paddingRight: 20,
    backgroundColor: Colors.BLACK
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default connect(mapStateToProps)(Categories);
