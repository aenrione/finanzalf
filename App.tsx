import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import FlashMessage from 'react-native-flash-message';
import MainApp from './src/navigation/MainApp';  // Update the path appropriately
import { I18nextProvider } from 'react-i18next';
import i18n from './src/translations/i18n';


export default function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SafeAreaView style={styles.root}>
          <MainApp />
          <FlashMessage position="top" />
        </SafeAreaView>
      </I18nextProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});
