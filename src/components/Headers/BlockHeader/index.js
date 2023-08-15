import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';

import { Colors, Typography } from 'src/styles';

const BlockHeader = (props) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.container, props.noMargin ? {} : { marginTop: 20 }]}>
      <Text style={[Typography.H1, { color: Colors.WHITE }]}>{props.title}</Text>

      {props?.onPress ?
        <Pressable
          style={styles.rowContainer}
          onPress={props.onPress}>
          <Text style={[Typography.TAGLINE, { color: Colors.GRAY_MEDIUM, marginRight: 5 }]}>{t('all')}</Text>
          <Icon name="chevron-right" color={Colors.GRAY_MEDIUM} size={10} />
        </Pressable>
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.BLACK
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default BlockHeader;

