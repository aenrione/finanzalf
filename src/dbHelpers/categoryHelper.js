import { Alert } from 'react-native';
import db from './openDB';
import { createTable, getTableData, deleteData, deleteTable, insertObject, updateObject } from 'src/dbHelpers/generalHelper';
import { Colors } from 'src/styles';

// Table Name
const tableName = 'categories';

// Create Categories Table
const tableString = 'CREATE TABLE IF NOT EXISTS ' + tableName +
  ' (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20) NOT NULL, icon VARCHAR(20) NOT NULL, description VARCHAR(30));'
  ;
export const createCategoriesTable = () => {
  createTable(tableName, tableString)
};
//


// Get Categories
export const getCategories = (setData) => {
  return getTableData(tableName, setData)
}

// Delete Category
export const deleteCategorie = (id) => {
  deleteData(tableName, id)
}

// Drop Table
export const deleteCategoriesTable = () => {
  deleteTable(tableName)
}

// Insert Category
export const insertCategory = (item) => {
  insertObject(tableName, item)
}

// Update Category
export const updateCategory = (item) => {
  updateObject(tableName, item)
}


// Get Chart info
export const getChartInfo = (setData) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT 
          a.code AS currency,
          COALESCE(c.name, "No Category") AS label_name,
          SUM(t.amount) * 100.0 / (
            SELECT SUM(t2.amount) FROM transactions t2
            JOIN accounts a2 ON t2.account_id = a2.id
            WHERE a2.code = a.code
          ) AS percentage,
          COALESCE(c.icon, "circle-notch") AS icon
        FROM accounts a
        LEFT JOIN transactions t ON a.id = t.account_id
        LEFT JOIN ${tableName} c ON c.id = t.category_id
        GROUP BY a.code, label_name;
        `,
        [],
        (_tx, results) => {
          var len = results.rows.length;
          let data = {};
          for (let i = 0; i < len; i++) {
            let item = results.rows.item(i);
            if (item.percentage > 0) {
              if (!data[item.currency]) {
                data[item.currency] = [];
              }
              if (i % 2 == 0) {
                item.color = Colors.GRAY_MEDIUM;
              } else {
                item.color = Colors.PRIMARY;
              }
              data[item.currency].push(item);
            }
          }
          if (setData) setData(data);
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
