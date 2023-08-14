import SQLite from 'react-native-sqlite-storage';

const dbName = 'FinanzAlf';

const db = SQLite.openDatabase(
  {
    name: dbName,
    location: 'default'
  },
  () => {
    console.log('connected: ', dbName);
  },
  error => {
    console.log(error);
  }
);

export default db;
