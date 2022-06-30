import React, { useState, useMemo, useEffect } from 'react';
import { findAll, insert } from "../database/DbUtils"
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Picker, onOpen } from 'react-native-actions-sheet-picker';

import DisplayMaterial from '../components/DisplayMaterial';

import materials from '../materials/materials.json';

const MainScreen = ({ navigation }) =>  {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setData(materials);
  }, []);

  /*
   **Example filter function
   * @param {string} filter
   */
  const filteredData = useMemo(() => {
    if (data && data.length > 0) {
      return data.filter((item) =>
        item.name
          .toLocaleLowerCase('en')
          .includes(query.toLocaleLowerCase('en'))
      );
    }
  }, [data, query]);

  /*
   **Input search
   *@param {string} text
   */
  const onSearch = (text) => {
    setQuery(text);
  };

  


  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onOpen('material');
        }}
      >
        <Text>Make a choice</Text>
      </TouchableOpacity> 
      
           
      <DisplayMaterial selected={selected}
      navigation={navigation}/>

      


      
           
      <Picker
        id="material"
        data={filteredData}
        inputValue={query}
        searchable={true}
        label="Select Material"
        setSelected={setSelected}
        onSearch={onSearch}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#8B93A5',
    padding: 10,
    borderRadius: 6,
    marginTop: 50,
  },
});

export default MainScreen;