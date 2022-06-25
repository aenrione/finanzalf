import React, { useState } from 'react';
import { PieChart } from "react-native-chart-kit";
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import Legend from './PieChartLegend'

const screenWidth = Dimensions.get("window").width;
function random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o((r()) * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}

export function TransactionsPieChart({ total, chartData, chartConfig, title = "Expenses by Categories" }) {
  const getData = function() {
    chartData.forEach(element => {
      element.color = random_rgba()
      element.legendFontSize = 15
      element.legendFontColor = "black"
    }
    );
    return chartData
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{total}</Text>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.chartContainer}>
          <PieChart
            data={getData()}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor={"amount"}
            paddingLeft={"15"}
            center={[0, 0]}
            backgroundColor="transparent"
            absolute
            hasLegend={false}

          />
        </View>
        <View style={styles.legendContainer}>
          {getData().map(({ name, color }) => {
            return <Legend key={name} name={name} color={color} />;
          })}
        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%'
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  bodyContainer: {
    flexDirection: 'row',
  },
  chartContainer: {
    flex: 1,
  },
  legendContainer: {
    flex: 1,
    marginTop: 20,
  },
});


