import db from './openDB';
import { createTable, getTableData, deleteData, deleteTable, insertObject, updateObject } from 'src/dbHelpers/generalHelper';
import { updateAccountAmount } from 'src/dbHelpers/accountHelper';

// Table Name
const tableName = 'transactions';

// Create Transactions Table
const tableString = 'CREATE TABLE IF NOT EXISTS ' + tableName +
  ' (id INTEGER PRIMARY KEY AUTOINCREMENT,  \
  description VARCHAR(30) NOT NULL,\
  account_id INTEGER NOT NULL  REFERENCES accounts(id) ON DELETE CASCADE,\
  category_id INTEGER,\
  transaction_date DATETIME NOT NULL,\
  amount FLOAT NOT NULL,\
  comment VARCHAR(20),\
  fintoc_mov_id VARCHAR(20),\
  subtype VARCHAR(20),\
  sender_name VARCHAR(30),\
  sender_number INTEGER,\
  sender_institution_name VARCHAR(30),\
  type VARCHAR(20) NOT NULL\
  );';
export const createTransactionsTable = () => {
  createTable(tableName, tableString)
}

// Get Transactions
export const getTransactions = async (setData, query = '', filter = '') => {

  const monthly_q = ' WHERE YEAR(transaction_date) = YEAR(CURRENT_DATE)\
  AND MONTH(transaction_date) = MONTH(CURRENT_DATE);'
  const weekly_q = ' WHERE YEARWEEK(transaction_date) = YEARWEEK(CURRENT_DATE);'
  const order = ' ORDER BY t.transaction_date DESC'
  const alias = 't'
  let selected = '\
    t.id, t.description, t.account_id, t.category_id, t.transaction_date, t.amount, t.type, \
    c.icon, c.name AS category_name, a.name AS account_name, \
    a.currency_symbol AS currency, a.code AS code, a.editable AS editable, \
    a.icon AS acc_icon, c.id AS category_id, a.id AS account_id'
  let fullQuery = ` LEFT JOIN categories c ON t.category_id = c.id \
       JOIN accounts a ON t.account_id = a.id ${query}`
  if (filter == 'monthly') { fullQuery += monthly_q } else if (filter == 'weekly') { fullQuery += weekly_q }
  fullQuery += order

  return getTableData(tableName, setData, selected, `${fullQuery}`, alias)//.then((result) => { console.log(result) })
};

// Delete Transaction
export const deleteTransaction = (id) => {
  deleteData(tableName, id)
}

// Drop Table
export const deleteTransactionsTable = () => {
  deleteTable(tableName)
}

// Get Incomes
export const getIncomes = (setData) => {
  return getTransactions(setData, 'WHERE t.type = "income"')

};

// Get Expenses
export const getExpenses = (setData) => {
  return getTransactions(setData, 'WHERE t.type = "expense"')
};

const getFilter = (filter, t) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const currentDay = currentDate.getDate() + 1;
  let filterCondition = '';

  if (filter === 'monthly') {
    filterCondition = `WHERE CAST(strftime('%Y', ${t}.transaction_date) AS INTEGER) = ${currentYear} AND \
                       CAST(strftime('%m', ${t}.transaction_date) AS INTEGER) = ${currentMonth}`;
  } else if (filter === 'weekly') {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDay - 7);
    const startDate = `${startOfWeek.getFullYear()}-${String(startOfWeek.getMonth() + 1).padStart(2, '0')}-${String(startOfWeek.getDate()).padStart(2, '0')}`;
    filterCondition = `WHERE ${t}.transaction_date BETWEEN '${startDate}' AND '${currentYear}-${currentMonth}-${currentDay.toString().padStart(2, '0')}'`;
  }
  return filterCondition;
}

// GetTotal Incomes and Expenses by Currency Code
export const getTotalIncomesAndExpensesByCurrency = ({ filter = '' }) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT a.code, 
              SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) as totalIncome, 
              SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) as totalExpense
       FROM ${tableName} t
       JOIN accounts a ON t.account_id = a.id
       ${getFilter(filter, 't')} 
       GROUP BY a.code`,
        [],
        (_tx, results) => {
          var len = results.rows.length;
          let totals = [];

          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              totals.push({
                code: row.code,
                totalIncome: row.totalIncome,
                totalExpense: row.totalExpense,
              });
            }
          }
          resolve(totals)
        },
        error => {
          console.log(error);
          reject(error)
        }
      );
    });
  });
};

// Insert Transactions
export const insertTransaction = async (item) => {
  insertObject(tableName, item).then(() => {
    // Update account balance
    updateAccountAmount(item.account_id)
  })
}

// Update Transactions
export const updateTransaction = (item) => {
  updateObject(tableName, item).then(() => {
    // Update account balance
    updateAccountAmount(item.account_id)
  })
};
