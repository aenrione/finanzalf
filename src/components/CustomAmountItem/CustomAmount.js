import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import React from 'react';

export default function CustomInput({text="", value="", onPress}){
  return (
    <Pressable
      onPress={()=>console.warn("CUstomAmount PRessed")}
      style={[styles.listSection, {flex: 1}]}>
      <Text>{text}:</Text>
        <Text style={[styles.value,
        value.includes('-') ? {color: "red"} : {color: "green"}
        ]}>
          {value}
        </Text>
    </Pressable>
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
  value: {
    marginLeft: 20,
    fontWeight: "bold"
  }
});

