import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from 'assets/images/wallet.png';
import CustomInput from '@/CustomInput/CustomInput';
import CustomButton from '@/CustomButton';
import { loginUser, setLoading } from 'src/actions/LoginAction';
import { getAllInfo } from 'src/actions/ObjectActions';
import store from 'src/store';
import { useDispatch } from 'react-redux';
import { updateAccounts } from 'src/utils/fintoc';
const getUser = async function() {
  try {
    let userData = await AsyncStorage.getItem('user');
    let data = JSON.parse(userData);
    return data;
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

const mapStateToProps = function(state) {
  return {
    spinner: state.auth_reducer.spinner,
    url: state.auth_reducer.baseUrl,
  };
};

export function SignInScreen({ navigation, ...props }) {
  const { height } = useWindowDimensions();
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const onSignInPressed = async function() {
    await store.dispatch(loginUser({ name }));
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getUser().then(async (response) => {
      let userData = response;
      if (userData !== null) {
        let name = userData.name;
        store.dispatch(loginUser({ name }));
        await updateAccounts();
        store.dispatch(getAllInfo())
      }
      dispatch(setLoading(false));
    });
  }, [navigation, props.url]);

  return (
    <ScrollView>
      <View>
        <View style={styles.root}>
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />
          <CustomInput placeholder="Name" value={name} setValue={setName} />
          <CustomButton text="Sign In" onPress={onSignInPressed} disabled={!name} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: 30,
  },
  logo: {
    flex: 1,
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    marginVertical: 30,
  },
});

export default connect(mapStateToProps)(SignInScreen);
