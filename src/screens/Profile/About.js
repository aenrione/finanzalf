import React, { } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {



  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.title}>About this site</Text>
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

