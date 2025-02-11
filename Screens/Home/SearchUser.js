import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
import Api from '../Api';

export default function SearchUser() {
  const [regno, setRegno] = useState('');
  const [fixtures, setFixtures] = useState([]);
  const [userTeam, setUserTeam] = useState([]);
  const [userdata, setUserdata] = useState(null);
  const [loading, setLoading] = useState(false);

  const FetchUserdata = async () => {
    if (!regno.trim()) {
      Alert.alert('Error', 'Please enter a valid Reg No.');
      return;
    }
    setLoading(true);
    try {
      const response = await Api.fetchuserdata(regno);
      if (response.status === 200) {
        const data = response.data;
        setFixtures(data.Fixtures || []);
        setUserTeam(data.Teams || []);
        setUserdata(data.userData ? data.userData[0] : null);
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert('Error', 'Reg-no not found in student table');
        setFixtures([]);
        setUserTeam([]);
        setUserdata(null);
      } else if (error.response && error.response.status === 404) {
        Alert.alert('Info', 'User is not part of any team');
        setFixtures([]);
        setUserTeam([]);
        setUserdata(null);
      } else {
        Alert.alert('Network error', 'Failed to connect to server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search User</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Registration No"
        placeholderTextColor={'#ccc'}
        value={regno}
        onChangeText={setRegno}
      />
      <Button title="Search" onPress={FetchUserdata} disabled={loading} />

      {userdata && (
        <View style={styles.userInfo}>
          <Text style={styles.userText}>Name: {userdata.name}</Text>
          <Text style={styles.userText}>Reg No: {userdata.reg_no}</Text>
          <Text style={styles.userText}>Discipline: {userdata.discipline}</Text>
          <Text style={styles.userText}>Section: {userdata.section}</Text>
          <Text style={styles.userText}>Semester: {userdata.semNo}</Text>
        </View>
      )}

      {userTeam.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Teams</Text>
          <FlatList
            data={userTeam}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.teamCard}>
                <Text style={styles.teamText}>Team: {item.teamname}</Text>
                <Text style={styles.teamText}>
                  Has Fixtures: {item.hasFixtures ? 'Yes' : 'No'}
                </Text>
              </View>
            )}
          />
        </>
      )}

      <Text style={styles.sectionTitle}>Fixtures</Text>
      {fixtures.length > 0 ? (
        <FlatList
          data={fixtures}
          keyExtractor={item => item.fixtureid.toString()}
          renderItem={({item}) => (
            <View style={styles.fixtureCard}>
              <Text style={styles.fixtureText}>
                Match: {item.team1name} vs {item.team2name}
              </Text>
              <Text style={styles.fixtureText}>
                Date: {new Date(item.matchdate).toLocaleString()}
              </Text>
              <Text style={styles.fixtureText}>Venue: {item.venue}</Text>
              <Text style={styles.fixtureText}>Sport: {item.sportname}</Text>
              <Text style={styles.fixtureText}>Winner: {item.winnerteam}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noData}>No fixtures found</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: '#fff',
    backgroundColor: '#333',
  },
  userInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1e1e1e',
    borderRadius: 5,
  },
  userText: {
    fontSize: 16,
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#fff',
  },
  teamCard: {
    backgroundColor: '#2c2c2c',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  teamText: {
    fontSize: 14,
    color: '#fff',
  },
  fixtureCard: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  fixtureText: {
    fontSize: 14,
    color: '#fff',
  },
  noData: {
    textAlign: 'center',
    marginTop: 10,
    color: '#aaa',
  },
});
