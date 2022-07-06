import { Text, FlatList, View, StyleSheet, ImageBackground, Dimensions } from "react-native"
import React, { useState } from "react"
import materials from '../materials/materials.json'


export default function SearchInfoScreen(selected) {

  const [item, setItem] = useState(selected.route.params.selected)


  const getItems = () => {
    let newItems = []
    for (let i = 0; i < item.value.length; i++) {
      console.log(item, " amomtoetm toemteo mteom")
      newItems.push({ name: materials.filter(recipe => recipe.key_l === item.value[i][0]), amount: item.value[i][1] })

    }
    return newItems;
  }

  const renderItems = ({ item: recipe }) => {

    return (
      <View>
        <Text style={styles.text} > {recipe.amount} {recipe.name[0].name}</Text>
      </View>

    )
  }

  return (
    <View>
      <ImageBackground
        source={require('../assets/IndexBackground.jpg')}
        resizeMode='stretch'
        style={styles.imagebackground}
      >
        <View style={styles.main} >
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }} >{item.name} {"\n"} </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }} >Materials needed {"\n"} </Text>
          <View style={{ height: '30%' }} >
            <FlatList
              data={getItems()}
              renderItem={renderItems}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <Text style={styles.text}> {"\n"} Crafting time: <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>{item.time}</Text> seconds</Text>
          <Text>this is item amount = {item.amount}</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    height: '50%',
    width: 'auto',
    color: 'white',
    alignItems: 'center'
  },
  imagebackground: {
    height: '100%',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white'
  }

})