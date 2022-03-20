import React from 'react';
import { Text, ActivityIndicator, View, FlatList } from 'react-native';
import { Card, Divider} from 'react-native-elements';
import CustomAmountItem from '../../components/CustomAmountItem';
import CustomButton from "../../components/CustomButton"


export default function Transaction({ transaction }){
  return (
    <View>
    <Text>HOla</Text>
    {transaction !== undefined &&
    <Card>
      <Card.Title>{transaction.description}</Card.Title>
      <Divider />
    </Card>
    }
    </View>
  );
};

