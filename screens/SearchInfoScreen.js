import React, { useState, useMemo, useEffect } from 'react';

import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Picker, onOpen } from 'react-native-actions-sheet-picker';

import DisplayMaterial from '../components/DisplayMaterial';


import materials from '../materials/materials.json';

export default function SearchInfoScreen() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState();
  const [query, setQuery] = useState('');

  const handleSetSelected = (item) => {setSelected(item)}

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

  /* displayMaterial körs innan selected har värde, fixa din jävel
   */
  const onSearch = (text) => {
    setQuery(text);
  };


  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onOpen('country');
        }}
      >
        <Text>Open ActionSheet</Text>
      </TouchableOpacity>
      <DisplayMaterial selected={selected}/>
      <Text style={{ padding: 10 }}>Chosen : {JSON.stringify(selected)}</Text>
      <Picker
        id="material"
        data={filteredData}
        inputValue={query}
        searchable={true}
        label="Select Material"
        setSelected={handleSetSelected}
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