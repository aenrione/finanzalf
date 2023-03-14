import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../components/Text';
import CustomButton from "../../components/CustomButton"
import { logoutUser } from '../../actions/LoginAction';
import SetQuotaForm from './SetQuotaForm'

import store from '../../store'

export default function HomeScreen() {


  const state = store.getState()
  const user = state.auth_reducer.user
  const [currentUrl, _setUrl] = useState(state.auth_reducer["baseUrl"]);
  const onSignOutPressed = async () => {
    store.dispatch(logoutUser()
    )
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.title} text={user.name}/>
        <Text style={{ textAlign: 'center' }} text={user.email}/>
        <SetQuotaForm user_quota={user.quota} />
        <CustomButton
          text="Sign Out"
          onPress={onSignOutPressed}
          bgColor="#FAE9EA"
          fgColor="#DD4D44"
        />
      </View>
      <CustomButton text="Server URL" type="tertiary" />
      <CustomButton
        text={currentUrl}
        bgColor="#e3e3e3"
        fgColor="#363636"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center'
  },
  listSection: {
    fontSize: 14,
    padding: 10
  }
});
