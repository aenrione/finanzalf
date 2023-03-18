import React from 'react';
import { ScrollView, View, RefreshControl, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import axios from 'axios';
import { useQuery } from 'react-query';
import { LineChartBalance } from './LineChartBalance';
import CustomIndicator from '../../../components/CustomIndicator';

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(24, 113, 199, ${opacity})`,
  decimalPlaces: 0,
};
export default function DetailsScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  const getBalances = async function () {
    const { data: response } = await axios.get('/api/v1/user/balance_to_chart');
    return response;
  };
  const { data: balance, status, refetch } = useQuery('balances', getBalances);

  const onRefresh = async function () {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {status === 'loading' ? (
        <CustomIndicator size={150} />
      ) : (
        <View>
          <LineChartBalance chartConfig={chartConfig} chartData={balance.user} />
          <Divider />
          {balance.fintoc_account && balance.fintoc_account.data.length > 0 && (
            <LineChartBalance
              chartConfig={chartConfig}
              chartData={balance.fintoc_account}
              title={'Fintoc'}
            />
          )}
          <Divider />
          {balance.buda_account && balance.buda_account.data.length > 0 && (
            <LineChartBalance
              chartConfig={chartConfig}
              chartData={balance.buda_account}
              title={'Buda'}
            />
          )}
          <Divider />
          {balance.fintual_account && balance.fintual_account.data.length > 0 && (
            <LineChartBalance
              chartConfig={chartConfig}
              chartData={balance.fintual_account}
              title={'Fintual'}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
