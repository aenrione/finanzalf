import axios from 'axios';
import { insertAccount } from 'src/dbHelpers/accountHelper';
import { currencies } from 'src/utils/currency';

const baseURL = 'https://fintual.cl/api/'

const findCurrencyByCode = (code) => {
  return currencies.find((currency) => currency.code === code);
};
export const getToken = async (email, password) => {
  const { data: response } = await axios.post(
    `${baseURL}/access_tokens`,
    {
      "user": {
        "email": email,
        "password": password
      }
    }
  );
  return response.data.attributes.token
};

export const getGoals = async (email, token) => {
  try {
    const { data: response } = await axios.get(
      `${baseURL}/goals?user_email=${email}&user_token=${token}`,
    );
    return response.data
  } catch (error) {
    console.error('Error fetching options:', error);
  }
};

export const getGoal = async (goal_id, email, token) => {
  try {
    const { data: response } = await axios.get(
      `${baseURL}/goals/${goal_id}?user_email=${email}&user_token=${token}`,
    );
    return response
  } catch (error) {
    console.error('Error fetching options:', error);
  }
};

export const createFintualAccounts = async (goals, email, secret, type) => {
  goals.forEach((goal) => {
    const acc = goal.attributes
    const currency = findCurrencyByCode("CLP")
    insertAccount({
      type: type.name,
      subtype: type.subtype,
      icon: type.icon,
      editable: type.editable,
      code: currency.code,
      currency_name: currency.name,
      currency_symbol: currency.symbol,
      fintual_goal_id: goal.id,
      name: acc.name,
      amount: parseFloat(acc.nav),
      investment_return: acc.profit,
      fintual_email: email,
      fintual_secret: secret,
      holder_name: email,
      refreshed_at: new Date().toLocaleDateString()
    })
      .catch((error) => {
        console.error('Error inserting account:', error);
      });
  })
}
export const updateAccounts = async () => {
  try {
    const query = 'WHERE a.subtype = "fintual"';
    const accounts = await getTableData('accounts', null, '*', query, 'a');

    const updatePromises = accounts.map(async (acc) => {
      const updated_account = await getGoal(acc.goal_id, acc.fintual_email, acc.fintual_secret);
      if (updated_account) {
        const updated_info = { amount: updated_account.nav, refreshed_at: new Date().toLocaleString(), investemnt_return: updated_account.profit };
        await updateObject('accounts', updated_info);
      }
    });

    await Promise.all(updatePromises);

    console.log('All accounts updated successfully');
  } catch (error) {
    console.error('Error updating accounts:', error);
  }
};
