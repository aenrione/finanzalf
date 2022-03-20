import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import CustomCard from '../../components/CustomCard'
import Collapsible from 'react-native-collapsible';
import NewFintocAccount from '../../components/forms/NewFintocAccount';
import NewBudaAccount from '../../components/forms/NewBudaAccount';
import NewFintualAccount from '../../components/forms/NewFintualAccount';
import store from '../../store'



export default function AccountsScreen() {
  const [showFintocForm, setFintocForm] = React.useState(false)
  const [fintocLoading, setFintocLoading] = React.useState(false)
  const [showBudaForm, setBudaForm] = React.useState(false)
  const [showFintualForm, setFintualForm] = React.useState(false)
  const state = store.getState()
  const capabilities = state.userCapabilities
  const loading = store.getState().spinner
    console.log(store.getState().spinner)

  return (
    <ScrollView style={{ flex: 1 }}>
      {fintocLoading ? <ActivityIndicator/> :
      <View>
        <CustomCard
        title="Fintoc"
        description="Fintoc Account"
        onPress={()=>setFintocForm(!showFintocForm)}
        arrow={capabilities.hasFintocAccount}
      />
        <Collapsible collapsed={!showFintocForm}>
          {capabilities.hasFintocAccount ?
              <Text>has Account!</Text> :
              <NewFintocAccount
              onSubmit={() => setFintocForm(!showFintocForm)}
              onLoading={() => setFintocLoading(!fintocLoading)}
              />
          }
        </Collapsible>
      </View>
      }

      <CustomCard
        title="Buda"
        description="Buda Account"
        onPress={()=>setBudaForm(!showBudaForm)}
        arrow={capabilities.hasBudaAccount}
      />
      <Collapsible collapsed={!showBudaForm}>
        {capabilities.hasBudaAccount ?
            <Text>has Account!</Text> :
            <NewBudaAccount/>
        }
      </Collapsible>

      <CustomCard
        title="Fintual"
        description="Fintual Account"
        onPress={()=>setFintualForm(!showFintualForm)}
        arrow={capabilities.hasFintualAccount}
      />
      <Collapsible collapsed={!showFintualForm}>
        {capabilities.hasFintualAccount ?
            <Text>has Account!</Text> :
            <NewFintualAccount/>
        }
      </Collapsible>

      <CustomCard
        title="eToro"
        description="eToro Account to be added"
      />
    </ScrollView>
  );
}
