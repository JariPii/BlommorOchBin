import { Text, View, FlatList, Pressable, StyleSheet, Dimensions, ImageBackground } from "react-native"
import { findAll, deleteById } from "../database/DbUtils"
import React, { useState, useEffect } from "react"

export default function SavedList({ list }) {
    const [savedList, setSavedList] = useState()



    useEffect(() => {
        findAll()
            .then(res => setSavedList(res))
    }, [])

    const deleteItem = (item) => {

        deleteById(item).then(
            findAll()
                .then(res => setSavedList(res))
        )

    }

    const renderItems = ({ item }) => {
        return (
            <View style={styles.itemSaved}>
                <Text style={styles.textField} >{item.name} and  amount : {item.amount}</Text>

                <Pressable
                    style={styles.button}
                    onPress={() => deleteItem(item.id)}>
                    <Text style={{ fontWeight: 'bold' }} >X </Text>
                </Pressable>
            </View>
        )
    }

    return (
        <ImageBackground
            source={require('../assets/IndexBackground.jpg')}
            resizeMode='stretch'
            style={styles.imagebackground}
        >
            <View style={{ borderWidth: 1, borderColor: 'black', marginTop: 55 }} >
                <FlatList
                    data={savedList}
                    renderItem={renderItems}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    itemSaved: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
    },
    textField: {
        width: '90%',
        backgroundColor: 'white'
    },
    button: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'grey'
    },
    imagebackground: {
        height: '100%',
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center',
    },
})