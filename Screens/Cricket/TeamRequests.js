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
import {useNavigation} from '@react-navigation/native';

export default function TeamRequests() {
  const navigation = useNavigation();
  const [Teams, setTeams] = useState([]);

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
  useEffect(() => {
    FetchTeams();
  }, []);
  const updateStatus = async id => {
    try {
      // console.log('Updating status for ID:', id);
      const response = await Api.TeamStatusUpdate(id);

      if (response.status === 200) {
        Alert.alert('Success', 'Team status updated successfully');
      } else {
        Alert.alert(
          'Error',
          'Some technical issue occurred. Please try again.',
        );
      }
    } catch (error) {
      console.log('Error:', error);

      if (error.response) {
        // Handle specific HTTP error responses
        if (error.response.status === 404) {
          console.log('404 Response:', error.response.data);
          Alert.alert('Error', 'Team not found');
        } else if (error.response.status === 409) {
          Alert.alert('Error', 'Team already approved. Refresh the page.');
        } else {
          Alert.alert(
            'Error',
            `Request failed with status ${error.response.status}`,
          );
        }
      } else {
        // Handle network or unknown errors
        Alert.alert(
          'Network Error',
          'Failed to connect to the server. Please try again.',
        );
      }
    }
  };

  const handleplayers = Teamid => {
    navigation.navigate('Players', {Teamid});
  };
  const handleHome = () => {
    navigation.navigate('CricketManagerhome');
  };
  const renderItem = ({item}) => {
    const handleTeamDetails = () => {
      const Teamid = item.id;
      handleplayers(Teamid);
    };
    const handleStatusApprove = () => {
      if (!item.teamStatus) {
        Alert.alert(
          'Confirmation',
          `Are you sure you want to approve ${item.name} Team?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK', onPress: () => updateStatus(item.id)},
          ],
          {cancelable: false},
        );
      }
    };

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
            onPress={handleStatusApprove}
            disabled={item.teamStatus}>
            <Text style={styles.buttonText}>
              {item.teamStatus ? 'Approved' : 'Approve'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewButton}
            onPress={handleTeamDetails}>
            <Text style={styles.buttonText}>Team Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title={'Team Requests'} handleBackPress={handleHome} />
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
