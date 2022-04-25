import { StyleSheet, Text, View } from 'react-native';
import CustomButton from "../../components/CustomButton"
import { logoutUser } from '../../actions/LoginAction';

import store from '../../store'

export default function HomeScreen() {


  const state = store.getState()
  const user = state.user
  const onSignOutPressed = async () => {
    store.dispatch(logoutUser()
    )
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.title}>{user.name}</Text>
        <Text style={{ textAlign: 'center' }}>{user.email}</Text>
        <CustomButton
          text="Sign Out"
          onPress={onSignOutPressed}
          bgColor="#FAE9EA"
          fgColor="#DD4D44"
        />
      </View>
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
