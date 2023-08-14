import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Colors, Typography } from '../../styles';

const Button = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        props.disabled && styles.disabledContainer, props.style
      ]}
      disabled={props.disabled}
      onPress={props.onPress}
    >
      <Text
        style={[
          Typography.H3,
          { color: props.disabled ? Colors.BLACK : Colors.WHITE },
        ]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY,
  },
  disabledContainer: {
    backgroundColor: Colors.SECONDARY, // Customize this color for disabled state
  },
});

export default Button;
