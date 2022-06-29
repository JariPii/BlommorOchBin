import { Text, View, FlatList } from "react-native"
import { findAll } from "../database/DbUtils"
import { useState, useEffect } from "react"

export default function SavedList({list}){
   const [savedList, setSavedList] = useState()
   
    

    useEffect(() => {
        findAll()
        .then(res => setSavedList(res))
    }, [])

    const renderItems = ({item}) =>{
        return(
            <View>
                <Text>{item.name}</Text>
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
