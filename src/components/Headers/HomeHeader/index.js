import React, { } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';

import routes from 'src/config/routes';
import { Colors, Typography } from 'src/styles';
import { useDispatch } from 'react-redux';
import { getAllInfo } from 'src/actions/ObjectActions';
import { useTranslation } from 'react-i18next';

const timeOptions = [
  { name: "month", value: { name: "month", value: "monthly" }, label: "Monthly" },
  { name: "week", value: { name: "week", value: "weekly" }, label: "Weekly" }
]

const mapStateToProps = function(state) {
  return {
    user: state.auth_reducer.user,
    filter: state.auth_reducer.filter,
  };
};

const HomeHeader = (props) => {
  const navigation = useNavigation();
  const { user, filter } = props
  const dispatch = useDispatch();
  const { t } = useTranslation();


  const changeFilter = (value) => {
    dispatch(getAllInfo(value))
  }


  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>{t('greeting')},</Text>
          <Text style={[Typography.H2, { color: Colors.WHITE }]}>{user?.name}</Text>
        </View>
        <View style={styles.pickerContainer}>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate(routes.Notifications)} >
          <Icon name="bell" color={Colors.WHITE} size={25} />
        </TouchableOpacity>
      </View>
      <Picker
        selectedValue={filter}
        onValueChange={(itemValue, _itemIndex) => changeFilter(itemValue)}
        style={styles.input}
        dropdownIconColor={Colors.GRAY_DARK}
        itemStyle={[Typography.BODY, { color: Colors.GRAY_THIN }]}>
        {timeOptions.map((type, index) => (
          <Picker.Item key={index} label={t(type.name).toUpperCase()} value={type} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    paddingBottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: Colors.BLACK
  },
  container: {
    padding: 20,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.BLACK
  },
  input: {
    marginRight: 7,
    color: Colors.PRIMARY_LIGHT,
    backgroundColor: Colors.BLACK,
    width: "40%"
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});

export default connect(mapStateToProps)(HomeHeader);
