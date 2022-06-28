import * as SQLite from 'expo-sqlite';
import Item from '../models/ItemInfo';

const db = SQLite.openDatabase("ListedItems.db");

export const initDB = () => {

    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {
            transaction.executeSql(
                `CREATE TABLE IF NOT EXISTS list (
                    id INTEGER PRIMARY KEY NOT NULL,
                    name TEXT NOT NULL,
                    madeOf TEXT NOT NULL,
                    completed BOOLEAN NOT NULL
                )`, [],
                (tx, res) => resolve(res),
                (tx, err) => reject(err) 
            )
        })
    })

}
export const getTableInfo = () => {

    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {

            transaction.executeSql(
                `pragma table_info('list')`, [],
                (tx, res) => resolve(res),
                (tx, err) => reject(err)
            )

        })
    })

}

export const insert = (item) => {

    console.log(item.name + "<-------item")

    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {
            transaction.executeSql(
                `INSERT INTO list (name, madeOf, completed)
                VALUES (?, ?, ?)`, [item.name, item.madeOf, item.completed],
                (tx, res) => resolve(res),
                (tx, err) => reject(err)
            )
        })

    })
}

export const findAll = () => {

    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {
            transaction.executeSql(
                `SELECT * FROM list`, [],
                (tx, res) => resolve(
                    res.rows._array
                        .map(item => new Item(item.id, item.name, item.madeOf, item.completed === 1))
                ),
                (tx, err) => reject(err)
            )
        })

    })
}

export const deleteById = (id) => {

    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {
            transaction.executeSql(
                `DELETE FROM list WHERE id = ?`, [id],
                (tx, res) => resolve(res),
                (tx, err) => reject(err)
            )
        })

    })

}
