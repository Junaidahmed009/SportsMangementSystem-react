import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import Api from '../Api';

export default function UserScoreSearch() {
  const navigation = useNavigation();
  const route = useRoute();
  const {value1} = route.params;
  const [regno, setRegno] = useState('');
  const [fixtures, setFixtures] = useState([]);
  const [cricketRuns, setCricketRuns] = useState(null);
  const [cricketWickets, setCricketWickets] = useState(null);
  const [totalCricketMatches, setTotalCricketMatches] = useState(null);
  const [totalFootballMatches, setFootballMatches] = useState(null);
  const [footballGoals, setFootballGoals] = useState(null);

  const FetchUserdata = async () => {
    if (!regno.trim()) {
      Alert.alert('Error', 'Please enter a valid Reg No.');
      return;
    }
    try {
      const response = await Api.fetchuserScore(regno, value1);
      if (response.status === 200) {
        const data = response.data;
        setFixtures(data.results || []);
        setCricketRuns(data.Crickettotalruns || 0);
        setCricketWickets(data.Crickettotalwickets || 0);
        setTotalCricketMatches(data.totalCricketMatches || 0);
        setFootballMatches(data.totalFootballMatches || 0);
        setFootballGoals(data.FootballGoals || 0);
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        Alert.alert('Error', 'Reg-no not found in student table');
      } else if (error.response?.status === 404) {
        Alert.alert('Info', 'User is not part of any team');
        setFixtures([]);
        setCricketRuns(0);
        setCricketWickets(0);
        setTotalCricketMatches(0);
        setFootballMatches(0);
        setFootballGoals(0);
      } else {
        Alert.alert('Network error', 'Failed to connect to server.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Input Box */}
      <TextInput
        style={styles.input}
        placeholder="Enter Registration No"
        placeholderTextColor={'#aaa'}
        value={regno}
        onChangeText={setRegno}
      />
      <Button title="Search" onPress={FetchUserdata} color="#007bff" />

      {/* Display Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statTitle}>Cricket Stats:</Text>
        <Text style={styles.stat}>🏏 Total Runs: {cricketRuns}</Text>
        <Text style={styles.stat}>🎯 Total Wickets: {cricketWickets}</Text>
        <Text style={styles.stat}>🕹 Matches Played: {totalCricketMatches}</Text>

        <Text style={styles.statTitle}>Football Stats:</Text>
        <Text style={styles.stat}>
          ⚽ Matches Played: {totalFootballMatches}
        </Text>
        <Text style={styles.stat}>🥅 Goals Scored: {footballGoals}</Text>
      </View>

      {/* Fixtures List */}
      <Text style={styles.heading}>Match Fixtures</Text>
      <FlatList
        data={fixtures}
        keyExtractor={item => item.Fixtureid.toString()}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.fixtureTitle}>
              {item.Team1Name} 🆚 {item.Team2Name}
            </Text>
            <Text style={styles.fixtureDetail}>🏟 Sport: {item.SportName}</Text>
            <Text style={styles.fixtureDetail}>
              🏏 Runs: {item.totalRuns} | Wickets: {item.totalWickets} | Goals:{' '}
              {item.totalGoals}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    padding: 12,
    borderRadius: 5,
    color: '#fff',
    backgroundColor: '#222',
    marginBottom: 10,
  },
  statsContainer: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  statTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f8f8f8',
    marginBottom: 5,
  },
  stat: {
    fontSize: 16,
    color: '#ddd',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8f8f8',
    marginBottom: 10,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  fixtureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f8f8f8',
  },
  fixtureDetail: {
    fontSize: 14,
    color: '#aaa',
  },
});
