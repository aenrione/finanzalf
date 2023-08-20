import { getTransactions, getTotalIncomesAndExpensesByCurrency, getIncomes, getExpenses } from 'src/dbHelpers/transactionHelper';
import { getChartInfo, getCategories } from 'src/dbHelpers/categoryHelper';
import { getAccountChartInfo, getTotalAccountAmountsByCurrency, getAccounts } from 'src/dbHelpers/accountHelper';
// import { getQuotas} from 'src/dbHelpers/accountHelper';
import { getGoals } from 'src/dbHelpers/goalHelper';

export const getAllInfo = (filter = { name: "month", value: "monthly" }, loading = true) => {
  return async (dispatch) => {
    if (loading) {
      dispatch({
        type: 'LOAD_SPINNER'
      });
    }
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
      goals: [],
      quotas: [],
      filter: filter,
    };

    try {
      payload.transactions = await getTransactions();
      payload.accounts = await getAccounts({ filter: filter.value });
      payload.categories = await getCategories();
      payload.categoryChartData = await getChartInfo();
      payload.accountChartData = await getAccountChartInfo();
      payload.accountTotals = await getTotalAccountAmountsByCurrency();
      payload.balances = await getTotalIncomesAndExpensesByCurrency({ filter: filter.value });
      payload.incomes = await getIncomes();
      payload.expenses = await getExpenses();
      payload.goals = await getGoals();
      console.log("Updating ALL")

      dispatch({
        type: 'UPDATE_ALL',
        payload: payload,
      });
    } catch (error) {
      console.log(error);
    }
    if (loading) {
      dispatch({
        type: 'STOP_SPINNER'
      });
    }
  };
};
