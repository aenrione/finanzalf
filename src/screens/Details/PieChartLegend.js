import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Legend({ name, color, key }) {

  return (
    <View key={key} style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={[styles.innerCircle, { backgroundColor: color }]} />
        <Text>{name}</Text>
      </View>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%'
  },
  innerCircle: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 3,
    marginLeft: 20
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  bodyContainer: {
    flexDirection: 'row',
  },
  chartContainer: {
    flex: 1,
  },
  legendContainer: {
    flex: 1,
    marginTop: 20,
  },
});


