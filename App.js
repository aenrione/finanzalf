import SignInNavigation from "./src/navigation/SignInNavigation"
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store'
import { setAxiosDefaults } from './src/api/AxiosDefault'
import { QueryClient, QueryClientProvider } from "react-query";
import FlashMessage from "react-native-flash-message";


export default function App() {
  setAxiosDefaults()
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeAreaView style={styles.root}>
          <SignInNavigation />
          <FlashMessage position="top" />
        </SafeAreaView>
      </Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC"
  }
});
