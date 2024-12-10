import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
import Api from '../Api';

export default function Players() {
  const [players, setplayers] = useState([]);
  const navigation = useNavigation(); // Not needed here unless used for other actions
  const route = useRoute();
  const {Teamid} = route.params; // Extract Teamid from route.params
  const handleteamrequests = () => {
    navigation.navigate('TeamRequests');
  };
  const fetchplayers = async () => {
    try {
      const response = await Api.FetchTeamsPlayers(Teamid);
      if (response.status === 200) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setplayers(response.data);
        } else {
          Alert.alert('Alert', 'No Players Found for Team.');
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        Alert.alert('Alert', 'No Players Found for Team.');
      } else {
        Alert.alert(
          'Network Error',
          'Failed to connect to the server. Please try again.',
        );
      }
      setTeams([]); // Set an empty array in case of an error
    }
  };
  useEffect(() => {
    fetchplayers();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.names}({item.reg_no})
      </Text>
    </View>
  );

  return (
    <SafeAreaViewComponent>
      <AppBarComponent
        title={'Team Details'}
        handleBackPress={handleteamrequests}
      />
      {/* <View style={{alignItems: 'center', margin: 10}}>
        <Text style={styles.teamName}>Shaheens</Text>
      </View> */}
      <FlatList
        data={players}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Players Screen</Text>
        <Text style={{fontSize: 16, marginTop: 10}}>Team ID: {Teamid}</Text>
      </View> */}
    </SafeAreaViewComponent>
  );
}
const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#f0faff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 5,
    marginVertical: 5,
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
  teamName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
});

// import {View, Text, FlatList, StyleSheet} from 'react-native';
// import React from 'react';
// import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';

// export default function Players() {
//   const players = [
//     {id: '1', name: 'Ali Zahid(2022-ARID-3915)(C)'},
//     {id: '2', name: 'Awais Ahmed(2022-ARID-3916)'},
//     {id: '3', name: 'Ali Raza(2022-ARID-3930)'},
//     {id: '4', name: 'Ali Raza khan(2022-ARID-3932)'},
//     {id: '5', name: 'Ahmed Ali(2022-ARID-3937)'},
//     {id: '6', name: 'Farooq chohan(2022-ARID-3940)'},
//     {id: '7', name: 'Hassan Ali(2022-ARID-3941)'},
//     {id: '8', name: 'Usama Shaikh(2022-ARID-3942)'},
//     {id: '9', name: 'Qasmin(2022-ARID-3947)'},
//     {id: '10', name: 'Zahid Ahmed(2022-ARID-3950)'},
//   ];

//   const renderItem = ({item}) => (
//     <View style={styles.itemContainer}>
//       <Text style={styles.itemText}>
//         {item.id}. {item.name}
//       </Text>
//     </View>
//   );

//   return (
//     <SafeAreaViewComponent>
//       <AppBarComponent
//         title={'Players'}
//         handleBackPress={() => console.log('hello')}
//       />
//       <View style={{alignItems: 'center', margin: 10}}>
//         <Text style={styles.teamName}>Shaheens</Text>
//       </View>
//       <FlatList
//         data={players}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={styles.listContainer}
//       />
//     </SafeAreaViewComponent>
//   );
// }

//
