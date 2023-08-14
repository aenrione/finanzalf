import React from 'react';
import { View, Image, useWindowDimensions, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import Logo from 'assets/images/wallet.png';
import { Colors } from 'src/styles';
// import CustomText from '@/Text/Text';

export default function LoadingScreen() {
  const { height, width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'center',
              textAlign: 'center',
              alignContent: 'center',
            },
          ]}
        >
          <Image
            source={Logo}
            style={[{ height: height * 0.2, width: height * 0.2 }]}
            resizeMode="center"
          />
        </View>
        <View style={[{ width: width }]}>
          {/* <CustomText style={{ textAlign: 'center', fontSize: 20 }} text="FinanzALF" /> */}
        </View>
        <View
          style={[{ justifyContent: 'center', marginBottom: height * 0.15, marginLeft: width / 4 }]}
        >
          <Progress.Bar width={200} indeterminate indeterminateAnimationDuration={1500} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.WHITE
  },
});
