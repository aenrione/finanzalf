import React, { useState } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Colors, Typography } from 'src/styles';
import { formatCurrency, curStyle } from 'src/utils/currency';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import { getAllInfo } from 'src/actions/ObjectActions';
import { useDispatch } from 'react-redux';
const timeOptions = [
  { name: "month", value: { name: "month", value: "monthly" }, label: "Monthly" },
  { name: "week", value: { name: "week", value: "weekly" }, label: "Weekly" }
]


const mapStateToProps = function(state) {
  return {
    balances: state.auth_reducer.balances,
    filter: state.auth_reducer.filter,
  };
};

const Banner = (props) => {
  const {
    filter,
    balances,
  } = props;
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(true);
  if (!showBanner) {
    return (<View />)
  }
  const changeFilter = (value) => {
    dispatch(getAllInfo(value))
  }
  const dispatch = useDispatch();

  return (
    <View style={styles.bigContainer}>
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
      {/* <View style={styles.container}> */}
      {/*   <View */}
      {/*     style={{ */}
      {/*       borderBottomColor: Colors.WHITE, */}
      {/*       borderBottomWidth: StyleSheet.hairlineWidth, */}
      {/*       marginBottom: 10 */}
      {/*     }} */}
      {/*   /> */}
      {/*   <View style={styles.bannerContainer}> */}
      {/*     <View style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', width: '80%' }}> */}
      {/*       {balances.map((obj, index) => ( */}
      {/*         <Text key={index} style={[Typography.H3, curStyle(obj.totalIncome + obj.totalExpense), { marginHorizontal: 10 }]}> */}
      {/*           {formatCurrency(obj.totalIncome + obj.totalExpense, "CLP") + */}
      {/*             (balances.length > 1 ? ` (${obj.code})` : '')} */}
      {/*         </Text> */}
      {/*       ))} */}
      {/*     </View> */}
      {/*     <TouchableOpacity onPress={() => setShowBanner(!showBanner)}> */}
      {/*       <Icon name="times" color={Colors.GRAY_MEDIUM} size={20} style={{ marginLeft: 10 }} /> */}
      {/*     </TouchableOpacity> */}
      {/*   </View> */}
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  bannerText: {
    color: Colors.WHITE,
    textAlign: 'center',
  },
  bannerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: Colors.GRAY_DARKER,
    paddingLeft: 20,
    marginLeft: 20,
    marginTop: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  input: {
    // padding: 10,
    // marginTop: 10,
    marginRight: 10,
    borderRadius: 10,
    color: Colors.PRIMARY_LIGHT,
    // backgroundColor: Colors.GRAY_DARKER,
    width: "50%"
  },
  bigContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});

export default connect(mapStateToProps)(Banner);


