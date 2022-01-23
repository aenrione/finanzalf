import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

export default function CustomInput({value, setValue, placeholder, secureTextEntry}){
  return (
    <View style={styles.container}>
      <TextInput style={styles.input}
                value={value}
                 placeholder={placeholder}
                 onChangeText={setValue}
                 secureTextEntry={secureTextEntry}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 10,
      }
});