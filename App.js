import SignInNavigation from "./src/navigation/SignInNavigation"
import {SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store'
import {setAxiosDefaults} from './src/api/AxiosDefault'


export default function App() {
  setAxiosDefaults()
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.root}>
      <SignInNavigation/>
      </SafeAreaView>
  </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC"
  }
});
