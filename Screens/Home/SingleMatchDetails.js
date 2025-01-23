import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Api from '../Api';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';

export default function SingleCricketDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;

  const [fixtureDetails, setFixtureDetails] = useState([]);
  const [MatchType, setMatchType] = useState(null);
  const [Team1Score, setTeam1Score] = useState([]);
  const [Team2Score, setTeam2Score] = useState([]);

  // const FetchFixturesAndScores = async () => {
  //   const fixtureid = id;
  //   try {
  //     const response = await Api.fetchFixturesAndScores(fixtureid);
  //     if (response.status === 200) {
  //       const data = response.data;
  //       const fixtureDetails = data.map(fixture => ({
  //         FixtureId: fixture.FixtureId,
  //         MatchDate: fixture.MatchDate,
  //         Venue: fixture.Venue,
  //         Team1Id: fixture.Team1Id,
  //         Team2Id: fixture.Team2Id,
  //         Team1Name: fixture.Team1Name,
  //         Team2Name: fixture.Team2Name,
  //       }));
  //       setFixtureDetails(fixtureDetails);

  //       // Extract the match type
  //       const matchType = data[1].Type;
  //       setMatchType(matchType); // Save match type in state

  //       // Extract team scores
  //       // const scores = data[1].Score;

  //       // const team1Score = scores.find(
  //       //   score => score.TeamId === fixtureDetails[0].Team1Id,
  //       // );
  //       // const team2Score = scores.find(
  //       //   score => score.TeamId === fixtureDetails[0].Team2Id,
  //       // );

  //       // if (team1Score) {
  //       //   const team1data = [
  //       //     {
  //       //       score: team1Score.score,
  //       //       overs: team1Score.overs,
  //       //       wickets: team1Score.wickets,
  //       //     },
  //       //   ];
  //       //   setTeam1Score(team1data);
  //       // }

  //       // if (team2Score) {
  //       //   const team2data = {
  //       //     score: team2Score.score,
  //       //     overs: team2Score.overs,
  //       //     wickets: team2Score.wickets,
  //       //   };
  //       //   setTeam2Score(team2data);
  //       // }
  //     } else {
  //       Alert.alert('Error', `Unexpected response status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     // Handle errors during the fetch operation
  //     if (error.response && error.response.status === 404) {
  //       Alert.alert('No Fixture or Score Found.');
  //     } else if (error.response) {
  //       Alert.alert('Error fetching data', `Status: ${error.response.status}`);
  //     } else {
  //       Alert.alert('Error', 'Something went wrong.');
  //     }
  //   }
  // };

  // useEffect(() => {
  //   FetchFixturesAndScores();
  // }, []);

  const FetchFixturesAndScores = async () => {
    const fixtureid = id;
    try {
      const response = await Api.fetchFixturesAndScores(fixtureid);
      if (response.status === 200) {
        const data = response.data;

        // Update fixture details
        const fixtureDetails = data.map(fixture => ({
          FixtureId: fixture.FixtureId,
          MatchDate: fixture.MatchDate,
          Venue: fixture.Venue,
          Team1Id: fixture.Team1Id,
          Team2Id: fixture.Team2Id,
          Team1Name: fixture.Team1Name,
          Team2Name: fixture.Team2Name,
        }));
        setFixtureDetails(fixtureDetails);

        // Save match type in state
        const matchType = data[1]?.Type;
        setMatchType(matchType);
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        Alert.alert('No Fixture or Score Found.');
      } else if (error.response) {
        Alert.alert('Error fetching data', `Status: ${error.response.status}`);
      } else {
        Alert.alert('Error', 'Something went wrong.');
      }
    }
  };

  useEffect(() => {
    FetchFixturesAndScores();
  }, []);

  // Derive scores when fixture details are available
  useEffect(() => {
    if (fixtureDetails.length > 0) {
      // const scores = data[1]?.Score;
      const team1Score = scores.find(
        score => score.TeamId === fixtureDetails[0].Team1Id,
      );
      const team2Score = scores.find(
        score => score.TeamId === fixtureDetails[0].Team2Id,
      );

      if (team1Score) {
        setTeam1Score([
          {
            score: team1Score.score,
            overs: team1Score.overs,
            wickets: team1Score.wickets,
          },
        ]);
      }

      if (team2Score) {
        setTeam2Score({
          score: team2Score.score,
          overs: team2Score.overs,
          wickets: team2Score.wickets,
        });
      }
    }
  }, [fixtureDetails]);

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title={'BIIT Sports'} />
      {/* handleBackPress={handlelogin} */}
      <ScrollView contentContainerStyle={styles.content}>
        {fixtureDetails.map(fix => (
          <View key={fix.FixtureId} style={styles.card}>
            <Text style={styles.matchTitle}>{`Match Venue: ${fix.Venue}`}</Text>

            {/* Team 1 */}
            <View style={styles.teamContainer}>
              <Text style={styles.teamBox}>{fix.Team1Name}</Text>
              {Array.isArray(Team1Score) && Team1Score.length > 0 ? (
                Team1Score.map(score => (
                  <View key={score.id || Math.random()} style={styles.scoreBox}>
                    <Text style={styles.scoreText}>
                      Score: {score.score || '-'}
                    </Text>
                    <Text style={styles.scoreText}>
                      Overs: {score.overs || '-'}
                    </Text>
                    <Text style={styles.scoreText}>
                      Wickets: {score.wickets || '0'}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noDataText}>No Data</Text>
              )}
            </View>

            <Text style={styles.vsText}>VS</Text>

            {/* Team 2 */}
            <View style={styles.teamContainer}>
              <Text style={styles.teamBox}>{fix.Team2Name}</Text>
              {Team2Score ? (
                <View style={styles.scoreBox}>
                  <Text style={styles.scoreText}>
                    Score: {Team2Score.score || '-'}
                  </Text>
                  <Text style={styles.scoreText}>
                    Overs: {Team2Score.overs || '-'}
                  </Text>
                  <Text style={styles.scoreText}>
                    Wickets: {Team2Score.wickets || '0'}
                  </Text>
                </View>
              ) : (
                <Text style={styles.noDataText}>No Data</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaViewComponent>
  );
}
const styles = StyleSheet.create({
  content: {
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  teamContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 8,
  },
  teamBox: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6',
    textAlign: 'center',
    marginBottom: 8,
  },
  scoreBox: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    width: '80%',
    alignItems: 'center',
    marginTop: 8,
  },
  scoreText: {
    fontSize: 14,
    color: '#374151',
  },
  noDataText: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
    marginTop: 8,
  },
  vsText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#d97706',
    textAlign: 'center',
    marginVertical: 8,
  },
});

// if (Array.isArray(matchType)) {
//   console.log('This is an array.');
// } else {
//   console.log('no');
// }
// if (
//   typeof variable === 'object' &&
//   !Array.isArray(MatchType) &&
//   variable !== null
// ) {
//   console.log('This is an object.');
// } else {
//   console.log('no');
// }
