import { View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

export default function CustomIndicator({size=50, center=true}) {
  return (
    <View style={center && styles.container}>
      <Progress.Circle indeterminate={true} size={size} borderWidth={3} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30

  },
});


