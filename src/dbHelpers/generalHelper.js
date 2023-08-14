import db from './openDB';


// Create Accounts Table
export const createTable = (tableName, infoString) => {
  db.transaction((tx) => {
    tx.executeSql(
      infoString,
      [],
      () => {
        console.log('created:', tableName);
      },
      error => {
        console.log(error);
      }
    );
  });
}

// Get Data
export const getTableData = (tableName, setData = null, selected = '*', addedQuery = '', alias = '') => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT ${selected} FROM ` + tableName + ' ' + alias + ' ' + addedQuery,
        [],
        (_tx, results) => {
          var len = results.rows.length;
          let result = [];
          for (let i = 0; i < len; i++) {
            result.push(results.rows.item(i));
          }
          if (setData) {
            setData(result)
          }
          resolve(result);
        },
        error => {
          console.log(error);
          reject(error);
        }
      );
    });
  });
}

// Delete Item
export const deleteData = (tableName, id) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM ' + tableName + ' WHERE id = ?',
      [id],
      () => {
        console.log('deleted');
      },
      error => {
        console.log(error);
      }
    );
  });
}

// Drop Table
export const deleteTable = (tableName) => {
  db.transaction((tx) => {
    tx.executeSql(
      `drop table ${tableName}`,
      [],
      () => {
        console.log('deleted: ', tableName);
      },
      error => {
        console.log(error);
      }
    );
  });
}
export const updateObject = (tableName, item, log = false) => {
  const { id, ...attributesToUpdate } = item;

  const setAttributes = Object.keys(attributesToUpdate)
    .map((key) => `${key} = ?`)
    .join(', ');

  const attributeValues = Object.values(attributesToUpdate);

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${tableName} SET ${setAttributes} WHERE id = ?`,
        [...attributeValues, id],
        (_tx, result) => {
          if (log) {
            console.log(`Updated: ${tableName} obj with id: ${item.id}`);
          }
          resolve(result)
        },
        (error) => {
          console.log(error);
          reject(error)
        }
      );
    });
  });
};

// Insert
export const insertObject = (tableName, item, log = false) => {
  const { id, ...attributesToUpdate } = item;
  const attributeValues = Object.values(attributesToUpdate);

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${tableName} (${Object.keys(attributesToUpdate).join(', ')}) VALUES (${'?, '.repeat(Object.keys(attributesToUpdate).length - 1)} ?)`,
        [...attributeValues],
        (_tx, result) => {
          const id = result.insertId;
          if (log) {
            console.log(`Inserted: ${tableName} obj with id: ${id}`);
          }
          resolve(result);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  });
};

// Udpate or Insert
export const updateOrInsertObject = (tableName, item, prim_key = 'id', log = false) => {
  const { id, ...attributesToUpdate } = item;

  const setAttributes = Object.keys(attributesToUpdate)
    .map((key) => `${key} = ?`)
    .join(', ');

  const attributeValues = Object.values(attributesToUpdate);

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${tableName} SET ${setAttributes} WHERE ${prim_key} = ?`,
        [...attributeValues, id],
        (_, updateResults) => {
          if (updateResults.rowsAffected === 0) {
            tx.executeSql(
              `INSERT INTO ${tableName} (${Object.keys(attributesToUpdate).join(', ')}) VALUES (${'?, '.repeat(Object.keys(attributesToUpdate).length - 1)} ?)`,
              [...attributeValues],
              (_tx, result) => {
                const id = result.insertId;
                if (log) {
                  console.log(`Inserted: ${tableName} obj with id: ${id}`);
                }
                resolve(result);
              },
              (error) => {
                console.log(error);
                reject(error)
              }
            );
          } else {
            if (log) {
              console.log(`Updated: ${tableName} obj with ${prim_key}: ${item.id}`);
            }
            resolve(updateResults);
          }
        },
        (error) => {
          console.log(error);
          reject(error)
        }
      );
    });
  });
};
