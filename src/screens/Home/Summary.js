import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../components/Text';
import CustomAmountItem from '../../components/CustomAmountItem';
import { Card, Divider } from 'react-native-elements';
import { IconButton } from 'react-native-paper';

const SummaryCard = function({ user }) {
  const [eye, setEye] = useState(true);
  const hiddenText = "****";

  const getValue = (value) => {
    if (eye){
      return value;
    }
    return hiddenText;
  }
  return (
    <Card>
      <Card.Title>Summary</Card.Title>
      <View style={styles.eyeContainer}>
        <IconButton
          icon={eye ? "eye" : "eye-off"}
          size={25}
          onPress={() => setEye(!eye)}
        />
      </View>
      <Divider />
      <CustomAmountItem text={"Net Worth"} value={getValue(user.balances.total)} />
      <Divider />
      <CustomAmountItem text={"Fintoc"} value={getValue(user.balances.fintoc)} />
      <Divider />
      <CustomAmountItem text={"Buda"} value={getValue(user.balances.buda)} />
      <Divider />
      <CustomAmountItem text={"Fintual"} value={getValue(user.balances.fintual)} />
      <Divider />
      <CustomAmountItem text={"Income"} value={getValue(user.income)} />
      <Divider />
      <CustomAmountItem text={"Expense"} value={getValue(user.expense)} />
      <Divider />
      <CustomAmountItem text={"Investments"} value={getValue(user.investments_return)} />
      <Divider />
      <CustomAmountItem text={"Quota"} value={getValue(user.quota)} />
      <Divider />
      <CustomAmountItem text={"Quota remaining"} value={getValue(user.remaining)} />
    </Card>
  );
}

export default function Summary({ user }) {
  return (
    <View>
      <Text style={styles.title} text={user.name} />
      <Text style={{ textAlign: 'center' }} text={user.email} />
      {user !== null && <SummaryCard user={user} />}
    </View>
  );
};


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  eyeContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});
