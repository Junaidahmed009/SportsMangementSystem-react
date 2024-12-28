import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
import Api from '../Api';

export default function Players() {
  const [players, setplayers] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const {Teamid} = route.params;
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
