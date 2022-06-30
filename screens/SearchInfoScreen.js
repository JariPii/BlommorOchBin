import { Text, FlatList,View, StyleSheet } from "react-native"
import React, { useState } from "react"
import materials from '../materials/materials.json'


export default function SearchInfoScreen(selected){
  
  console.log(selected.route.params.selected.name, "--------------------")
  const [item, setItem] = useState(selected.route.params.selected)

  //funktion för att hämta namn utan bindesträck
  

 

  const getItems = () => {
    let newItems = []
    for(let i = 0; i < item.value.length; i++){      
        newItems.push({name: materials.filter(recipe => recipe.key_l === item.value[i][0]), amount: item.value[i][1]})
                  
    }      
    return newItems;
  }

  const renderItems = ({item: recipe}) => {
    console.log(recipe, " this should nb namer")
    
    
    return(
      <View>        
      <Text> {recipe.amount} {recipe.name[0].name}</Text>
      </View>
    )
  }
  
  return (  
    <View>
      <View  >
        <Text >{item.name} {"\n"} </Text>
      </View>
    <Text style={{ fontWeight: 'bold', fontSize: 18 }} >Materials needed {"\n"} </Text>
    <FlatList 
      data={getItems()}
      renderItem={renderItems}
      keyExtractor={(item,index) => index.toString()}
    />
    <Text> {"\n"} Crafting time: {item.time} seconds</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1, 
    alignContent: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    height: "25%"
  },
})