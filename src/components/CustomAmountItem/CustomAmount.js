import { StyleSheet, Pressable } from 'react-native';
import Text from '../Text';
import React from 'react';

export default function CustomAmount({ text = "", value = "", onPress, number = true }) {
  const pressItem = () => {
    if (onPress) {
      onPress()
    }
  }
  return (
    <Pressable
      onPress={pressItem}
      style={[styles.listSection, { flex: 1 }]}>
      <Text style={[styles.text]} text={`${text}:`}/>
      {number ?
        <Text style={[styles.value,
        value.includes('-') ? { color: "red" } : { color: "green" }
        ]} text={value}/> :
        <Text style={[styles.value]} text={value}/>}
    </Pressable >
  );
};

const styles = StyleSheet.create({
  listSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    fontSize: 14,
    padding: 10
  },
  text: {
    width: '60%',
    color: "#333"
  },
  value: {
    fontWeight: "bold"
  }
});

