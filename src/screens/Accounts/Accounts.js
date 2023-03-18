import React from 'react';
import { Alert } from 'react-native';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import CustomCard from '@/CustomCard';
import Collapsible from 'react-native-collapsible';
import NewFintocAccount from '@/forms/NewFintocAccount';
import NewBudaAccount from '@/forms/NewBudaAccount';
import NewFintualAccount from '@/forms/NewFintualAccount';
import { connect } from 'react-redux';
import FintocLogo from 'assets/images/fintoc-logo.png';
import BudaLogo from 'assets/images/buda-logo.png';
import FintualLogo from 'assets/images/fintual-logo.png';
import EtoroLogo from 'assets/images/etoro-logo.jpeg';
import { FintocAccount } from './FintocAccount';
import { BudaAccount } from './BudaAccount';
import { FintualAccount } from './FintualAccount';
import CustomIndicator from '@/CustomIndicator';
import Text from '@/Text';
import CustomButton from '../../components/CustomButton';
import { useQuery } from 'react-query';
import axios from 'axios';
import { updateCapabilities } from 'src/actions/LoginAction';
import store from 'src/store';
import { showMessage } from 'react-native-flash-message';

const requestUpdate = async (refetch) => {
  await axios.get('/api/v1/user/update_info');
  await refetch();
  showMessage({
    message: 'Requested Successfully',
    type: 'success',
  });
};

const createTwoButtonAlert = (refetch) =>
  Alert.alert(
    'Manual Refresh',
    'Manual update can take minutes to update the information on the app.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Request', onPress: () => requestUpdate(refetch) },
    ],
  );

export function AccountsScreen({ navigation, capabilities }) {
  const [showFintocForm, setFintocForm] = React.useState(false);
  const [fintocLoading, setFintocLoading] = React.useState(false);
  const [showBudaForm, setBudaForm] = React.useState(false);
  const [showFintualForm, setFintualForm] = React.useState(false);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = async function () {
    setRefreshing(true);
    await refetch();
    setFintocForm(false);
    setBudaForm(false);
    setFintualForm(false);
    setRefreshing(false);
  };

  const getInfo = async function () {
    const { data: response } = await axios.get('/api/v1/user/capabilities');
    await store.dispatch(updateCapabilities({ data: response }));
    return response;
  };
  const { data: accountData, status, refetch } = useQuery('account-data', getInfo);
  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View>
        <Text style={styles.title} text={'Account Summary'} />
        {status === 'loading' ? (
          <CustomIndicator size={150} />
        ) : (
          <View>
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
                {capabilities.hasFintocAccount && accountData.fintoc ? (
                  <FintocAccount account={accountData.fintoc} refetch={onRefresh} />
                ) : (
                  <NewFintocAccount
                    refresh={onRefresh}
                    onSubmit={() => setFintocForm(!showFintocForm)}
                    onLoading={() => setFintocLoading(!fintocLoading)}
                  />
                )}
              </Collapsible>
            </View>

            <CustomCard
              title="Buda"
              description="Buda Account"
              onPress={() => setBudaForm(!showBudaForm)}
              arrow={capabilities.hasBudaAccount}
              pressed={showBudaForm}
              logo={BudaLogo}
            />
            <Collapsible collapsed={!showBudaForm}>
              {capabilities.hasBudaAccount && accountData.buda ? (
                <BudaAccount account={accountData.buda} refetch={onRefresh} />
              ) : (
                <NewBudaAccount refresh={onRefresh} />
              )}
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
              {capabilities.hasFintualAccount && accountData.fintual ? (
                <FintualAccount account={accountData.fintual} refetch={onRefresh} />
              ) : (
                <NewFintualAccount refresh={onRefresh} />
              )}
            </Collapsible>

            <CustomCard title="eToro" description="eToro Account to be added" logo={EtoroLogo} />
            <CustomButton
              text="What data do we collect?"
              type="tertiary"
              onPress={() => navigation.navigate('About')}
            />
            <CustomButton
              text="Request Manual Update"
              // bgColor="#E7EAF4"
              fgColor="green"
              type="tertiary"
              onPress={() => createTwoButtonAlert(onRefresh)}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
});
const mapStateToProps = (state) => ({
  capabilities: state.auth_reducer.userCapabilities,
});
export default connect(mapStateToProps)(AccountsScreen);
