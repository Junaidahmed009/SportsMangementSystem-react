import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
import Api from '../Api';

export default function TeamRequests() {
  const [Teams, setTeams] = useState([]);
  useEffect(() => {
    FetchTeams();
  }, []);
  const FetchTeams = async () => {
    try {
      const response = await Api.FetchCricketTeams();
      if (response.status === 200) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setTeams(response.data);
        } else {
          Alert.alert(
            'No Teams Found',
            'No cricket teams are available for the current session.',
          );
          setTeams([]);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        Alert.alert(
          'No Teams Found',
          'No cricket teams are available for the current session.',
        );
      } else {
        Alert.alert(
          'Network Error',
          'Failed to connect to the server. Please try again.',
        );
      }
      setTeams([]); // Set an empty array in case of an error
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.teamContainer}>
        <Text style={styles.teamName}>{item.name}</Text>
        <Text style={styles.captainText}>
          Captain: {item.username}({item.regno})
        </Text>

        {/* Button container with flexDirection: 'row' */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => console.log(`Viewing players for ${item.id}`)}>
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => console.log(`Viewing players for ${item.name}`)}>
            <Text style={styles.buttonText}>Team Details</Text>
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
        data={Teams}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  captainText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  viewButton: {
    backgroundColor: '#6200ee',
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
