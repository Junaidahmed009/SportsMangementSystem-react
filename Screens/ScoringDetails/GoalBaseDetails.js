import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  SafeAreaViewComponent,
  AppBarComponent,
  BASE_URL,
} from '../MyComponents';
import Api from '../Api';

export default function GoalBaseDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;

  const [Fixture, setFixture] = useState(null);
  const [scoringType, setScoringType] = useState('');
  const [teamScores, setTeamScores] = useState([]);
  const [Events, setEvents] = useState([]);

  // // Clean the image path by removing extra quotes if needed.
  const cleanImagePath = path => {
    if (!path) return '';
    return path.replace(/"/g, '');
  };
  //fetch Dta which contains a large amount of arrays and objects.
  const fetchGoals = async () => {
    try {
      const response = await Api.fetchgoals(id);
      if (response.status === 200) {
        const data = response.data;
        setFixture(data.Fixture || null);

        if (Array.isArray(data.ScoreDetails) && data.ScoreDetails.length > 0) {
          setScoringType(data.ScoreDetails[0].Type || '');
          setTeamScores(data.ScoreDetails[0].Score || []);
        }
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await Api.fetchEvents(id);
      if (response.status === 200) {
        setEvents(response.data || []);
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  useEffect(() => {
    fetchGoals();
    fetchEvents();
  }, []);

  return (
    <SafeAreaViewComponent>
      <AppBarComponent
        title={scoringType}
        onBackPress={() => navigation.goBack()}
      />

      {/* Fixture / Match Details */}
      {/* {Fixture && (
        <View style={styles.fixtureCard}>
          <Text style={styles.matchTitle}>
            {Fixture.Team1Name} vs {Fixture.Team2Name}
          </Text>
          <Text style={styles.matchDetails}>Venue: {Fixture.venue}</Text>
          <Text style={styles.matchDetails}>
            Date: {new Date(Fixture.matchDate).toLocaleString()}
          </Text>
          <Text style={styles.matchDetails}>
            Winner:{' '}
            {Fixture.winner === Fixture.team1_id
              ? Fixture.Team1Name
              : Fixture.Team2Name}
          </Text>
        </View>
      )} */}

      {/* Goals Review Section */}
      <View style={styles.goalsReviewContainer}>
        <Text style={styles.sectionTitle}>Goals</Text>
        <View style={styles.goalsReviewCard}>
          {teamScores.map((score, index) => {
            // Determine team name from fixture details
            const teamName =
              Fixture && score.TeamId === Fixture.team1_id
                ? Fixture.Team1Name
                : Fixture && score.TeamId === Fixture.team2_id
                ? Fixture.Team2Name
                : 'Unknown Team';

            return (
              <View key={index} style={styles.teamScoreContainer}>
                {/* Replace the source with your team image if available */}
                {/* <Image
                  style={styles.teamLogo}
                  source={BASE_URL}
                /> */}
                <View style={styles.teamInfo}>
                  <Text style={styles.teamName}>{teamName}</Text>
                  <Text style={styles.teamGoals}>{score.goals}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Scoring Type Display
      <View style={styles.scoringTypeContainer}>
        <Text style={styles.scoringTypeText}>Scoring Type: {scoringType}</Text>
      </View> */}

      {/* Events List */}
      <Text style={styles.sectionTitle}>Match Events</Text>
      <FlatList
        data={Events}
        keyExtractor={item => item.event_id.toString()}
        renderItem={({item}) => (
          <View style={styles.eventCard}>
            <Image
              style={styles.eventImage}
              source={{uri: `${BASE_URL}${cleanImagePath(item.image_path)}`}}
              image_path
              resizeMode="cover"
            />
            <View style={styles.eventContent}>
              <Text style={styles.eventType}>{item.event_type}</Text>
              <Text style={styles.eventDetails}>
                Player: {item.player_name}
              </Text>
              {item.secondary_player_name && (
                <Text style={styles.eventDetails}>
                  Assisted by: {item.secondary_player_name}
                </Text>
              )}
              <Text style={styles.eventDetails}>
                Time: {new Date(item.event_time).toLocaleString()}
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.eventsList}
      />
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  fixtureCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  matchTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  matchDetails: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  goalsReviewContainer: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  goalsReviewCard: {
    backgroundColor: '#f1f8ff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 3,
  },
  teamScoreContainer: {
    alignItems: 'center',
    width: '45%',
  },
  teamLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  teamInfo: {
    alignItems: 'center',
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  teamGoals: {
    fontSize: 30,
    color: '#007bff',
  },
  scoringTypeContainer: {
    marginHorizontal: 10,
    marginTop: 15,
    padding: 10,
    backgroundColor: '#e9f7ef',
    borderRadius: 8,
  },
  scoringTypeText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2e7d32',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 10,
    color: '#444',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
    overflow: 'hidden',
  },
  eventImage: {
    width: 100,
    height: 100,
  },
  eventContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  eventType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  eventsList: {
    paddingBottom: 20,
  },
});
