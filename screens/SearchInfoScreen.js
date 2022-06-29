import { Text, FlatList,View } from "react-native"
import { useState } from "react"

export default function SearchInfoScreen(selected){
  
  console.log(selected.route.params.selected.name, "--------------------")
  const [item, setItem] = useState(selected.route.params.selected)

  //funktion för att hämta namn utan bindesträck
  
  const renderItems = ({item}) => {
    return(
      <View>
      <Text>{item[0]}</Text>
      <Text>{item[1]}</Text>      
      </View>
    )
  }
  
  return (  
    <View>
    <Text>{item.name}</Text>
    <FlatList 
      data={item.value}
      renderItem={renderItems}
      keyExtractor={(item,index) => index.toString()}
    />
    <Text>Crafting time: {item.time} seconds</Text>
    </View>
  )
}