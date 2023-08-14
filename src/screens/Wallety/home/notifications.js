import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import { Colors, Typography } from 'src/styles';

import BackHeader from 'src/components/Headers/BackHeader';

const Notifications = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <BackHeader title='Notifications' />

      {/* Body */}
      <View style={styles.bodyContainer}>
        <Text style={[Typography.TAGLINE, { textAlign: 'center', color: Colors.WHITE }]}>You don't have any notification!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK
  },
  // Body
  bodyContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Notifications;

