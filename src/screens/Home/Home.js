import React, {useState} from 'react';
import { ScrollView } from 'react-native';
import CustomButton from "../../components/CustomButton"
import Summary from "./Summary"
import Transactions from "./Transactions"
import store from '../../store'
import axios from 'axios'


export default function HomeScreen() {
  const [info, setInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [sort_by, setSortBy] = useState("transaction_date");
  const [sort_desc, setSortDesc] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setPage(page+1, getTransactions())
  }

  const state = store.getState()
  const email = state.user.email
  const user = state.user

  const getTransactions = function(){
    setLoading(true)
    axios
      .get('/api/v1/transactions',
      {
        params: {
          email: email,
          sort_by: sort_by,
          sort_desc: sort_desc,
          limit: limit,
          page: page
        }
    }).then((response) => {
      setTransactions(transactions.concat(response.data.data));
    });
    setLoading(false)

  }

  const getInfo = function(){
    axios
      .get('/api/v1/user',
      {
        params: {
          email: email
        }
    }).then((response) => {
      setInfo(response.data.data.attributes);
    });

  }

  React.useEffect(() => {
    getInfo()
  }, []);
  return (
    <ScrollView style={{ flex: 1}}>
      <CustomButton text="Update" onPress={getInfo} />
      <Summary user={user} attributes={info}/>
      <Transactions
      transactions={transactions}
      onLoadMore={handleLoadMore}
      loading={loading}
    />
    </ScrollView>
  );
}
