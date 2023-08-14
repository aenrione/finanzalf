import { Alert } from 'react-native';
import db from './openDB';
import { createTable, getTableData, deleteData, deleteTable, insertObject, updateObject } from 'src/dbHelpers/generalHelper';

// Table Name
const tableName = 'transactions';

// Create Transactions Table
const tableString = 'CREATE TABLE IF NOT EXISTS ' + tableName +
  ' (id INTEGER PRIMARY KEY AUTOINCREMENT,  \
  description VARCHAR(30) NOT NULL,\
  account_id INTEGER NOT NULL,\
  category_id INTEGER,\
  transaction_date TEXT NOT NULL,\
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
export const getTransactions = async (setData, query = ' ORDER BY t.transaction_date DESC') => {
  const alias = 't'
  let selected = '\
    t.id, t.description, t.account_id, t.category_id, t.transaction_date, t.amount, t.type, \
    c.icon, c.name AS category_name, a.name AS account_name, \
    a.currency_symbol AS currency, a.code AS code, a.editable AS editable, \
    a.icon AS acc_icon, c.id AS category_id, a.id AS account_id'
  const fullQuery = ' LEFT JOIN categories c ON t.category_id = c.id \
       JOIN accounts a ON t.account_id = a.id'
  return getTableData(tableName, setData, selected, `${fullQuery} ${query}`, alias)//.then((result) => { console.log(result) })
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

// GetTotal Incomes
export const getTotalIncomes = (setTotalIncomes) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ' + tableName + ' WHERE type = ?',
        ['income'],
        (_tx, results) => {
          var len = results.rows.length;
          let total = 0;

          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              total += row.amount;
            }
          }
          if (setTotalIncomes) setTotalIncomes(total)
          resolve(total)
        },
        error => {
          console.log(error);
          reject(error)
        }
      );
    });
  });
}

// GetTotal Expenses
export const getTotalExpenses = (setTotalExpenses) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ' + tableName + ' WHERE type = ?',
        ['expense'],
        (_tx, results) => {
          var len = results.rows.length;
          let total = 0;

          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              total += row.amount;
            }
          }
          if (setTotalExpenses) setTotalExpenses(total)
          resolve(total)
        },
        error => {
          console.log(error);
          reject(error)
        }
      );
    });
  });
}

// GetTotal Incomes and Expenses by Currency Code
export const getTotalIncomesAndExpensesByCurrency = (setTotals) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT a.code, 
              SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) as totalIncome, 
              SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) as totalExpense
       FROM ${tableName} t
       JOIN accounts a ON t.account_id = a.id
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
          if (setTotals) setTotals(totals);
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
export const insertTransaction = (item) => {
  insertObject(tableName, item).then(() => {
    // Update account balance
    db.transaction(async (tx) => {
      await tx.executeSql(
        `UPDATE accounts SET amount = amount + ? WHERE id = ?;`,
        [item.amount, item.account_id]
      );
    })
  })
}

// Update Transactions
export const updateTransaction = (item) => {
  updateObject(tableName, item)
};
