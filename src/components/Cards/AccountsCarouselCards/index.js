import React, { useState, useRef } from 'react';
import {
  StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors, Typography } from 'src/styles';
import { formatCurrency, curStyle } from 'src/utils/currency';
import { useTranslation } from 'react-i18next';

const AccountCarousel = (props) => {
  const accountTotals = props.accounts || [];
  const offset = 2 * (props.offset || 0)

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(true);
  const CARD_WIDTH = Dimensions.get('window').width - offset; // width of each card in the carousel
  const scrollViewRef = useRef();
  const { t } = useTranslation();

  const showAmount = (amount, item) => {
    let calcAmount = amount ? amount : 0

    if (showInfo) {
      return formatCurrency(calcAmount, item.code)
    }
    const len = calcAmount.toString().length
    return "* ".repeat(len)


  }

  const renderCard = (item) => {

    return (
      <View key={item.id} style={{ width: CARD_WIDTH, paddingHorizontal: 20 }}>
        <View style={styles.blockContainer}>
          <View style={styles.iconContainer}>
            <Text style={[Typography.H1, curStyle(item.amount)]}>{showAmount(item.amount, item)}</Text>
            <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
              <Icon name={showInfo ? "eye-slash" : "eye"} color={Colors.GRAY_MEDIUM} size={20} style={{ marginLeft: 20 }} />
            </TouchableOpacity>
          </View>
          <Text style={[Typography.TAGLINE, { color: Colors.GRAY_MEDIUM }]}>{t('account_card.account')}:
            <Text style={[Typography.TAGLINE, { color: Colors.PRIMARY_LIGHT }]}> {item.name}</Text>
          </Text>
          {item.holder_name && (
            <Text style={[Typography.TAGLINE, { color: Colors.GRAY_MEDIUM }]}>{t('account_card.holder')}:
              <Text style={[Typography.TAGLINE, { color: Colors.GRAY_LIGHT }]}> {item.holder_name}</Text>
            </Text>

          )}
          {item.refreshed_at && (
            <Text style={[Typography.TAGLINE, { color: Colors.GRAY_MEDIUM }]}>{t('account_card.refreshed')}: {item.refreshed_at}</Text>
          )}
          <View
            style={{
              borderBottomColor: Colors.WHITE,
              marginVertical: 20,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <View style={styles.cardContent}>
            <View style={styles.itemContainer}>
              <Text style={[Typography.TAGLINE, { color: Colors.GRAY_MEDIUM, marginBottom: 10 }]}>{t('transaction_view.incomes')}</Text>
              <Text style={[Typography.BODY, curStyle(item.income)]}>{showAmount(item.income, item)}</Text>
            </View>
            <View>
              <View style={styles.itemContainer}>
                <Text style={[Typography.TAGLINE, { color: Colors.GRAY_MEDIUM, marginBottom: 10 }]}>{t('transaction_view.expenses')}</Text>
                <Text style={[Typography.BODY, curStyle(item.expense)]}>{showAmount(item.expense, item)}</Text>
              </View>
            </View>
            <View>
              <View style={styles.itemContainer}>
                <Text style={[Typography.TAGLINE, { color: Colors.GRAY_MEDIUM, marginBottom: 10 }]}>{t('account_card.returns')}</Text>
                <Text style={[Typography.BODY, curStyle(item.investment_return)]}>{showAmount(item.investment_return, item)}</Text>
              </View>
            </View>
          </View>
        </View>
      </View >
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
        </View>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: Colors.GRAY_DARKER,
    overflow: 'hidden',
  },
  currencyCode: {
    color: Colors.WHITE,
    marginTop: 10,
  },
  cardContent: {
    flexDirection: 'row',
    flex: 1, // Take the full width
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
    paddingHorizontal: 7,
    paddingBottom: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Move dots to the bottom
    paddingBottom: 3,
  },
});

export default AccountCarousel;

