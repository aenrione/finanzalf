import axios from 'axios';
const secretKey = 'sk_test__yZKSvmyWR2XxfSBySs_5z79N8BC3NTs';
import { getTableData, updateObject, updateOrInsertObject } from 'src/dbHelpers/generalHelper';
import { insertAccount } from 'src/dbHelpers/accountHelper';
import { currencies } from 'src/utils/currency';

const findCurrencyByCode = (code) => {
  return currencies.find((currency) => currency.code === code);
};

export const generateFintocUrl = (options) => {
  let baseUrl = "https://webview.fintoc.com/widget.html";
  baseUrl += `?holder_type=${options.holder_type}`
  baseUrl += `&product=${options.product}`
  baseUrl += `&public_key=${options.public_key}`
  baseUrl += `&widget_token=${options.widget_token}`
  return baseUrl;
}

export const getOptions = async (setOptions, options = null) => {
  if (options) return
  try {
    const options = {
      public_key: 'pk_test_e32FDjRZ1YRUce2kJh7JmifvQq5imxDr',
      holder_type: 'individual',
      product: 'movements',
      country: 'cl',
    };

    const { data: response } = await axios.post(
      'https://api.fintoc.com/v1/link_intents',
      options,
      {
        headers: {
          Authorization: secretKey,
        },
      }
    );
    options.widget_token = response.widget_token;
    setOptions(options);
  } catch (error) {
    console.error('Error fetching options:', error);
  }
};
export const getLink = async (exchangeToken) => {
  try {
    const { data: response } = await axios.get(
      `https://api.fintoc.com/v1/links/exchange?exchange_token=${exchangeToken}`,
      {
        headers: {
          Authorization: secretKey,
        },
      }
    );
    return response.link_token
  } catch (error) {
    console.error('Error fetching options:', error);
  }
};
export const getAccount = async (acc_id, link) => {
  try {
    const { data: response } = await axios.get(
      `https://api.fintoc.com/v1/accounts/${acc_id}?link_token=${link}`,
      {
        headers: {
          Authorization: secretKey,
        },
      }
    );
    return response
  } catch (error) {
    console.error('Error fetching options:', error);
  }
};

export const getAccMovements = async (acc_id, link) => {
  try {
    const { data: response } = await axios.get(
      `https://api.fintoc.com/v1/accounts/${acc_id}/movements?link_token=${link}`,
      {
        headers: {
          Authorization: secretKey,
        }
      },
    );
    return response
  } catch (error) {
    console.error('Error fetching options:', error);
  }
};

const insertMovementsToAccount = async (db_acc_id, movs) => {
  for (const mov of movs) {
    await updateOrInsertObject('transactions', {
      id: mov.id,
      fintoc_mov_id: mov.id,
      account_id: db_acc_id,
      transaction_date: new Date(mov.post_date).toLocaleString(),
      description: mov.description,
      comment: mov.comment,
      subtype: mov.type,
      sender_name: mov.sender_account?.holder_name,
      sender_number: mov.sender_account?.number,
      sender_institution_name: mov.sender_account?.institution.name,
      amount: parseFloat(mov.amount),
      type: parseFloat(mov.amount) < 0 ? 'expense' : 'income'
    }, 'fintoc_mov_id');
  }
};

export const createAccounts = async (accounts, type) => {
  accounts.forEach((acc) => {
    insertAccount({
      type: type,
      name: `${acc.name}`,
      amount: parseFloat(acc.balance.current),
      currency: findCurrencyByCode(acc.currency),
      fintoc_link: link,
      fintoc_account_id: acc.id,
      holder_name: acc.holder_name,
      refreshed_at: new Date(acc.refreshed_at).toLocaleDateString()
    })
      .then(async ({ id, account_id }) => {
        const movs = await getAccMovements(account_id, link)
        await insertMovementsToAccount(id, movs)
      })
      .catch((error) => {
        console.error('Error inserting account:', error);
      });
  })
}

export const linkInfo = async (link) => {
  try {
    const { data: response } = await axios.get(
      `https://api.fintoc.com/v1/links/${link}`,
      {
        headers: {
          Authorization: secretKey,
        },
      }
    );
    return accounts = response.accounts
  } catch (error) {
    console.error('Error fetching options:', error);
  }
};

export const updateAccounts = async () => {
  try {
    const query = 'WHERE a.subtype = "fintoc"';
    const accounts = await getTableData('accounts', null, '*', query, 'a');

    const updatePromises = accounts.map(async (acc) => {
      const updated_account = await getAccount(acc.fintoc_account_id, acc.fintoc_link);
      if (updated_account) {
        const updated_info = { id: acc.id, amount: updated_account.balance.current, refreshed_at: new Date(updated_account.refreshed_at).toLocaleString() };
        await updateObject('accounts', updated_info);
        const movs = await getAccMovements(acc.fintoc_account_id, acc.fintoc_link);
        await insertMovementsToAccount(acc.id, movs);
      }
    });

    await Promise.all(updatePromises);

    console.log('All accounts updated successfully');
  } catch (error) {
    console.error('Error updating accounts:', error);
  }
};
