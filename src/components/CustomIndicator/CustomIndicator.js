import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

export default function CustomIndicator({
  size = 50,
  center = true,
  marginTop = 30,
  borderColor = '#3B71F3',
}) {
  return (
    <View style={[center && styles.container, { marginTop: marginTop }]}>
      <Progress.Circle indeterminate={true} size={size} borderWidth={3} borderColor={borderColor} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
