import db from './openDB';
import { createTable, getTableData, deleteData, deleteTable, insertObject, updateObject } from 'src/dbHelpers/generalHelper';
import { Colors } from 'src/styles';

// Table Name
const tableName = 'accounts';


// Create Accounts Table
const tableString = 'CREATE TABLE IF NOT EXISTS ' + tableName +
  ' (id INTEGER PRIMARY KEY AUTOINCREMENT,\
  fintoc_link VARCHAR(100), \
  fintoc_account_id VARCHAR(100), \
  buda_public VARCHAR(100), \
  buda_secret VARCHAR(100), \
  fintual_public VARCHAR(100), \
  fintual_secret VARCHAR(100), \
  type VARCHAR(20) NOT NULL, \
  name VARCHAR(20) NOT NULL,\
  amount FLOAT DEFAULT 0,\
  currency_name VARCHAR (20) NOT NULL,\
  currency_symbol VARCHAR (5) NOT NULL,\
  icon VARCHAR(10) NOT NULL,\
  code VARCHAR(10) NOT NULL,\
  editable BOOL NOT NULL,\
  holder_name VARCHAR(100), \
  investment_return FLOAT DEFAULT 0, \
  subtype VARCHAR(20) NOT NULL, \
  refreshed_at TEXT \
  );';
export const createAccountsTable = () => {
  createTable(tableName, tableString)
};


// Get Accounts
export const getAccounts = async (setData, query = '', complete = true) => {
  const alias = 'a'
  let selected = '*'
  if (complete) {
    const incomeQuery = '( \
            SELECT SUM(t2.amount) FROM transactions t2 \
            JOIN accounts ON t2.account_id = a.id \
            WHERE t2.type = "income" \
          ) AS income'
    const expenseQuery = '( \
            SELECT SUM(t3.amount) FROM transactions t3 \
            JOIN accounts ON t3.account_id = a.id \
            WHERE t3.type = "expense" \
          ) AS expense'
    selected += `, ${incomeQuery}, ${expenseQuery}`
  }
  return getTableData(tableName, setData, selected, query, alias)//.then((result) => { console.log(result) })
}

// Delete Account
export const deleteAccount = (id) => {
  deleteData(tableName, id)
}

// Drop Table
export const deleteAccountsTable = () => {
  deleteTable(tableName)
}

// Insert Account
export const insertAccount = (item) => {
  insertObject(tableName, item)
}

// Update Account
export const updateAccount = (item) => {
  updateObject(tableName, item)
}


// Get Chart info
export const getAccountChartInfo = (setData) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT 
          a.name AS label_name, a.code,
          (a.amount * 100.0 / (
            SELECT SUM(a2.amount) FROM accounts a2
            WHERE a2.code = a.code
          )) AS percentage
        FROM accounts a
        `,
        [],
        (_tx, results) => {
          var len = results.rows.length;
          let data = {};
          for (let i = 0; i < len; i++) {
            let item = results.rows.item(i)
            if (item.percentage > 0) {
              if (!data[item.code]) {
                data[item.code] = [];
              }
              if (i % 2 == 0) {
                item.color = Colors.GRAY_MEDIUM;
              } else {
                item.color = Colors.PRIMARY;
              }
              data[item.code].push(item);
            }
          }
          if (setData) {
            setData(data);
          }
          resolve(data)
        },
        (error) => {
          console.log(error);
          reject(error)
        }
      );
    });
  });
};
//
// Get Total Account Amounts by Currency Code
export const getTotalAccountAmountsByCurrency = (setTotals) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT code, SUM(amount) as totalAmount, SUM(investment_return) as investmentReturn
       FROM ${tableName}
       GROUP BY code`,
        [],
        (_tx, results) => {
          var len = results.rows.length;
          let totals = [];

          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              totals.push({
                code: row.code,
                totalAmount: row.totalAmount,
                investmentReturn: row.investmentReturn,
              });
            }
          }
          if (setTotals) {
            setTotals(totals);
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
