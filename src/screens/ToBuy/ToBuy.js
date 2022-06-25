import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import List from './ToBuyList/List'
import { useQuery } from "react-query";
import CustomIndicator from "../../components/CustomIndicator"
import axios from 'axios'



export function AccountsScreen({ }) {
  const getLists = async function() {
    const { data: response } = await axios
      .get('/api/v1/to_buy_lists')
    return response.to_buy_lists

  }
  const { data, status, refetch } = useQuery("lists", getLists);

  return (
    <View style={styles.container}>
      {status === "loading" ? <CustomIndicator /> :
        <List list={data[0]} refetch={refetch} />
      }
    </View>
  );
}
const mapStateToProps = state => ({ capabilities: state.auth_reducer.userCapabilities })
export default connect(mapStateToProps)(AccountsScreen);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
});


