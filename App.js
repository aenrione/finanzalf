import MainNavigation from "./src/navigation/MainNavigation"
import SignInNavigation from "./src/navigation/SignInNavigation"
import {SafeAreaView, StyleSheet } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import Reducers from './src/reducers';


export default function App() {
  return (
    // <Navigation/>
    <Provider store={createStore(Reducers, applyMiddleware(logger))}>
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