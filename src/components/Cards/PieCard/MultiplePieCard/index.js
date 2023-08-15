import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Pie from 'react-native-pie';
import { Colors, Typography } from 'src/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
import { formatCurrency, curStyle } from 'src/utils/currency';

const PieChart = ({ data, currency, width, amount }) => {
  const radius = 65;
  const selWidth = width || Dimensions.get('window').width

  const strokeWidth = 14;
  if (!data) {
    return
  }
  const { t } = useTranslation();

  return (
    <View>
      {currency && (
        <Text style={[Typography.H3, styles.currencyCode, {
          color: Colors.WHITE,
        }]}>{currency}
        </Text>)}
      {amount && (
        <Text style={[Typography.H3, curStyle(amount), styles.currencyCode]}>{formatCurrency(amount, currency)}</Text>
      )}
      <View style={[styles.container, { width: selWidth }]}>
        <View style={styles.pieContainer}>
          <View style={styles.chartContainer}>
            <Pie
              radius={radius}
              innerRadius={radius - strokeWidth}
              sections={data.map((obj) => ({
                percentage: obj.percentage,
                color: obj.color,
              }))}
              dividerSize={6}
              strokeCap={'butt'}
              backgroundColor={Colors.GRAY_DARKER}
            />
          </View>
        </View>
        <View style={styles.numbersContainer}>
          {data.map((obj, index) => (
            obj.percentage > 0 && (
              <View key={index} style={styles.rowContainer}>
                <Icon name={obj.icon ? obj.icon : "circle-notch"} size={15} color={obj.color} />
                <Text style={[Typography.BODY, { marginLeft: 5, color: Colors.GRAY_THIN }]}>
                  {obj.label_name == 'uncategorized' ? t(obj.label_name) : obj.label_name} ({obj.percentage.toFixed(2)}%)
                </Text>
              </View>
            )
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderRadius: 16,
    // flexDirection: 'row',
    backgroundColor: Colors.GRAY_DARKER,
    alignItems: 'center',
  },
  pieContainer: {
    padding: 15,
  },
  numbersContainer: {
    flex: 1,
    padding: 10,
    paddingLeft: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  rowContainer: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartContainer: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyCode: {
    marginTop: 10,
    textAlign: 'center'
  },
});

export default PieChart;
