import { createMoneyBoxTable, deleteMoneyBoxTable } from 'src/dbHelpers/moneyboxHelper';
import { createTransactionsTable, deleteTransactionsTable } from 'src/dbHelpers/transactionHelper';
import { createAccountsTable, deleteAccountsTable } from 'src/dbHelpers/accountHelper';
import { createCategoriesTable, deleteCategoriesTable } from 'src/dbHelpers/categoryHelper';
const INITIAL_STATE = {
  user: null,
  spinner: false,
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
  filter: "monthly",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_USER_SUCCESS':
      createMoneyBoxTable();
      createTransactionsTable();
      createAccountsTable();
      createCategoriesTable();
      return {
        ...state,
        user: action.payload,
      };
    case 'REMOVE_SESSION':
      deleteMoneyBoxTable();
      deleteTransactionsTable();
      deleteAccountsTable();
      deleteCategoriesTable();
      return {
        ...state,
        user: null,
      };
    case 'LOAD_SPINNER':
      return { ...state, spinner: true };
    case 'STOP_SPINNER':
      return { ...state, spinner: false };
    case 'UPDATE_ALL':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
