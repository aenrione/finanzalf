import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton';
import { changeUrl } from 'src/actions/LoginAction';
import store from 'src/store';

export default function SettingScreen({ navigation }) {
  const state = store.getState().auth_reducer;
  const [currentUrl, setUrl] = useState(state.baseUrl || 'https://');

  useEffect(() => {});

  const updateUrl = async () => {
    store.dispatch(changeUrl({ url: currentUrl }));
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <CustomButton text="Server URL" type="tertiary" />
        <CustomInput placeholder="https://" value={currentUrl} setValue={setUrl} />
        <CustomButton
          text="Update Base Url"
          bgColor="#e3e3e3"
          fgColor="#363636"
          onPress={updateUrl}
        />
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
