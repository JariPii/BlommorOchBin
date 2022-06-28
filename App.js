import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchInfoScreen from './screens/SearchInfoScreen';
import MainScreen from './screens/MainScreen';
import SavedList from './screens/SavedList';
import { useEffect } from 'react';
import { getTableInfo, initDB } from './database/DbUtils';



export default function App() {

  const NativeStack = createNativeStackNavigator()

  useEffect(() => {
    initDB()
      .then(res => {
        console.log("result from init", res)
        return getTableInfo()
      })
      .then(res => console.log("pragma table_info", res))
      .catch(err => console.log(err))
  }, [])

    

  

  return(
    <NavigationContainer>
      <NativeStack.Navigator>
      <NativeStack.Screen
          name="Main"
          component={MainScreen}
        />
        <NativeStack.Screen
          name="Search"
          component={SearchInfoScreen}
        />
        <NativeStack.Screen
          name="SavedList"
          component={SavedList}
        />
      </NativeStack.Navigator>
    </NavigationContainer>
  )
}