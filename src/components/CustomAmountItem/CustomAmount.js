import { Text, StyleSheet, Pressable } from 'react-native';
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
      <Text style={[styles.text]}>{text}:</Text>
      {number ?
        <Text style={[styles.value,
        value.includes('-') ? { color: "red" } : { color: "green" }
        ]}>
          {value}
        </Text> :
        <Text style={[styles.value]}>{value}</Text>}
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
    width: '60%'
  },
  value: {
    fontWeight: "bold"
  }
});

