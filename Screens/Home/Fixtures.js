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
import {useNavigation, useRoute} from '@react-navigation/native';
import Api from '../Api';
import {Searchbar} from 'react-native-paper';

export default function Fixtures() {
  const navigation = useNavigation();
  const route = useRoute();
  const {Sportid, value1} = route.params;
  const [fixtures, setfixtures] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [Sporttitle, setsporttitle] = useState('Fixtures');

  const FetchFixtures = async () => {
    const id = Sportid;
    const value = value1;
    try {
      // console.log(id, value);
      const response = await Api.fetchUsersfixtures(id, value);
      if (response.status === 200) {
        const results = response.data.results || response.data;
        // console.log(results);
        // Handle cases where results key might not exist
        const fixtureData = results.map(item => ({
          fixtureId: item.fixture_id,
          team1name: item.team1_name,
          team2name: item.team2_name,
          matchDate: item.matchdate,
          venue: item.venuee,
          winnerTeam: item.winner_name,
          winnerId: item.winnerId,
          matchType: item.matchType,
          sportName: item.sport_name,
          sportType: item.sport_type,
        }));
        setfixtures(fixtureData);
        if (fixtureData.length > 0) {
          setsporttitle(fixtureData[0].sportName);
        }
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      // console.log(error);
      if (error.response && error.response.status === 404) {
        Alert.alert('Not Found', 'No Matches Found.');
      } else if (error.response && error.response.status === 409) {
        Alert.alert('Not Avalibele', 'Not played in this season.');
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
    FetchFixtures();
    // console.log(fixtures);
  }, [Sportid]);
  const handleHome = () => {
    navigation.navigate('UserHome');
  };
  // Filter fixtures based on search query
  const filteredFixtures = fixtures.filter(
    fixture =>
      fixture.team1name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fixture.team2name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleDetails = (id, sport_name) => {
    if (sport_name === 'Cricket') {
      navigation.navigate('CricketMatchDetails', {id});
    } else if (sport_name === 'Football') {
      navigation.navigate('GoalBaseDetails', {id});
    } else if (
      sport_name === 'Badminton-Single' ||
      sport_name === 'Badminton-Dual' ||
      sport_name === 'Table Tennis' ||
      sport_name === 'Volleyball' ||
      sport_name === 'Badminton-Single(w)' ||
      sport_name === 'Badminton-Dual(w)' ||
      sport_name === 'Table Tennis(w)' ||
      sport_name === 'Volleyball(w)'
    ) {
      navigation.navigate('', {id});
    }
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title={Sporttitle} handleBackPress={handleHome} />
      <Searchbar
        placeholder="Search by Team name"
        placeholderTextColor="black" // Makes placeholder text black
        value={searchQuery}
        onChangeText={setSearchQuery}
        iconColor="black" // Makes the search icon black
        inputStyle={{color: 'black'}} // Makes the typed text black
        style={styles.searchBar}
      />
      <ScrollView contentContainerStyle={styles.content}>
        {filteredFixtures.map(fix => (
          <View key={fix.fixtureId} style={styles.card}>
            <Text style={styles.matchTitle2}>{fix.matchType}</Text>
            <View style={styles.teamsContainer}>
              <Text style={styles.teamBox}>{fix.team1name}</Text>
              <Text style={styles.vsText}>VS</Text>
              <Text style={styles.teamBox}>{fix.team2name}</Text>
            </View>
            <Text style={styles.teamBox2}>{fix.winnerTeam}</Text>
            <Text style={styles.matchInfo}>
              Date: {new Date(fix.matchDate).toLocaleString()}
            </Text>
            <Text style={styles.matchStatus}>{fix.venue}</Text>
            {fix.winnerId !== null && (
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => handleDetails(fix.fixtureId, fix.sportName)}>
                <Text style={styles.detailsButtonText}>Details</Text>
              </TouchableOpacity>
            )}
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
