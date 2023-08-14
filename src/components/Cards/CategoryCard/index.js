import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors, Typography } from 'src/styles';

const CategoryCard = (props) => {
  const category = props.category;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name={category.icon} color={Colors.WHITE} size={15} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={[Typography.BODY, { color: Colors.WHITE }]}>{category.name}</Text>
        <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>{category.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.BLACK
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.LIGHT_BLACK
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-between'
  }
});

export default CategoryCard;



