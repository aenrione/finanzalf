import { getTransactions, getTotalIncomesAndExpensesByCurrency, getIncomes, getExpenses } from 'src/dbHelpers/transactionHelper';
import { getChartInfo, getCategories } from 'src/dbHelpers/categoryHelper';
import { getAccountChartInfo, getTotalAccountAmountsByCurrency, getAccounts } from 'src/dbHelpers/accountHelper';

export const getAllInfo = (filter = { name: "month", value: "monthly" }) => {
  return async (dispatch) => {
    dispatch({
      type: 'LOAD_SPINNER'
    });
    let payload = {
      balances: [],
      accountTotals: [],
      accounts: [],
      categories: [],
      transactions: [],
      incomes: [],
      expenses: [],
      categoryChartData: [],
      accountChartData: [],
      filter: filter,
    };

    try {
      payload.accounts = await getAccounts();
      payload.transactions = await getTransactions();
      payload.categories = await getCategories();
      payload.categoryChartData = await getChartInfo();
      payload.accountChartData = await getAccountChartInfo();
      payload.accountTotals = await getTotalAccountAmountsByCurrency();
      payload.balances = await getTotalIncomesAndExpensesByCurrency();
      payload.incomes = await getIncomes();
      payload.expenses = await getExpenses();
      console.log("Updating ALL")

      dispatch({
        type: 'UPDATE_ALL',
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: 'STOP_SPINNER'
    });
  };
};
