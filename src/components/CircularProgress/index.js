import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { Colors } from 'src/styles';

const CircularProgress = ({ percent }) => {
  const normalizedPercent = Math.min(Math.max(percent, 0), 100);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = ((100 - normalizedPercent) / 100) * circumference;
  const strokeWidth = 12;

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" viewBox="-10 -10 120 120">
        {/* White circle */}
        <Path
          d={`M50,50 m0,-${radius} a${radius},${radius} 0 1,0 0,${2 * radius} a${radius},${radius} 0 1,0 0,-${2 * radius}`}
          fill="none"
          stroke={Colors.GRAY_MEDIUM}
          strokeWidth={strokeWidth}
        />
        {/* Black progress */}
        <Path
          d={`M50,50 m0,-${radius} a${radius},${radius} 0 1,1 0,${2 * radius} a${radius},${radius} 0 1,1 0,-${2 * radius}`}
          fill="none"
          stroke={Colors.PRIMARY}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircularProgress;
