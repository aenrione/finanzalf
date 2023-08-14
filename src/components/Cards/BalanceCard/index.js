import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors, Typography } from 'src/styles';
import { formatCurrency, curStyle } from 'src/utils/currency';

const BalanceCard = (props) => {
  const accountTotals = props.accountTotals || [];
  const transactionTotals = props.transactionTotals || [];

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(true);
  const CARD_WIDTH = Dimensions.get('window').width - 40; // width of each card in the carousel
  const scrollViewRef = useRef();
  const showAmount = (amount, code) => {
    let calcAmount = amount ? amount : 0

    if (showInfo) {
      return formatCurrency(calcAmount, code)
    }
    const len = calcAmount.toString().length
    return "* ".repeat(len)


  }


  const renderCard = (item, index) => {
    const transactionTotal = transactionTotals[index] || {};

    return (
      <View key={item.code} style={{ width: CARD_WIDTH, paddingHorizontal: 20 }}>
        {accountTotals.length > 1 && (
          <Text style={[Typography.H3, styles.currencyCode, { textAlign: 'center' }]}>{item.code}
            <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
              <Icon name={showInfo ? "eye-slash" : "eye"} color={Colors.GRAY_MEDIUM} size={20} style={{ marginLeft: 20 }} />
            </TouchableOpacity>

          </Text>)}
        <View style={styles.cardContent}>
          <View style={styles.blockContainer}>
            <View style={styles.itemContainer}>
              <Text style={[Typography.TAGLINE, { color: Colors.GRAY_MEDIUM, marginBottom: 10 }]}>My Balance</Text>
              <Text style={[Typography.BODY, curStyle(item.totalAmount)]}>{showAmount(item.totalAmount, item.code)}</Text>
            </View>
            <View
              style={{
                borderBottomColor: Colors.WHITE,
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <View style={styles.itemContainer}>
              <Text style={[Typography.TAGLINE, { color: Colors.GRAY_MEDIUM, marginBottom: 10 }]}>Investments</Text>
              <Text style={[Typography.BODY, curStyle(item.investmentReturn)]}>{showAmount(item.investmentReturn, item.code)}</Text>
            </View>
          </View>

          <View style={styles.barContainer}></View>

          <View style={styles.blockContainer}>
            <View style={styles.itemContainer}>
              <Text style={[Typography.TAGLINE, { color: Colors.GRAY_MEDIUM, marginBottom: 10 }]}>Total Income</Text>
              <Text style={[Typography.BODY, curStyle(transactionTotal.totalIncome)]}>{showAmount(transactionTotal.totalIncome, item.code)}</Text>
            </View>
            <View
              style={{
                borderBottomColor: Colors.WHITE,
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <View style={styles.itemContainer}>
              <Text style={[Typography.TAGLINE, { color: Colors.GRAY_MEDIUM, marginBottom: 10 }]}>Total Expenses</Text>
              <Text style={[Typography.BODY, curStyle(transactionTotal.totalExpense)]}>{showAmount(transactionTotal.totalExpense, item.code)}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const onScroll = (event) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const activeIndex = Math.round(xOffset / CARD_WIDTH); // Determining active card index based on scroll position and card width
    setActiveCardIndex(activeIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        rf={scrollViewRef}
        horizontal
        pagingEnabled
        decelerationRate="fast" // This helps with the snap effect in iOS
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {accountTotals.map((item, index) => renderCard(item, index))}
      </ScrollView>

      {accountTotals.length > 1 && (
        <View style={styles.dotIndicator}>
          {accountTotals.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: activeCardIndex === index ? Colors.WHITE : Colors.GRAY_LIGHT }
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: Colors.GRAY_DARKER,
    marginVertical: 20,
    overflow: 'hidden',
  },
  currencyCode: {
    color: Colors.WHITE,
    marginTop: 10,
  },
  cardContent: {
    flexDirection: 'row',
    flex: 1, // Take the full width
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end', // Move dots to the bottom
    paddingBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  barContainer: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: Colors.WHITE,
  },
  blockContainer: {
    padding: 10,
    paddingHorizontal: 20,
  },
  itemContainer: {
    paddingHorizontal: 20,
    padding: 10,
  },
});

export default BalanceCard;
