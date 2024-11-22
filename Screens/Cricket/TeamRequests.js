import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';

export default function TeamRequests() {
  const teams = [
    {id: '1', name: 'Fighters', captain: '2021-ARID-0181'},
    {id: '2', name: 'United', captain: '2021-ARID-0194'},
    {id: '3', name: 'PindiBoys', captain: '2020-ARID-3756'},
    {id: '4', name: 'Shaheens', captain: '2020-ARID-3724'},
    {id: '5', name: 'Warriors', captain: '2021-ARID-0223'},
    {id: '6', name: 'Titans', captain: '2020-ARID-0182'},
  ];

  const renderItem = ({item}) => {
    return (
      <View style={styles.teamContainer}>
        <Text style={styles.teamName}>{item.name}</Text>
        <Text style={styles.captainText}>Captain: {item.captain}</Text>

        {/* Button container with flexDirection: 'row' */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => console.log(`Viewing players for ${item.name}`)}>
            <Text style={styles.buttonText}>View Players</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => console.log(`Viewing players for ${item.name}`)}>
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent
        title={'Team Requests'}
        handleBackPress={() => console.log('hello')}
      />
      <FlatList
        data={teams}
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
  teamContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  captainText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  viewButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1, // Optional to make buttons take equal width
    marginRight: 5, // Optional to space out the buttons
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
