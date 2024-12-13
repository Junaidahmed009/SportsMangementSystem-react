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
import {getUserData} from '../UsersAccount/UserData';

export default function EditFixtures() {
  const userData = getUserData();
  const navigation = useNavigation();
  const [Fixtures, setFixtures] = useState([]);

  const FetchFixtures = async () => {
    try {
      const userid = userData.id;
      console.log(userid);
      const response = await Api.fetchfixtures(userid);
      if (response.status === 200) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setFixtures(response.data);
        } else {
          Alert.alert(
            'No Fixtures Found',
            'No cricket Fixtures are available for the current session.',
          );
          setFixtures([]);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        Alert.alert(
          'No Latest Sessions Found',
          'No cricket Fixtures are available for the current session.',
        );
      } else {
        Alert.alert(
          'Network Error',
          'Failed to connect to the server. Please try again.',
        );
      }
      setFixtures([]);
    }
  };
  useEffect(() => {
    FetchFixtures();
  }, []);

  const handleHome = () => {
    navigation.navigate('CricketManagerhome');
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.teamContainer}>
        <View style={styles.matchtype}>
          <Text style={styles.teamName}>{item.match_type}</Text>
        </View>
        <Text style={styles.captainText}>Venue: {item.venue}</Text>
        <Text style={styles.captainText}>MatchDate: {item.matchDate}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.viewButton}
            // onPress={handleStatusApprove}
          >
            <Text style={styles.buttonText}>Select Teams</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.SelectedteamsView}>
          <Text style={styles.Selectedteamstext}>
            Selected Teams: {item.matchDate}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title={'EDit Fixtures'} handleBackPress={handleHome} />
      <FlatList
        data={Fixtures}
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  matchtype: {
    marginBottom: 5,
    // marginTop: 10,
    alignItems: 'center',
  },

  captainText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  Selectedteamstext: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  SelectedteamsView: {
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  viewButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// const handleTeamDetails = () => {
//   const Teamid = item.id;
//   handleplayers(Teamid);
// };
// const handleStatusApprove = () => {
//   if (!item.teamStatus) {
//     Alert.alert(
//       'Confirmation',
//       `Are you sure you want to approve ${item.name} Team?`,
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {text: 'OK', onPress: () => updateStatus(item.id)},
//       ],
//       {cancelable: false},
//     );
//   }
// };

//---------------
// const updateStatus = async id => {
//   try {
//     const response = await Api.TeamStatusUpdate(id);

//     if (response.status === 200) {
//       Alert.alert('Success', 'Team status updated successfully');
//     } else {
//       Alert.alert(
//         'Error',
//         'Some technical issue occurred. Please try again.',
//       );
//     }
//   } catch (error) {
//     if (error.response) {
//       if (error.response.status === 404) {
//         Alert.alert('Error', 'Team not found');
//       } else if (error.response.status === 409) {
//         Alert.alert('Error', 'Team already approved. Refresh the page.');
//       } else {
//         Alert.alert(
//           'Error',
//           `Request failed with status ${error.response.status}`,
//         );
//       }
//     } else {
//       Alert.alert(
//         'Network Error',
//         'Failed to connect to the server. Please try again.',
//       );
//     }
//   }
// };
