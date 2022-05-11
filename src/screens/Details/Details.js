import React, { useState } from 'react';
import {
  LineChart,
} from "react-native-chart-kit";
import { Svg, Rect, Text } from 'react-native-svg';
import { ScrollView, Dimensions, StyleSheet, View, ActivityIndicator, RefreshControl, Image } from 'react-native';
const screenWidth = Dimensions.get("window").width;
import store from '../../store'
import axios from 'axios'
import { useQuery } from "react-query";


const chartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  backgroundColor: "#fff",
  decimalPlaces: 0,

};
export default function DetailsScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const email = store.getState().user.email
  const getBalances = async function() {
    const { data: response } = await axios
      .get('/api/v1/user/balance_to_chart',
        {
          params: {
            email: email,
          }
        })
    return response

  }
  const { data: balance, status, refetch } = useQuery("balances", getBalances);
  const getData = function() {
    return {
      labels: balance.labels,
      datasets: [
        {
          data: balance.data,
        }
      ],
      legend: ["Balances"]
    };
  }
  const onRefresh = async function() {
    setRefreshing(true);
    await refetch()
    setRefreshing(false)
  }
  let [tooltipPos, setTooltipPos] = useState(
    { x: 0, y: 0, visible: false, value: 0 })

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
          <LineChart
            data={getData()}
            width={screenWidth}
            height={320}
            verticalLabelRotation={20}
            horizontalLabelRotation={20}
            chartConfig={chartConfig}
            yAxisLabel="$"
            bezier
            onDataPointClick={
              (data) => {
                let formated = balance.formated_data[data.index]
                let date = balance.dates[data.index]
                let isSamePoint = (tooltipPos.x === data.x
                  && tooltipPos.y === data.y)

                isSamePoint ? setTooltipPos((previousState) => {
                  return {
                    ...previousState,
                    value: data.value,
                    visible: !previousState.visible
                  }
                })
                  :
                  setTooltipPos({
                    x: data.x,
                    value: data.value, y: data.y,
                    visible: true,
                    formated: formated,
                    date: date
                  });
              } // end function
            }
            decorator={() => {
              return tooltipPos.visible ? <View>
                <Svg>
                  <Rect x={tooltipPos.x - 40} y={tooltipPos.y + 10} width="90"
                    height="60" fill="rgba(26, 255, 146, 0.2)" />
                  <Text
                    x={tooltipPos.x + 5}
                    y={tooltipPos.y + 30}
                    fill="white"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle">
                    {tooltipPos.formated}
                  </Text>
                  <Text
                    x={tooltipPos.x + 5}
                    y={tooltipPos.y + 60}
                    fill="white"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle">
                    {tooltipPos.date}
                  </Text>
                </Svg>
              </View> : null
            }}
          />
        </View>
      }
    </ScrollView>
  );
}
