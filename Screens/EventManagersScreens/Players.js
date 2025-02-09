import {View, Text, StyleSheet, FlatList, Alert, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  SafeAreaViewComponent,
  AppBarComponent,
  BASE_URL,
} from '../MyComponents';
import Api from '../Api';

export default function Players() {
  const [players, setplayers] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const {Teamid, image_path} = route.params;
  const handleteamrequests = () => {
    navigation.navigate('TeamRequests');
  };
  const fetchplayers = async () => {
    try {
      const response = await Api.FetchTeamsPlayers(Teamid);
      if (response.status === 200) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setplayers(response.data);
          // console.log(`${BASE_URL}${image_path}`);
        } else {
          Alert.alert('Alert', 'No Players Found for Team.');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('Alert', 'No Players Found for Team.');
      } else {
        Alert.alert(
          'Network Error',
          'Failed to connect to the server. Please try again.',
        );
      }
      setTeams([]);
    }
  };
  useEffect(() => {
    fetchplayers();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.names} ({item.reg_no})
      </Text>
    </View>
  );

  return (
    <SafeAreaViewComponent>
      <AppBarComponent
        title={'Team Details'}
        handleBackPress={handleteamrequests}
      />
      <View style={styles.teamImageContainer}>
        <Text style={styles.cardText}>Team Logo</Text>
        <Image
          source={{uri: `${BASE_URL}${image_path}`}}
          style={styles.teamImage}
        />
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardText2}>Team Members</Text>
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
  cardText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardText2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
  },
  cardTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef5ff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  teamImageContainer: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    marginBottom: 20,
  },
  teamImage: {
    width: '85%',
    height: 220,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  listContainer: {
    padding: 12,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginVertical: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  teamName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#111',
  },
});
