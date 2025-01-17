import {useState, useEffect} from 'react';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
import {useNavigation} from '@react-navigation/native';
import Api from '../Api';
import {getUserData} from '../UsersAccount/UserData';

export default function StartScoring() {
  const navigation = useNavigation();
  const userData = getUserData();
  const [fixtures, setfixtures] = useState([]);

  const FetchFixtures = async () => {
    const id = userData.id;
    try {
      const response = await Api.fetchManagerfixtures(id);
      if (response.status === 200) {
        const results = response.data.results || response.data; // Handle cases where results key might not exist
        const fixtureData = results.map(item => ({
          fixtureId: item.fixture_id,
          team1name: item.team1_name,
          team2name: item.team2_name,
          matchDate: item.matchdate,
          venue: item.venuee,
          winnerTeam: item.winner_name,
          matchType: item.matchType,
          sportName: item.sport_name,
          sportType: item.sport_type,
        }));
        setfixtures(fixtureData);
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
    FetchFixtures();
  }, []);

  // const handleStartbutton = () => {
  //   if(fixtures.winnerTeam==='Match Not Started'){
  //      handleCricketScoring(fix.fixtureId)
  //   }else{
  //     display button=not
  //   }
  // };
  const handleHome = () => {
    navigation.navigate('CricketManagerhome');
  };
  const handleCricketScoring = (Fixtureid, sportName) => {
    if (sportName === 'Cricket') {
      navigation.navigate('CricketScoring', {Fixtureid});
    } else if (sportName === 'Football') {
      navigation.navigate('FootballScoring', {Fixtureid});
    }
  };
  // const printdata = id => {
  //   console.log(id);
  // };
  return (
    <SafeAreaViewComponent>
      <AppBarComponent title={'Fixtures'} handleBackPress={handleHome} />
      <ScrollView contentContainerStyle={styles.content}>
        {fixtures.map((fix, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.matchTitle2}>{fix.matchType}</Text>
            <View style={styles.teamsContainer}>
              <Text style={styles.teamBox}>{fix.team1name}</Text>
              <Text style={styles.vsText}>VS</Text>
              <Text style={styles.teamBox}>{fix.team2name}</Text>
            </View>
            <Text style={styles.teamBox2}>{fix.winnerTeam}</Text>
            <Text style={styles.matchInfo}>{fix.matchDate}</Text>
            <Text style={styles.matchStatus}>{fix.venue}</Text>
            {fix.winnerTeam === 'Match Not Started' && (
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() =>
                  handleCricketScoring(fix.fixtureId, fix.sportName)
                }>
                <Text style={styles.detailsButtonText}>Start Match</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
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
});
