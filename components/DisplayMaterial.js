import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import { findAll, insert } from "../database/DbUtils"
import Item from "../models/ItemInfo"
import React, { useState } from "react"


export default function DisplayMaterial({ selected ,navigation}) {

    const [list, setList] = useState([])

    const renderListItems = ({item: material}) => {
        return(
        <Text style={{backgroundColor: 'red'}} >{material.name}</Text>
        )
    }
    
    const displayItems= () => {

         findAll()
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
        
        console.log(list)
        return(
            <FlatList
                data={list}
                renderItem={renderListItems}
                keyExtractor={(item,index) => index.toString()}
            />
        )
    }

    const addToList = () => {
        const item = new Item(0, selected.name, selected.key_l, false)
        console.log(item, " item")
        insert(item)
        .then(res => {
            console.log(res)
            return findAll()
        })
        .then(res => setList(res))
        .catch(err => console.log(err, " this what im looking for"))
    }

    if (selected)


        return (
            <View style={styles.test}>
                <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                <Text style={{color: 'white', fontSize: 18}}>{selected.name}</Text>
                </View>
                <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Item info', {
                            selected,
                        })

                    }}
                >
                    <Text>More Info</Text>
                </TouchableOpacity> 


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('List',{
                            list
                        })
                    }}
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