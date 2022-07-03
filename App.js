import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchInfoScreen from './screens/SearchInfoScreen';
import MainScreen from './screens/MainScreen';
import SavedList from './screens/SavedList';
import { useEffect } from 'react';
import { getTableInfo, initDB } from './database/DbUtils';
import React from 'react';



export default function App() {

  

  useEffect(() => {
    initDB()
      .then(res => {
        console.log("result from init", res)
        return getTableInfo()
      })
      .then(res => console.log("pragma table_info", res))
      .catch(err => console.log(err))
  }, [])

    
  const NativeStack = createNativeStackNavigator();
  


  return(

    
    <NavigationContainer>
      <NativeStack.Navigator>
      <NativeStack.Screen
          name="Satisfactory"
          component={MainScreen}
        />
        <NativeStack.Screen
          name="Item info"
          component={SearchInfoScreen}
        />
        <NativeStack.Screen
          name="List"
          component={SavedList}
        />
      </NativeStack.Navigator>
    </NavigationContainer>


  )



  

}

