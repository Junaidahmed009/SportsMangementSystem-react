import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';

export default function ViewManagers() {
  const players = [
    {id: '1', name: 'Usama Shaikh(Cricket)'},
    {id: '2', name: 'Danial hassan(Football)'},
    {id: '3', name: 'Farooq Ahmed(Badminton(Single))'},
    {id: '4', name: 'hassan ahmed(Ludo(Dual))'},
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
        title={'Event Managers'}
        handleBackPress={() => console.log('hello')}
      />
      <View style={{alignItems: 'center', margin: 10}}>
        <Text style={styles.teamName}>Latest Session:ashes</Text>
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
