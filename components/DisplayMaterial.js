import { render } from "react-dom"
import { Text, View, FlatList } from "react-native"

export default function DisplayMaterial({ selected }) {
    const renderItems = ({ item: material }) => {
        return (
            <View>
                <Text>{material[0]}</Text>
            </View>
        )
    }

    if (selected)


        return (
            <View>
                <Text>{selected.name}</Text>
                <FlatList
                    data={selected.value}
                    renderItem={renderItems}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    return (
        <Text>Choose a material</Text>
    )
}