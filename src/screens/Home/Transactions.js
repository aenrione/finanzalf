import React from 'react';
import { ActivityIndicator, View, FlatList } from 'react-native';
import { Card, Divider} from 'react-native-elements';
import CustomAmountItem from '../../components/CustomAmountItem';
import CustomButton from "../../components/CustomButton"



const Footer = function ({onLoadMore, loading}) {
  return (
    <View>
    { !loading ?
      <CustomButton text="Load More" onPress={onLoadMore} type="tertiary"/>
      : <ActivityIndicator/>
    }
    </View>
  );
}

const TransactionSection = function ({transaction}) {
  return(
    <View>
      <CustomAmountItem 
        text={transaction.attributes.description}
        value={transaction.attributes.amount}
    />
      <Divider />
    </View>
  );
}

const TransactionsLoop = function({transactions, onLoadMore, loading}) {
  return(
    <View>
      <FlatList
      data={transactions}
      renderItem={({ item: transaction }) => <TransactionSection transaction={transaction}/> }
      keyExtractor={(item) => item.id}
      ListFooterComponent={<Footer onLoadMore={onLoadMore} loading={loading}/>}
      />
    </View>
  )
}

export default function Transactions({ transactions, onLoadMore, loading }){
  return (
    <View>
    <Card>
      <Card.Title>Transactions</Card.Title>
      <Divider />
      { transactions !== null ? <TransactionsLoop transactions={transactions}
        onLoadMore={onLoadMore}
        loading={loading}
        /> : <ActivityIndicator/> }
    </Card>
    </View>
  );
};

