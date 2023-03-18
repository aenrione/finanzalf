import React from 'react';
import { DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native';
import { View, Image, StyleSheet } from 'react-native';
import Logo from 'assets/images/wallet.png';
import CustomButton from '@/CustomButton';
import CustomText from '@/Text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { logoutUser } from 'src/actions/LoginAction';
import store from 'src/store';

export default function CustomDrawerContent(props) {
  const onSignOutPressed = async () => {
    store.dispatch(logoutUser());
  };
  return (
    <DrawerContentScrollView style={styles.drawer} {...props}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
        <CustomText text="FinanzAlf" style={{ width: '100%', textAlign: 'center', fontSize: 30 }} />
      </View>

      <SafeAreaView style={styles.container}>
        <View>
          <DrawerItemList {...props} />
        </View>
        <View style={{ marginTop: 0, width: 100, flexDirection: 'row' }}>
          <Ionicons
            name="exit-outline"
            size={25}
            color="#DD4D44"
            style={{ marginTop: '100%', marginLeft: 25 }}
          />
          <CustomButton
            text="Log Out"
            type="tertiary"
            fgColor="#DD4D44"
            style={{ marginTop: '87%' }}
            onPress={onSignOutPressed}
          />
        </View>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  logout: {
    backgroundColor: 'red',
    bottom: 0,
    position: 'absolute',
  },

  logoContainer: {
    height: 140,
    width: '80%',
    marginTop: 20,
    marginBottom: 60,
    alignSelf: 'center',
  },
  drawer: {
    flex: 1,
  },
  labelBottom: {
    position: 'relative',
    bottom: 0,
  },

  redBottom: {},
  scrollView: {
    // backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    // backgroundColor: Colors.red,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    // color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    // color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    // color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
