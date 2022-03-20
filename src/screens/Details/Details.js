import React, {useState} from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions, StyleSheet, Text, View, Button, Image } from 'react-native';
import store from '../../store'
import axios from 'axios'


export default function DetailsScreen() {
  const [balance, setBalance] = useState(
    { labels: [""],
      data: [0]
    }
  );
  const state = store.getState()
  const email = state.user.email
  const getBalance = function(){
    axios
      .get('/api/v1/user/balance_to_chart',
      {
        params: {
          email: email,
        }
    }).then((response) => {
      setBalance(response.data);
    });

  }
  React.useEffect(() => {
    getBalance()
  }, []);
  return (
    <View>
      <Text>Balances</Text>
      <LineChart
        data={{
          labels: balance.labels,
          datasets: [
            {
              data: balance.data            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisInterval={1000} // optional, defaults to 1
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "blue"
          }
        }}
        bezier
        style={{
        }}
      />
    </View>
  );
}
