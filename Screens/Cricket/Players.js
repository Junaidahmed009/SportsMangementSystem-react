import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';

export default function Players() {
  const players = [
    {id: '1', name: 'Ali Zahid(2022-ARID-3915)(C)'},
    {id: '2', name: 'Awais Ahmed(2022-ARID-3916)'},
    {id: '3', name: 'Ali Raza(2022-ARID-3930)'},
    {id: '4', name: 'Ali Raza khan(2022-ARID-3932)'},
    {id: '5', name: 'Ahmed Ali(2022-ARID-3937)'},
    {id: '6', name: 'Farooq chohan(2022-ARID-3940)'},
    {id: '7', name: 'Hassan Ali(2022-ARID-3941)'},
    {id: '8', name: 'Usama Shaikh(2022-ARID-3942)'},
    {id: '9', name: 'Qasmin(2022-ARID-3947)'},
    {id: '10', name: 'Zahid Ahmed(2022-ARID-3950)'},
  ];

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.id}. {item.name}
      </Text>
    </View>
  );

  return (
    <SafeAreaViewComponent>
      <AppBarComponent
        title={'Players'}
        handleBackPress={() => console.log('hello')}
      />
      <View style={{alignItems: 'center', margin: 10}}>
        <Text style={styles.teamName}>Shaheens</Text>
      </View>
      <FlatList
        data={players}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 5,
    marginVertical: 5,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  teamName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
});
