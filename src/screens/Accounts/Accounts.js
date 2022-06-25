import React from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import CustomCard from '../../components/CustomCard'
import Collapsible from 'react-native-collapsible';
import NewFintocAccount from '../../components/forms/NewFintocAccount';
import NewBudaAccount from '../../components/forms/NewBudaAccount';
import NewFintualAccount from '../../components/forms/NewFintualAccount';
import { connect } from 'react-redux';
import FintocLogo from "../../../assets/images/fintoc-logo.png"
import BudaLogo from "../../../assets/images/buda-logo.png"
import FintualLogo from "../../../assets/images/fintual-logo.png"
import EtoroLogo from "../../../assets/images/etoro-logo.jpeg"
import { FintocAccount } from "./FintocAccount"
import { BudaAccount } from "./BudaAccount"
import { FintualAccount } from "./FintualAccount"
import CustomIndicator from '../../components/CustomIndicator'
import { useQuery } from "react-query";
import axios from 'axios'



export function AccountsScreen({ capabilities }) {
  const [showFintocForm, setFintocForm] = React.useState(false)
  const [fintocLoading, setFintocLoading] = React.useState(false)
  const [showBudaForm, setBudaForm] = React.useState(false)
  const [showFintualForm, setFintualForm] = React.useState(false)

  const getInfo = async function() {
    const { data: response } = await axios
      .get('/api/v1/user/capabilities')
    return response

  }
  const { data: accountData, status, refetch } = useQuery("account-data", getInfo);
  return (
    <ScrollView style={{ flex: 1 }}>
      {status === "loading" ? <CustomIndicator /> :
        <View>
          {fintocLoading ? <ActivityIndicator /> :
            <View>
              <CustomCard
                title="Fintoc"
                description="Fintoc Account"
                onPress={() => setFintocForm(!showFintocForm)}
                arrow={capabilities.hasFintocAccount}
                pressed={showFintocForm}
                logo={FintocLogo}
              />
              <Collapsible collapsed={!showFintocForm}>
                {capabilities.hasFintocAccount ?
                  <FintocAccount account={accountData.fintoc} /> :
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
            onPress={() => setBudaForm(!showBudaForm)}
            arrow={capabilities.hasBudaAccount}
            pressed={showBudaForm}
            logo={BudaLogo}
          />
          <Collapsible collapsed={!showBudaForm}>
            {capabilities.hasBudaAccount ?
              <BudaAccount account={accountData.buda} /> :
              <NewBudaAccount />
            }
          </Collapsible>

          <CustomCard
            title="Fintual"
            description="Fintual Account"
            onPress={() => setFintualForm(!showFintualForm)}
            arrow={capabilities.hasFintualAccount}
            pressed={showFintualForm}
            logo={FintualLogo}
          />
          <Collapsible collapsed={!showFintualForm}>
            {capabilities.hasFintualAccount ?
              <FintualAccount account={accountData.fintual} /> :
              <NewFintualAccount />
            }
          </Collapsible>

          <CustomCard
            title="eToro"
            description="eToro Account to be added"
            logo={EtoroLogo}
          />
        </View>}
    </ScrollView>
  );
}
const mapStateToProps = state => ({ capabilities: state.auth_reducer.userCapabilities })
export default connect(mapStateToProps)(AccountsScreen);
