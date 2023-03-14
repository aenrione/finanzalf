import React from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import moment from 'moment';
import axios from 'axios'
import { useQuery } from "react-query";
import { TransactionsPieChart } from "./TransactionsPieChart"
import MonthSelectorCalendar from 'react-native-month-selector';
import CustomButton from "../../../components/CustomButton"
import Text from '../../../components/Text';


const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(24, 113, 199, ${opacity})`,
  decimalPlaces: 0,

};
export default function DetailsScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [date, setDate] = React.useState(moment());

  const updatePieCharts = function() {
    refetchTransactions()
    refetch_income()
  }

  const getTransactions = async function() {
    const { data: response } = await axios
      .get('/api/v1/user/transactions_to_chart',
        {
          params: {
            month: date.month() + 1,
            year: date.year()
          }
        })
    return response
  }


  const getIncomeChart = async function() {
    const { data: response } = await axios
      .get('/api/v1/user/transactions_to_chart',
        {
          params: {
            type: "income",
            month: date.month() + 1,
            year: date.year()
          }
        })
    return response
  }
  const { data: transactions, status: transactionStatus, refetch: refetchTransactions } = useQuery("transaction_chart", getTransactions);
  const { data: income_data, status: income_status, refetch: refetch_income } = useQuery("income_pie_chart", getIncomeChart);

  const onRefresh = async function() {
    setRefreshing(true);
    await refetchTransactions()
    await refetch_income()
    setRefreshing(false)
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <Divider />
      <TransactionsPieChart
        chartConfig={chartConfig}
        chartData={transactions ? transactions.data : []}
        total={transactions ? transactions.total : 0}
        loading={transactionStatus !== 'success'}
      />
      <Divider />
      <TransactionsPieChart
        chartConfig={chartConfig}
        chartData={income_data ? income_data.data : []}
        total={income_data ? income_data.total : 0}
        title={"Income by Categories"}
        loading={income_status !== 'success'}
      />
      <Text style={{ textAlign: "center" }} text={`${date.month() + 1}-${date.year()}`}/>
      <CustomButton text={"Update Pie Charts"} onPress={updatePieCharts} />
      <MonthSelectorCalendar
        selectedDate={date}
        onMonthTapped={(date) => setDate(date)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
});


