import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import FlashMessage from 'react-native-flash-message';
import MainApp from './src/navigation/MainApp';  // Update the path appropriately


export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.root}>
        <MainApp />
        <FlashMessage position="top" />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});
