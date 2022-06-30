import { Text, View, FlatList, Pressable } from "react-native"
import { findAll, deleteById } from "../database/DbUtils"
import React, { useState, useEffect } from "react"

export default function SavedList({list}){
   const [savedList, setSavedList] = useState()
   
    

    useEffect(() => {
        findAll()
        .then(res => setSavedList(res))
    }, [])

    const deleteItem = (item) => {

        console.log(item, " this is item in delete item ")
        deleteById(item).then(
            findAll()
                .then(res => setSavedList(res))
        )

    }

    const renderItems = ({item}) =>{
        return(
            <View>
                <Text>{item.name}</Text>
                <Pressable onPress={() => deleteItem(item.id)}>
                    <Text>Delete  {"\n"}</Text>
                </Pressable>
            </View>
        )
    }

    return(
        <FlatList 
            data={savedList}
            renderItem={renderItems}
            keyExtractor={(item, index) => index.toString()}
        />
   
    )
    }   
