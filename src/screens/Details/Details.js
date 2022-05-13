import React from 'react';
import { ScrollView, View, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { Divider } from 'react-native-elements';
import moment from 'moment';
import axios from 'axios'
import { useQuery } from "react-query";
import { LineChartBalance } from "./LineChartBalance"
import { TransactionsPieChart } from "./TransactionsPieChart"
import MonthSelectorCalendar from 'react-native-month-selector';
import CustomButton from "../../components/CustomButton"


const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#000000",
  backgroundGradientToOpacity: 0.2,
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

  const getBalances = async function() {
    const { data: response } = await axios
      .get('/api/v1/user/balance_to_chart')
    return response
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
  const { data: balance, status, refetch } = useQuery("balances", getBalances);
  const { data: transactions, transactionStatus, refetch: refetchTransactions } = useQuery("transaction_chart", getTransactions);
  const { data: income_data, income_status, refetch: refetch_income } = useQuery("income_pie_chart", getIncomeChart);
  console.log(date)

  const onRefresh = async function() {
    setRefreshing(true);
    await refetchTransactions()
    await refetch()
    await refetch_income()
    setRefreshing(false)
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {status === 'loading' ?
        <ActivityIndicator size="large" color="#0000ff" />
        :
        <View>
          <LineChartBalance chartConfig={chartConfig} chartData={balance.user} />
          <Divider />
          {balance.fintoc_account && balance.fintoc_account.data.length > 0 &&
            <LineChartBalance
              chartConfig={chartConfig}
              chartData={balance.fintoc_account}
              title={"Fintoc"} />
          }
          <Divider />
          {balance.buda_account && balance.buda_account.data.length > 0 &&
            <LineChartBalance
              chartConfig={chartConfig}
              chartData={balance.buda_account}
              title={"Buda"} />
          }
          <Divider />
          {balance.fintual_account && balance.fintual_account.data.length > 0 &&
            <LineChartBalance
              chartConfig={chartConfig}
              chartData={balance.fintual_account}
              title={"Fintual"} />
          }
        </View>
      }
      {transactionStatus === 'loading' || !transactions ?
        <ActivityIndicator size="large" color="#0000ff" />
        :
        <TransactionsPieChart
          chartConfig={chartConfig}
          chartData={transactions.data}
          total={transactions.total}
        />
      }
      {income_status === 'loading' || !income_data ?
        <ActivityIndicator size="large" color="#0000ff" />
        :
        <TransactionsPieChart
          chartConfig={chartConfig}
          chartData={income_data.data}
          total={income_data.total}
          title={"Income by Categories"}
        />
      }
      <Text style={{ textAlign: "center" }}>{date.month() + 1}-{date.year()}</Text>
      <CustomButton text={"Update Pie Charts"} onPress={updatePieCharts} />
      <MonthSelectorCalendar
        selectedDate={date}
        onMonthTapped={(date) => setDate(date)}
      />
    </ScrollView>
  );
}
