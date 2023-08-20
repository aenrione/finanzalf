import { createTable, getTableData, deleteData, deleteTable, insertObject, updateObject } from 'src/dbHelpers/generalHelper';

// Table Name
const tableName = 'goals';

// Create Accounts Table
const tableString = 'CREATE TABLE IF NOT EXISTS ' + tableName +
  ' (id INTEGER PRIMARY KEY AUTOINCREMENT,\
  name VARCHAR(50), \
  total FLOAT NOT NULL, \
  collected FLOAT NOT NULL \
  );';
export const createGoalTable = () => {
  createTable(tableName, tableString)
};
export const getGoals = () => {
  return getTableData(tableName);
};

// Insert Goal
export const insertGoal = (item) => {
  insertObject(tableName, item)
}

export const updateGoal = (item) => {
  // Update Goal
  updateObject(tableName, item)
}
// Delete Goal
export const deleteGoal = (id) => {
  deleteData(tableName, id)
}

// Drop Table
export const deleteGoalsTable = () => {
  deleteTable(tableName)
}
