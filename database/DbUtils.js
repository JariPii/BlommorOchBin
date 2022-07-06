import * as SQLite from 'expo-sqlite';
import Item from '../models/ItemInfo';
import React from 'react';

const db = SQLite.openDatabase("listsdb.db");

export const initDB = () => {

    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {
            transaction.executeSql(
                `CREATE TABLE IF NOT EXISTS list (
                    id INTEGER PRIMARY KEY NOT NULL,
                    name TEXT NOT NULL,
                    madeOf TEXT NOT NULL,
                    amount INTEGER NOT NULL,
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

    // console.log(item.name + "<-------item")


    return new Promise((resolve, reject) => {

        db.transaction((transaction) => {
            //     transaction.executeSql(
            //         `DROP TABLE list`,
            //         (tx, res) => resolve(res),
            //         (tx, err) => reject(err)
            //     )

            transaction.executeSql(
                `INSERT INTO list (name, madeOf, amount,completed)
                VALUES (?, ?, ?, ?)`, [item.name, item.madeOf, item.amount, item.completed],
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
                        .map(item => new Item(item.id, item.name, item.madeOf, item.amount, item.completed === 1))
                ),
                (tx, err) => reject(err)
            )
        })

    })
}

export const findById = (madeOf) => {

    return new Promise((resolve, reject) => {
        db.transaction((transaction) => {
            transaction.executeSql(
                `SELECT * FROM list WHERE madeOf = ?`, [madeOf], [],
                (tx, res) => resolve(res),
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

export const increaseAmount = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction((transaction) => {
            transaction.executeSql(
                `SELECT * FROM list WHERE id = ?`, [id],
                (tx, res) => resolve(
                    console.log(res.rows._array[0], " this"),
                    transaction.executeSql(`
                        UPDATE list SET amount = ?`, [res.rows._array[0].amount + 1])
                )
                ,
                (tx, err) => reject(err))


        }
        )
    }
    )
}
