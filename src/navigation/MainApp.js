// AppContent.tsx
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import LoadingScreen from 'src/screens/LoadingScreen';
import SignInNavigation from 'src/navigation/SignInNavigation';

function AppContent(props) {
  const { spinner } = props;

  return (
    <View style={styles.root}>
      <SignInNavigation />
      {spinner && <LoadingScreen style={styles.loadingScreen} />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loadingScreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,  // ensure it's on top
  },
});

const mapStateToProps = (state) => {
  return {
    spinner: state.auth_reducer.spinner,
  };
};

export default connect(mapStateToProps)(AppContent);
