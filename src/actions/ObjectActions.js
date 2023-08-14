import { getTransactions, getTotalIncomes, getTotalExpenses, getTotalIncomesAndExpensesByCurrency, getIncomes, getExpenses } from 'src/dbHelpers/transactionHelper';
import { getChartInfo, getCategories } from 'src/dbHelpers/categoryHelper';
import { getAccountChartInfo, getTotalAccountAmountsByCurrency, getAccounts } from 'src/dbHelpers/accountHelper';

export const getAllInfo = (filter = "monthly") => {
  return async (dispatch) => {
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
      totalIncomes: 0,
      totalExpenses: 0,
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
      payload.totalIncomes = await getTotalIncomes();
      payload.totalExpenses = await getTotalExpenses();
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
  };
};
