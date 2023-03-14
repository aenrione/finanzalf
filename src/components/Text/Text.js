import { Text, StyleSheet } from 'react-native';
import React from 'react';

export default function CustomText({ color="#333", style, text }) {
  return (
      <Text style={[styles.text, {color: color}, style]}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
  }
});

