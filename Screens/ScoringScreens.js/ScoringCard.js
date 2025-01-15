import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Api from '../Api';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';

export default function ScoringCard() {
  const navigation = useNavigation();
  const route = useRoute();
  const {Fixtureid} = route.params;

  const [Player1Score, setPlayer1Score] = useState('');
  const [Player2Score, setPlayer2Score] = useState('');
  const [Player1balls, setPlayer1balls] = useState('');
  const [Player2balls, setPlayer2balls] = useState('');

  const [items1, setItems1] = useState([]);
  const [items2, setItems2] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);

  const [team1Id, setTeam1Id] = useState(null);
  const [team1Name, setTeam1Name] = useState('');
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Id, setTeam2Id] = useState(null);
  const [team2Name, setTeam2Name] = useState('');
  const [team2Players, setTeam2Players] = useState([]);

  const formatPlayersForDropdown = players =>
    players.map(player => ({
      label: player.PlayerName,
      value: player.id,
    }));

  const handleTeamSwitch = () => {
    if (team1Players.length > 0 && team2Players.length > 0) {
      setItems1(formatPlayersForDropdown(team1Players)); // Batsman
      setItems2(formatPlayersForDropdown(team2Players)); // Batsman
    }
  };
  useEffect(() => {
    handleTeamSwitch();
  }, [team1Players, team2Players]);
  // Fetch Teams and Players
  const FetchTeamsandPlayers = async () => {
    try {
      const response = await Api.fetchteamsandplayers(Fixtureid);
      if (response.status === 200) {
        const data = response.data;
        const {Team1, Team2} = data;

        setTeam1Id(Team1.TeamId);
        setTeam1Name(Team1.TeamName);
        setTeam1Players(Team1.Players);

        setTeam2Id(Team2.TeamId);
        setTeam2Name(Team2.TeamName);
        setTeam2Players(Team2.Players);
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('No Teams or Players Found.');
      } else if (error.response) {
        Alert.alert('Error fetching data', `Status: ${error.response.status}`);
      } else {
        Alert.alert('Network error', 'Failed to connect to the server.');
      }
    }
  };
  useEffect(() => {
    FetchTeamsandPlayers();
  }, []);
  const handlehome = () => {
    navigation.navigate('StartScoring');
  };

  const UserData = async () => {
    if (
      !value1 ||
      !Player1Score ||
      !Player1balls ||
      !value2 ||
      !Player2Score ||
      !Player2balls
    ) {
      Alert.alert('Please Fill All Fields.');
      return; // Exit early if validation fails
    }
    const user1data = {
      player_id: value1,
      score: Player1Score,
      ball_consumed: Player1balls,
      fixture_id: Fixtureid,
      team_id: team1Id,
    };

    const user2data = {
      player_id: value2,
      score: Player2Score,
      ball_consumed: Player2balls,
      fixture_id: Fixtureid,
      team_id: team2Id,
    };

    try {
      const data = [user1data, user2data];
      const response = await Api.PosthighScore(data);
      if (response.status === 200) {
        Alert.alert('Updated.');
        handlehome();
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error) {
        Alert.alert('Error', 'Some issue on server please wait and try again');
      } else {
        Alert.alert('Network error', 'Failed to connect to the server.');
      }
    }

    console.log(user1data, user2data);
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent
        title={'Top Scorers'}
        // handleBackPress={() => navigation.navigate('CricketScoring')}
      />

      <Text style={styles.teamText}>{team1Name}</Text>
      <View style={styles.row}>
        <DropDownPicker
          open={open1}
          value={value1}
          items={items1}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems1}
          placeholder="Team1 Players"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      {/* Second Row */}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Score"
          keyboardType="numeric"
          value={Player1Score}
          onChangeText={setPlayer1Score}
        />
        <TextInput
          style={styles.input}
          placeholder="Balls Consumed"
          keyboardType="numeric"
          value={Player1balls}
          onChangeText={setPlayer1balls}
        />
      </View>

      <Text style={styles.teamText}>{team2Name}</Text>
      <View style={styles.row}>
        <DropDownPicker
          open={open2}
          value={value2}
          items={items2}
          setOpen={setOpen2}
          setValue={setValue2}
          setItems={setItems2}
          placeholder="Team2 Players"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      {/* Fourth Row */}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Score"
          keyboardType="numeric"
          value={Player2Score}
          onChangeText={setPlayer2Score}
        />
        <TextInput
          style={styles.input}
          placeholder="Balls Consumed"
          keyboardType="numeric"
          value={Player2balls}
          onChangeText={setPlayer2balls}
        />
      </View>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={UserData}>
          <Text style={styles.actionButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 20,
    padding: 8,
  },
  dropdown: {
    // flex: 1,
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
    height: 40,
    marginRight: 8, // Add spacing between dropdowns in a row
  },
  dropdownContainer: {
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    textAlign: 'center',
    marginHorizontal: 4, // Add spacing between inputs
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    width: '50%',
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  teamText: {
    marginTop: 10,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
