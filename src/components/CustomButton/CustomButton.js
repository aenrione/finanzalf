import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

export default function CustomButton({ onPress, text, type = "primary", bgColor, fgColor }) {
  return (
    <Pressable onPress={onPress} style={[
      styles.container,
      styles[`container_${type}`],
      bgColor ? { backgroundColor: bgColor } : {},
    ]}>
      <Text style={[
        styles.text,
        styles[`text_${type}`],
        fgColor ? { color: fgColor } : {}
      ]}>{text}</Text>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center"
  },
  container_primary: {
    backgroundColor: "#3B71F3",
  },
  container_secondary: {

  },
  container_tertiary: {

  },
  text: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontWeight: "bold",
    color: "white"
  },

  text_tertiary: {
    color: "gray",
    marginVertical: 5
  }
});
