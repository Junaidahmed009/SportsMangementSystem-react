import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  // ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Api from '../Api';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
import {launchImageLibrary} from 'react-native-image-picker';

export default function ManOfTheMatch() {
  const navigation = useNavigation();
  const route = useRoute();
  const {Fixtureid} = route.params;

  const [imageUri, setImageUri] = useState(null);
  const [serverImagePath, setServerImagePath] = useState(null);

  // State for dropdowns
  const [items1, setItems1] = useState([]);
  const [items2, setItems2] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);

  // State for teams and players
  const [team1Id, setTeam1Id] = useState(null);
  const [team1Name, setTeam1Name] = useState('');
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Id, setTeam2Id] = useState(null);
  const [team2Name, setTeam2Name] = useState('');
  const [team2Players, setTeam2Players] = useState([]);

  // State for Batsman and Bowler data
  const [team1Batsman, setTeam1Batsman] = useState([]);
  const [team1Bowlers, setTeam1Bowlers] = useState([]);
  const [team2Batsman, setTeam2Batsman] = useState([]);
  const [team2Bowlers, setTeam2Bowlers] = useState([]);

  // Format players for dropdown
  const formatPlayersForDropdown = players =>
    players.map(player => ({
      label: player.PlayerName,
      value: player.id,
    }));

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

        // Set dropdown items
        setItems1(formatPlayersForDropdown(Team1.Players));
        setItems2(formatPlayersForDropdown(Team2.Players));
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
  // ------------------------this function is used to get Scorrer and wickets of match and when data comes
  //it goes in 4 flat lists

  // Fetch Batsman and Bowler data
  const FetchBatsmanAndBowlerData = async () => {
    try {
      const response = await Api.fetchBatsmanAndBowlerData(Fixtureid);
      if (response.status === 200) {
        const data = response.data;

        // Filter data by team
        setTeam1Batsman(
          data.BatsmanData.filter(item => item.teamid === team1Id),
        );
        setTeam1Bowlers(
          data.BowlerData.filter(item => item.teamid === team1Id),
        );
        setTeam2Batsman(
          data.BatsmanData.filter(item => item.teamid === team2Id),
        );
        setTeam2Bowlers(
          data.BowlerData.filter(item => item.teamid === team2Id),
        );
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch batsman and bowler data.');
    }
  };

  useEffect(() => {
    FetchTeamsandPlayers();
  }, []);
  useEffect(() => {
    // Call the function immediately when the screen opens
    FetchBatsmanAndBowlerData();

    // Set interval to refresh data every 2 seconds
    const interval = setInterval(() => {
      FetchBatsmanAndBowlerData();
    }, 2000); // 2000 ms = 2 seconds

    // Cleanup interval when component unmounts or dependencies change
    return () => clearInterval(interval);
  }, [team1Id, team2Id]);
  // Re-fetch data when team IDs are set
  // const printdata = () => {
  //   console.log(team1Batsman, team1Bowlers, team2Batsman, team2Batsman);
  // };

  const pickImages = () => {
    if (serverImagePath) {
      Alert.alert('Error', 'Images have already been selected.');
      return;
    }
    launchImageLibrary(
      {mediaType: 'photo', quality: 2}, // Allow multiple selections,, selectionLimit: 0
      response => {
        if (response.didCancel) {
          Alert.alert('Cancelled', 'You cancelled image selection.');
        } else if (response.errorCode) {
          Alert.alert(
            'Error',
            `Image selection error: ${response.errorMessage}`,
          );
        } else if (response.assets && response.assets.length > 0) {
          const selectedImages = response.assets;
          setImageUri(selectedImages.map(image => image.uri)); // Store all selected URIs
          Alert.alert(
            'Confirm Upload',
            'Do you want to upload the selected images?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Upload',
                onPress: () => uploadImages(selectedImages), // Proceed to upload images
              },
            ],
            {cancelable: false},
          );
        }
      },
    );
  };

  const uploadImages = async images => {
    try {
      const formData = new FormData();

      images.forEach(image => {
        formData.append('files', {
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        });
      });
      // Call the Api.postimage function with the formData and headers
      const response = await Api.postCricketimages(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const serverPaths = response.data; // Assuming the backend returns an array of paths
        setServerImagePath(serverPaths); // Store all server image paths
        console.log(serverPaths);
        Alert.alert('Success', 'Images uploaded successfully!');
      } else {
        Alert.alert('Error', 'Failed to upload images to the server.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while uploading the images.');
    }
  };
  // Handle save button click
  const UserData = async () => {
    // if (!value1 || !value2) {
    //   Alert.alert('Please select any player from One Team.');
    //   return;
    // }
    if (!serverImagePath) {
      Alert.alert('Server image path is missing.');
      return;
    }
    if (!value1 && !value2) {
      Alert.alert('Please select one Man of the match from any Team.');
      return;
    }

    if (value1 && value2) {
      Alert.alert('Please select one Man of the match from any Team.');
      setValue1(null);
      setValue2(null);
      return;
    }
    let userid = value1 ? value1 : value2;

    let imagepath = Array.isArray(serverImagePath)
      ? serverImagePath[0]
      : serverImagePath || '';
    // const data = {
    //   fixture_id: Fixtureid,
    //   player_id: userid,
    //   image_path: imagepath,
    // };
    // console.log(data);
    try {
      const data = {
        fixture_id: Fixtureid,
        player_id: userid,
        image_path: imagepath,
      };
      // const data = [user1data, user2data];
      const response = await Api.PosthighScore(data);
      if (response.status === 200) {
        Alert.alert('Updated');
        navigation.navigate('StartScoring');
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Some issue on server please wait and try again');
    }
  };

  // Render item for FlatList
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.strikername || item.bowlername}</Text>
      <Text style={styles.itemText}>
        {item.myScore ? `Score: ${item.myScore}` : `Wickets: ${item.myWickets}`}
      </Text>
    </View>
  );

  return (
    <SafeAreaViewComponent style={{flex: 1}}>
      <AppBarComponent title="Top Scorers" />
      <View style={styles.dropdownRow}>
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={open1}
            value={value1}
            items={items1}
            setOpen={setOpen1}
            setValue={setValue1}
            setItems={setItems1}
            placeholder="Select Player"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
            placeholder="Select Player"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>
      </View>

      {/* these are 4 Flat lits which display Batsman and Bowler */}
      <View style={{flex: 1}}>
        {/* Team 1 Data */}
        <View style={{flex: 1}}>
          <Text style={styles.teamHeader}>{team1Name}</Text>
          <Text style={styles.sectionHeader}>Batsmen</Text>
          <FlatList
            data={team1Batsman}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList}
          />
          <Text style={styles.sectionHeader}>Bowlers</Text>
          <FlatList
            data={team1Bowlers}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList}
          />
        </View>

        {/* Team 2 Data */}
        <View style={{flex: 1}}>
          <Text style={styles.teamHeader}>{team2Name}</Text>
          <Text style={styles.sectionHeader}>Batsmen</Text>
          <FlatList
            data={team2Batsman}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList}
          />
          <Text style={styles.sectionHeader}>Bowlers</Text>
          <FlatList
            data={team2Bowlers}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList}
          />
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.saveButton} onPress={UserData}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={pickImages}>
          <Text style={styles.saveButtonText}>Pick Image</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  dropdownWrapper: {
    width: '48%', // Ensures both dropdowns fit well
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
    height: 40,
  },
  dropdownContainer: {
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
  },
  teamHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    paddingHorizontal: 8,
    color: '#6200ee',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    paddingHorizontal: 8,
    color: '#333',
  },
  flatList: {
    flex: 1, // Ensures FlatList takes up available space
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    minHeight: 35, // Consistent item height
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
    marginHorizontal: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1, // Ensures buttons take equal width
    marginHorizontal: 8, // Adds spacing between buttons
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import Api from '../Api';
// import DropDownPicker from 'react-native-dropdown-picker';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';

// export default function ManOfTheMatch() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const {Fixtureid} = route.params;

//   const [items1, setItems1] = useState([]);
//   const [items2, setItems2] = useState([]);
//   const [open1, setOpen1] = useState(false);
//   const [open2, setOpen2] = useState(false);
//   const [value1, setValue1] = useState(null);
//   const [value2, setValue2] = useState(null);

//   const [team1Id, setTeam1Id] = useState(null);
//   const [team1Name, setTeam1Name] = useState('');
//   const [team1Players, setTeam1Players] = useState([]);
//   const [team2Id, setTeam2Id] = useState(null);
//   const [team2Name, setTeam2Name] = useState('');
//   const [team2Players, setTeam2Players] = useState([]);

//   const formatPlayersForDropdown = players =>
//     players.map(player => ({
//       label: player.PlayerName,
//       value: player.id,
//     }));

//   const handleTeamSwitch = () => {
//     if (team1Players.length > 0 && team2Players.length > 0) {
//       setItems1(formatPlayersForDropdown(team1Players)); // Batsman
//       setItems2(formatPlayersForDropdown(team2Players)); // Batsman
//     }
//   };
//   useEffect(() => {
//     handleTeamSwitch();
//   }, [team1Players, team2Players]);
//   // Fetch Teams and Players
//   const FetchTeamsandPlayers = async () => {
//     try {
//       const response = await Api.fetchteamsandplayers(Fixtureid);
//       if (response.status === 200) {
//         const data = response.data;
//         const {Team1, Team2} = data;

//         setTeam1Id(Team1.TeamId);
//         setTeam1Name(Team1.TeamName);
//         setTeam1Players(Team1.Players);

//         setTeam2Id(Team2.TeamId);
//         setTeam2Name(Team2.TeamName);
//         setTeam2Players(Team2.Players);
//       } else {
//         Alert.alert('Error', `Unexpected response status: ${response.status}`);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         Alert.alert('No Teams or Players Found.');
//       } else if (error.response) {
//         Alert.alert('Error fetching data', `Status: ${error.response.status}`);
//       } else {
//         Alert.alert('Network error', 'Failed to connect to the server.');
//       }
//     }
//   };
//   useEffect(() => {
//     FetchTeamsandPlayers();
//   }, []);
//   const handlehome = () => {
//     navigation.navigate('StartScoring');
//   };

//   const UserData = async () => {
//     if (
//       !value1 ||
//       !Player1Score ||
//       !Player1balls ||
//       !value2 ||
//       !Player2Score ||
//       !Player2balls
//     ) {
//       Alert.alert('Please Fill All Fields.');
//       return; // Exit early if validation fails
//     }
//     const user1data = {
//       player_id: value1,
//       score: Player1Score,
//       ball_consumed: Player1balls,
//       fixture_id: Fixtureid,
//       team_id: team1Id,
//     };

//     const user2data = {
//       player_id: value2,
//       score: Player2Score,
//       ball_consumed: Player2balls,
//       fixture_id: Fixtureid,
//       team_id: team2Id,
//     };

//     try {
//       const data = [user1data, user2data];
//       const response = await Api.PosthighScore(data);
//       if (response.status === 200) {
//         Alert.alert('Updated.');
//         handlehome();
//       } else {
//         Alert.alert('Error', `Unexpected response status: ${response.status}`);
//       }
//     } catch (error) {
//       if (error) {
//         Alert.alert('Error', 'Some issue on server please wait and try again');
//       } else {
//         Alert.alert('Network error', 'Failed to connect to the server.');
//       }
//     }

//     console.log(user1data, user2data);
//   };

//   return (
//     <SafeAreaViewComponent>
//       <AppBarComponent
//         title={'Top Scorers'}
//         // handleBackPress={() => navigation.navigate('CricketScoring')}
//       />

//       <Text style={styles.teamText}>{team1Name}</Text>
//       <View style={styles.row}>
//         <DropDownPicker
//           open={open1}
//           value={value1}
//           items={items1}
//           setOpen={setOpen1}
//           setValue={setValue1}
//           setItems={setItems1}
//           placeholder="Team1 Players"
//           style={styles.dropdown}
//           dropDownContainerStyle={styles.dropdownContainer}
//         />
//       </View>

//       <Text style={styles.teamText}>{team2Name}</Text>
//       <View style={styles.row}>
//         <DropDownPicker
//           open={open2}
//           value={value2}
//           items={items2}
//           setOpen={setOpen2}
//           setValue={setValue2}
//           setItems={setItems2}
//           placeholder="Team2 Players"
//           style={styles.dropdown}
//           dropDownContainerStyle={styles.dropdownContainer}
//         />
//       </View>

//       {/* Button */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.actionButton} onPress={UserData}>
//           <Text style={styles.actionButtonText}>Save</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaViewComponent>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//     marginTop: 20,
//     padding: 8,
//   },
//   dropdown: {
//     // flex: 1,
//     backgroundColor: '#fafafa',
//     borderColor: '#ddd',
//     height: 40,
//     marginRight: 8, // Add spacing between dropdowns in a row
//   },
//   dropdownContainer: {
//     backgroundColor: '#fafafa',
//     borderColor: '#ddd',
//   },

//   buttonContainer: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   actionButton: {
//     backgroundColor: '#6200ee',
//     padding: 15,
//     borderRadius: 8,
//     width: '50%',
//   },
//   actionButtonText: {
//     color: 'white',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   teamText: {
//     marginTop: 10,
//     color: 'black',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });
// // input: {
//   //   flex: 1,
//   //   borderWidth: 1,
//   //   borderColor: '#ccc',
//   //   borderRadius: 8,
//   //   padding: 10,
//   //   textAlign: 'center',
//   //   marginHorizontal: 4, // Add spacing between inputs
//   // },
//   // const [Player1Score, setPlayer1Score] = useState('');
//   // const [Player2Score, setPlayer2Score] = useState('');
//   // const [Player1balls, setPlayer1balls] = useState('');
//   // const [Player2balls, setPlayer2balls] = useState('');

//   //  <View style={styles.row}>
//   //    <TextInput
//   //      style={styles.input}
//   //      placeholder="Score"
//   //      keyboardType="numeric"
//   //      value={Player1Score}
//   //      onChangeText={setPlayer1Score}
//   //    />
//   //    <TextInput
//   //      style={styles.input}
//   //      placeholder="Balls Consumed"
//   //      keyboardType="numeric"
//   //      value={Player1balls}
//   //      onChangeText={setPlayer1balls}
//   //    />
//   //  </View>;

//   //  {
//   //    /* Fourth Row */
//   //  }
//   //  <View style={styles.row}>
//   //    <TextInput
//   //      style={styles.input}
//   //      placeholder="Score"
//   //      keyboardType="numeric"
//   //      value={Player2Score}
//   //      onChangeText={setPlayer2Score}
//   //    />
//   //    <TextInput
//   //      style={styles.input}
//   //      placeholder="Balls Consumed"
//   //      keyboardType="numeric"
//   //      value={Player2balls}
//   //      onChangeText={setPlayer2balls}
//   //    />
//   //  </View>;
