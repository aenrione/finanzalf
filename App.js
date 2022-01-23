import SignInNavigation from "./src/navigation/SignInNavigation"
import {SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store'


export default function App() {
  return (
    // <Navigation/>
    <Provider store={store}>
      <SafeAreaView style={styles.root}>
      {/* <SignInScreen /> */}
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