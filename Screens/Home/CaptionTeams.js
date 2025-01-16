import {useState, useEffect} from 'react';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
import {useNavigation} from '@react-navigation/native';
import Api from '../Api';
import {getUserData} from '../UsersAccount/UserData';

export default function CaptionTeams() {
  const navigation = useNavigation();
  const UserData = getUserData();
  const [Teamsdata, setTeamsdata] = useState([]);
  //   const [searchQuery, setSearchQuery] = useState('');
  //   const [Sporttitle, setsporttitle] = useState('Fixtures');

  const FetchCaptionTeams = async () => {
    const id = UserData.id;
    try {
      const response = await Api.fetchCaptionTeams(id);
      if (response.status === 200) {
        const results = response.data.results || response.data; // Handle cases where results key might not exist
        const TeamsData = results.map(item => ({
          Tname: item.Tname,
          teamStatus: item.teamStatus,
          image_path: item.image_path,
          className: item.className,
          sport: item.sport,
        }));
        setTeamsdata(TeamsData);
        // if (fixtureData.length > 0) {
        //   setsporttitle(fixtureData[0].sportName);
        // }
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('No Fixtures Found.');
      } else if (error.response) {
        Alert.alert(
          'Error fetching dropdown data',
          // `Status: ${error.response.status}`,
        );
      } else {
        // console.log(error);
        Alert.alert('Network error', 'Failed to connect to server.');
      }
    }
  };

  useEffect(() => {
    fetchCaptionTeams();
  }, []);
  const handleHome = () => {
    navigation.navigate('UserHome');
  };
  // Filter fixtures based on search query
  //   const filteredFixtures = fixtures.filter(
  //     fixture =>
  //       fixture.team1name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       fixture.team2name.toLowerCase().includes(searchQuery.toLowerCase()),
  //   );
  //   const handleDetails = id => {
  //     navigation.navigate('SingleCricketDetails', {id});
  //   };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title={'Caption Teams'} handleBackPress={handleHome} />
      {/* <Searchbar
        placeholder="Search by Team name"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      /> */}
      <ScrollView contentContainerStyle={styles.content}>
        {Teamsdata.map((team, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.matchTitle2}>{team.Tname}</Text>
            <View style={styles.teamsContainer}>
              <Text style={styles.teamBox}>{team.teamStatus}</Text>
              <Text style={styles.vsText}>VS</Text>
              <Text style={styles.teamBox}>{team.className}</Text>
            </View>
            <Text style={styles.teamBox2}>{team.sport}</Text>
            {/* <Text style={styles.matchInfo}>{fix.matchDate}</Text>
            <Text style={styles.matchStatus}>{fix.venue}</Text> */}
            {/* {fix.winnerId !== null && (
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => handleDetails(fix.fixtureId)}>
                <Text style={styles.detailsButtonText}>Details</Text>
              </TouchableOpacity>
            )} */}
          </View>
        ))}
      </ScrollView>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 8,
    backgroundColor: '#EEEFF5',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  matchTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  matchTitle2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  teamBox: {
    // borderWidth: 1,
    // borderColor: '#333',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    // color: 'black',
  },
  teamBox2: {
    // borderWidth: 1,
    // borderColor: '#333',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: -5,
    // color: 'black',
  },
  vsText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  matchInfo: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  matchStatus: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: '#6200ee',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailsButton: {
    backgroundColor: '#6200ee',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
