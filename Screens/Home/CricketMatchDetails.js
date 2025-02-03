import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Api from '../Api';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';

export default function CricketMatchDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;

  const [Team1batsmanscore, setTeam1batsmanscore] = useState([]);
  const [Team2batsmanscore, setTeam2batsmanscore] = useState([]);
  const [Team1bowlerstats, setTeam1bowlerstats] = useState([]);
  const [Team2bowlerstats, setTeam2bowlerstats] = useState([]);
  const [Team1Totalscore, setTeam1Totalscore] = useState([]);
  const [Team2Totalscore, setTeam2Totalscore] = useState([]);
  // const [Team2Score, setTeam2Score] = useState([]);

  const FetchMatchDetails = async () => {
    const fixtureid = id;
    try {
      const response = await Api.fetchcricketDetails(fixtureid);
      if (response.status === 200) {
        const data = response.data;

        setTeam1batsmanscore(data.PlayersScore.team1Score || []);
        setTeam2batsmanscore(data.PlayersScore.team2Score || []);
        setTeam1Totalscore(data.RunwithExtra.team1Total || []);
        setTeam2Totalscore(data.RunwithExtra.team2Total || []);
        setTeam1bowlerstats(data.bowlingStats.team1Stats || []);
        setTeam2bowlerstats(data.bowlingStats.team2Stats || []);
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      // console.log(error);
      // Handle errors during the fetch operation
      if (error.response && error.response.status === 404) {
        Alert.alert('No Fixture or Score Found.');
      } else {
        Alert.alert('Error', 'Something went wrong.');
      }
    }
  };

  useEffect(() => {
    FetchMatchDetails();
  }, []);
  // const printdata = () => {
  //   // console.log('1', Team1batsmanscore);
  //   // console.log('2', Team2batsmanscore);
  //   console.log('3', Team1Totalscore);
  //   console.log('4', Team2Totalscore);
  //   // console.log('5', Team1bowlerstats);
  //   // console.log('6', Team2bowlerstats);
  // };
  // so team1score and team2score are arrays so we fetch data in objects from array to use in textboxes easily
  const team1scoreobj =
    Team1Totalscore && Team1Totalscore.length > 0 ? Team1Totalscore[0] : {};
  const team2scoreobj =
    Team2Totalscore && Team2Totalscore.length > 0 ? Team2Totalscore[0] : {};
  //card For Total Score
  const renderScoreCard = () => (
    <View style={styles.scoreCard}>
      <View style={styles.teamCard}>
        <Text style={styles.teamCardName}>
          {team1scoreobj.teamName || 'Team 1'}
        </Text>
        <Text style={styles.teamCardScore}>
          {team1scoreobj.run !== undefined ? team1scoreobj.run : '-'}
        </Text>
      </View>
      <View style={styles.vsContainer}>
        <Text style={styles.vsText}>VS</Text>
      </View>
      <View style={styles.teamCard}>
        <Text style={styles.teamCardName}>
          {team2scoreobj.teamName || 'Team 2'}
        </Text>
        <Text style={styles.teamCardScore}>
          {team2scoreobj.run !== undefined ? team2scoreobj.run : '-'}
        </Text>
      </View>
    </View>
  );

  const renderBatsmanItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.Batsman || item.player_name}</Text>
      <Text style={styles.itemDetails}>
        Score: {item.runs !== null && item.runs !== undefined ? item.runs : '-'}
      </Text>
    </View>
  );

  // Render item for bowlers FlatList
  const renderBowlerItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.player_name}</Text>
      <Text style={styles.itemDetails}>
        Overs: {item.overs} | Runs: {item.runs_conceeded} | Wkts:{' '}
        {item.wickets_taken}
      </Text>
    </View>
  );

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title={'Cricket Details'} />
      {/* <Button onPress={printdata} title="hello"></Button> */}

      {/* Score Card */}
      {renderScoreCard()}

      {/* Batsmen Section */}
      <Text style={styles.sectionHeader}>Batsmen</Text>
      <View style={styles.row}>
        {/* Team 1 Batsmen */}
        <View style={styles.teamContainer}>
          <Text style={styles.teamHeader}>
            {team1scoreobj.teamName || 'Team 1'}
          </Text>
          <FlatList
            data={Team1batsmanscore}
            renderItem={renderBatsmanItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList}
          />
        </View>
        {/* Team 2 Batsmen */}
        <View style={styles.teamContainer}>
          <Text style={styles.teamHeader}>
            {team2scoreobj.teamName || 'Team 2'}
          </Text>
          <FlatList
            data={Team2batsmanscore}
            renderItem={renderBatsmanItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList}
          />
        </View>
      </View>

      {/* Bowlers Section */}
      <Text style={styles.sectionHeader}>Bowlers</Text>
      <View style={styles.row}>
        {/* Team 1 Bowlers */}
        <View style={styles.teamContainer}>
          <Text style={styles.teamHeader}>
            {team1scoreobj.teamName || 'Team 1'}
          </Text>
          <FlatList
            data={Team1bowlerstats}
            renderItem={renderBowlerItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList}
          />
        </View>
        {/* Team 2 Bowlers */}
        <View style={styles.teamContainer}>
          <Text style={styles.teamHeader}>
            {team2scoreobj.teamName || 'Team 2'}
          </Text>
          <FlatList
            data={Team2bowlerstats}
            renderItem={renderBowlerItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList}
          />
        </View>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          {/* //onPress={onPress} */}
          <Text style={styles.buttonText}>Balls Details</Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </SafeAreaViewComponent>
  );
}
const styles = StyleSheet.create({
  scoreCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    margin: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center', // Centers the content horizontally
    // Shadow for Android
    elevation: 5,
  },
  teamCard: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center', // Centers the text inside each team card
  },
  teamCardName: {
    fontSize: 16, // Slightly smaller text
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
  },
  teamCardScore: {
    fontSize: 20, // Slightly smaller score text
    fontWeight: 'bold',
    color: '#000',
  },
  vsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  vsText: {
    fontSize: 18, // Smaller VS text
    fontWeight: 'bold',
    color: '#888',
  },
  container: {
    // flex: 1, // Fill the screen (or parent container)
    marginTop: 20,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  button: {
    backgroundColor: '#6200ee', // Blue background color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    // Shadow for Android
    elevation: 3,
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // container: {
  //   flex: 1,
  //   padding: 8,
  // },
  // Score card at the top showing team names and total scores
  // scoreCard: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   backgroundColor: '#e0e0e0',
  //   padding: 12,
  //   borderRadius: 8,
  //   marginBottom: 12,
  // },
  // teamCard: {
  //   flex: 1,
  //   alignItems: 'center',
  // },
  // teamCardName: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   color: '#4A90E2',
  // },
  // teamCardScore: {
  //   fontSize: 16,
  //   marginTop: 4,
  //   color: '#FF5733',
  // },
  // vsContainer: {
  //   paddingHorizontal: 8,
  // },
  // vsText: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: '#000',
  // },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    paddingHorizontal: 8,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  teamHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    color: '#6200ee',
  },
  flatList: {
    maxHeight: 200, // adjust this height as needed
  },
  itemContainer: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    // Ensure the text wraps if it's too long
    flexWrap: 'wrap',
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    // Allow text wrapping for the details as well
    flexWrap: 'wrap',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});
