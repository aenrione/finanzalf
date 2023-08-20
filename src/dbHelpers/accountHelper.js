import db from './openDB';
import { createTable, getTableData, deleteData, deleteTable, insertObject, updateObject } from 'src/dbHelpers/generalHelper';
import { generateColor } from 'src/utils/tools';

// Table Name
const tableName = 'accounts';


// Create Accounts Table
const tableString = 'CREATE TABLE IF NOT EXISTS ' + tableName +
  ' (id INTEGER PRIMARY KEY AUTOINCREMENT,\
  fintoc_link VARCHAR(100), \
  fintoc_account_id VARCHAR(100), \
  buda_public VARCHAR(100), \
  buda_secret VARCHAR(100), \
  fintual_email VARCHAR(100), \
  fintual_secret VARCHAR(100), \
  fintual_goal_id VARCHAR(100), \
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

const getFilter = (filter, t) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const currentDay = currentDate.getDate() + 1;
  let filterCondition = '';

  if (filter === 'monthly') {
    filterCondition = `CAST(strftime('%Y', ${t}.transaction_date) AS INTEGER) = ${currentYear} AND \
                       CAST(strftime('%m', ${t}.transaction_date) AS INTEGER) = ${currentMonth}`;
  } else if (filter === 'weekly') {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDay - 7);
    const startDate = `${startOfWeek.getFullYear()}-${String(startOfWeek.getMonth() + 1).padStart(2, '0')}-${String(startOfWeek.getDate()).padStart(2, '0')}`;
    filterCondition = `${t}.transaction_date BETWEEN '${startDate}' AND '${currentYear}-${currentMonth}-${currentDay.toString().padStart(2, '0')}'`;
  }
  return filterCondition;
}

// Get Accounts
export const getAccounts = async ({ query = '', filter = '' }) => {
  const alias = 'a';
  let selected = '*';

  const t2_filter = getFilter(filter, 't2');
  const t3_filter = getFilter(filter, 't3');

  const incomeQuery = `( \
    SELECT SUM(t2.amount) FROM transactions t2 \
    JOIN accounts ON t2.account_id = a.id \
    WHERE t2.type = "income" ${t2_filter ? `AND ${t2_filter}` : ''} ) AS income`;

  const expenseQuery = `( \
    SELECT SUM(t3.amount) FROM transactions t3 \
    JOIN accounts ON t3.account_id = a.id \
    WHERE t3.type = "expense" ${t3_filter ? `AND ${t3_filter}` : ''} ) AS expense`;

  selected += `, ${incomeQuery}, ${expenseQuery}`;

  return getTableData(tableName, null, selected, query, alias);
};

// Delete Account
export const deleteAccount = (id) => {
  deleteData(tableName, id)
}

// Drop Table
export const deleteAccountsTable = () => {
  deleteTable(tableName)
}

// Insert Account
export const insertAccount = async (item) => {
  return insertObject(tableName, item)
}

// Update Account
export const updateAccount = async (item) => {
  return updateObject(tableName, item)
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
              item.color = generateColor(len, i)
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

export const updateAccountAmount = async (accountId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE accounts
         SET amount = (SELECT SUM(amount) FROM transactions WHERE account_id = ?)
         WHERE id = ?`,
        [accountId, accountId],
        (_tx, result) => {
          if (result.rowsAffected > 0) {
            resolve(true);
          } else {
            reject(new Error(`Account with id ${accountId} not found.`));
          }
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  });
};
