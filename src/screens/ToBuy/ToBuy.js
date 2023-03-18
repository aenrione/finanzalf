import React from 'react';
import axios from 'axios';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import List from './ToBuyList/List';
import { useQuery } from 'react-query';
import CustomIndicator from '../../components/CustomIndicator';

export function AccountsScreen() {
  const getLists = async function () {
    const { data: response } = await axios.get('/api/v1/to_buy_lists');
    return response.to_buy_lists;
  };
  const { data, status, refetch } = useQuery('lists', getLists);

  return (
    <View style={styles.container}>
      {status === 'loading' ? (
        <CustomIndicator size={150} />
      ) : (
        <List list={data[0]} refetch={refetch} />
      )}
    </View>
  );
}
const mapStateToProps = (state) => ({
  capabilities: state.auth_reducer.userCapabilities,
});
export default connect(mapStateToProps)(AccountsScreen);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
});
