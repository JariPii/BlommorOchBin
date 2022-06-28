import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import { findAll, insert } from "../database/DbUtils"
import Item from "../models/ItemInfo"
import React, { useState } from "react"


export default function DisplayMaterial({ selected ,navigation}) {

    console.log(selected.name + " this is seleleselsels")

    const [list, setList] = useState([])

    const renderListItems = ({item: material}) => {
        return(
        <Text>{material.name}</Text>
        )
    }
    
    const displayItems= () => {

        console.log("gets to dispasldaspdaskdasiteitmetietm")
         findAll()
                    .then(res => setList(res))
                    .catch(err => console.log(err))
        

        return(
            <FlatList 
                data={list}
                renderItem={renderListItems}
                keyExtractor={(item,index) => index.toString()}
            />
        )
    }

    const addToList = () => {
        const item = new Item(0, selected.name, selected.value, false)

        insert(item)
        .then(res => {
            console.log("inster ---- jari kan stava, men inte anton res", res)
            return findAll()
        })
        .then(res => setList(res))
        .catch(err => console.log(err))
    }

    if (selected)


        return (
            <View style={styles.test}>
                <Text>{selected.name}</Text>
                <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Search')

                    }}
                >
                    <Text>More Info</Text>
                </TouchableOpacity> 


                <TouchableOpacity
                    style={styles.button}
                    onPress={displayItems}
                >
                    <Text>Show List</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.button}
                    onPress={addToList}
                    >
                    <Text>Add to List</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
        return(
            <View></View>
        )
}

const styles = StyleSheet.create({
    test:{
        height: '60%',
    },
    button: {
        backgroundColor: '#8B93A5',
        padding: 10,
        borderRadius: 6,
        marginTop: 50,
        margin: 10,
        height: 50,
        width: 100
      },
      buttonRow: {
        flex: 1,
        flexDirection: 'row',
        margin: 5
      }
})