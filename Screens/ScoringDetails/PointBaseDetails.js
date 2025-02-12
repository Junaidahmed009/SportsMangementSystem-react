// import {View, Text} from 'react-native';
// import React from 'react';
// import Api from '../Api';
// import {SafeAreaViewComponent} from '../MyComponents';

// export default function PointBaseDetails() {
//   const fetchGoals = async () => {
//     try {
//       const response = await Api.fetchgoals(id);
//       if (response.status === 200) {
//         const data = response.data;
//         setFixture(data.Fixture || null);

//         if (Array.isArray(data.ScoreDetails) && data.ScoreDetails.length > 0) {
//           setScoringType(data.ScoreDetails[0].Type || '');
//           setTeamScores(data.ScoreDetails[0].Score || []);
//         }
//       } else {
//         Alert.alert('Error', `Unexpected response status: ${response.status}`);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong.');
//     }
//   };
//   useEffect(() => {
//     fetchGoals();
//   }, []);
//   return <SafeAreaViewComponent>
//     <Text></Text>
//   </SafeAreaViewComponent>;
// }
import React, {useEffect, useState} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import Api from '../Api';
import {SafeAreaViewComponent} from '../MyComponents';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function PointBaseDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;
  const [fixture, setFixture] = useState(null);
  const [scoringType, setScoringType] = useState('');
  const [teamScores, setTeamScores] = useState([]);

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

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <SafeAreaViewComponent>
      <View style={styles.container}>
        {fixture ? (
          <>
            {/* Match Details */}
            <View style={styles.card}>
              <Text style={styles.heading}>🏆 Match Details</Text>
              <Text style={styles.text}>
                {fixture.Team1Name} 🆚 {fixture.Team2Name}
              </Text>
              <Text style={styles.text}>📍 Venue: {fixture.venue}</Text>
              <Text style={styles.text}>
                🏅 Winner:{' '}
                {fixture.winner === fixture.team1_id
                  ? fixture.Team1Name
                  : fixture.Team2Name}
              </Text>
            </View>

            {/* Scoring Details */}
            <View style={styles.card}>
              <Text style={styles.heading}>📊 Scoring</Text>
              <Text style={styles.text}>Type: {scoringType}</Text>
              {teamScores.map(score => {
                const teamName =
                  score.TeamId === fixture.team1_id
                    ? fixture.Team1Name
                    : fixture.Team2Name;
                return (
                  <Text key={teamName} style={styles.scoreText}>
                    {teamName}: {score.setsWon} sets won
                  </Text>
                );
              })}
            </View>
          </>
        ) : (
          <Text style={styles.text}>Loading match details...</Text>
        )}
      </View>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'black',
    flex: 1,
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#fff',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
  scoreText: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 4,
  },
});
