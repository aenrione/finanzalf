import { StyleSheet, Pressable, View } from 'react-native';
import Text from '../Text';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CustomAmount({
  text = '',
  value = '',
  onPress,
  number = true,
  hasIcon = false,
  icon,
  iconColor = '#333',
}) {
  const pressItem = () => {
    if (onPress) {
      onPress();
    }
  };
  return (
    <Pressable onPress={pressItem} style={[styles.listSection]}>
      <View style={[styles.iconSection]}>
        {hasIcon && (
          <Ionicons
            name={icon}
            size={15}
            color={iconColor}
            style={{ marginTop: 5 }}
            // onPress={() => }
          />
        )}
        <Text style={[styles.text, hasIcon && { marginLeft: 4, marginTop: 2 }]} text={`${text}:`} />
      </View>
      {number ? (
        <Text
          style={[
            hasIcon && { marginTop: 2 },
            styles.value,
            value.includes('-') ? { color: 'red' } : { color: 'green' },
          ]}
          text={value}
        />
      ) : (
        <Text style={[styles.value]} text={value} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 0,
  },
  iconSection: {
    flexDirection: 'row',
    width: '60%',
    marginBottom: 2,
  },
  text: {
    color: '#333',
  },
  value: {
    fontWeight: 'bold',
  },
});
