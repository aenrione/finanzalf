import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';

import routes from 'src/config/routes';
import { Colors, Typography } from 'src/styles';
import store from 'src/store';

const timeOptions = [{ name: "Monthly", value: "monthly" }, { name: "Weekly", value: "weekly" }]

const HomeHeader = () => {
  const navigation = useNavigation();
  const state = store.getState().auth_reducer; // Get the entire state object
  const [timeFilter, setFilter] = useState(timeOptions[0].value);


  // Get User
  const user = state.user != null ? state.user : { name: '', joined: Date.now() };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>Hello,</Text>
        <Text style={[Typography.H2, { color: Colors.WHITE }]}>{user.name}</Text>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={timeFilter}
          onValueChange={(itemValue, _itemIndex) => setFilter(itemValue)}
          style={styles.input}
          dropdownIconColor={Colors.GRAY_DARK}
          itemStyle={[Typography.BODY, { color: Colors.GRAY_THIN }]}>
          {timeOptions.map((type, index) => (
            <Picker.Item key={index} label={type.name} value={type} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate(routes.Notifications)} >
        <Icon name="bell" color={Colors.WHITE} size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.BLACK
  },
  input: {
    padding: 10,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 10,
    color: Colors.WHITE,
    backgroundColor: Colors.GRAY_DARKER,
    width: "100%"
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});

export default HomeHeader;

