// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
// import {Checkbox, RadioButton} from 'react-native-paper';
// import DropDownPicker from 'react-native-dropdown-picker';

// export default function Football() {
//   const [score, setScore] = useState('');
//   const [overs, setOvers] = useState('');
//   const [wickets, setWickets] = useState('');
//   const [comments, setComments] = useState('');
//   const [finalScore, setFinalScore] = useState(false);
//   const [value, setValue] = useState('first');

//   const [open1, setOpen1] = useState(false);
//   const [value1, setValue1] = useState(null);
//   const [items1, setItems1] = useState([
//     {label: 'Option 1', value: '1'},
//     {label: 'Option 2', value: '2'},
//     {label: 'Option 3', value: '3'},
//   ]);

//   const [open2, setOpen2] = useState(false);
//   const [value2, setValue2] = useState(null);
//   const [items2, setItems2] = useState([
//     {label: 'Option A', value: 'A'},
//     {label: 'Option B', value: 'B'},
//     {label: 'Option C', value: 'C'},
//   ]);

//   const [open3, setOpen3] = useState(false);
//   const [value3, setValue3] = useState(null);
//   const [items3, setItems3] = useState([
//     {label: 'Red', value: 'red'},
//     {label: 'Green', value: 'green'},
//     {label: 'Blue', value: 'blue'},
//   ]);

//   return (
//     <SafeAreaViewComponent>
//       <AppBarComponent title={'Scoring Football'} />
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.matchtext}>
//           <Text style={styles.matchTitle}>Semi Final</Text>
//         </View>

//         {/* Teams */}
//         <View style={styles.teamsContainer}>
//           <TouchableOpacity style={styles.teamButton}>
//             <Text style={styles.teamText}>Test1</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.teamButton}>
//             <Text style={styles.teamText}>Test2</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.battingTitle}>40 Minute Match</Text>

//         {/* <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Score"
//             keyboardType="numeric"
//             value={score}
//             onChangeText={setScore}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Overs"
//             keyboardType="numeric"
//             value={overs}
//             onChangeText={setOvers}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Wickets"
//             keyboardType="numeric"
//             value={wickets}
//             onChangeText={setWickets}
//           />
//         </View> */}

//         {/* Comments */}
//         <TextInput
//           style={styles.commentsInput}
//           placeholder="Add Comments"
//           multiline
//           value={comments}
//           onChangeText={setComments}
//         />
//         {/* Dropdown Row */}
//         <View style={styles.row}>
//           <View style={styles.drop1}>
//             <DropDownPicker
//               open={open1}
//               value={value1}
//               items={items1}
//               setOpen={setOpen1}
//               setValue={setValue1}
//               setItems={setItems1}
//               placeholder="Event"
//               style={styles.dropdown}
//               dropDownContainerStyle={styles.dropdownContainer}
//             />
//           </View>
//           <View style={styles.drop2}>
//             <DropDownPicker
//               open={open2}
//               value={value2}
//               items={items2}
//               setOpen={setOpen2}
//               setValue={setValue2}
//               setItems={setItems2}
//               placeholder="Hit By"
//               style={styles.dropdown}
//               dropDownContainerStyle={styles.dropdownContainer}
//             />
//           </View>
//           <View style={styles.drop3}>
//             <DropDownPicker
//               open={open3}
//               value={value3}
//               items={items3}
//               setOpen={setOpen3}
//               setValue={setValue3}
//               setItems={setItems3}
//               placeholder="Defended"
//               style={styles.dropdown}
//               dropDownContainerStyle={styles.dropdownContainer}
//             />
//           </View>
//         </View>
//         {/* Final Score Checkbox */}
//         <View style={styles.finalScoreContainer}>
//           <Checkbox
//             status={finalScore ? 'checked' : 'unchecked'}
//             onPress={() => setFinalScore(!finalScore)}
//           />
//           <Text style={styles.finalScoreText}>Final Score</Text>
//         </View>

//         <Text style={styles.warningText}>
//           Press final score when both innings are ended
//         </Text>

//         {/* Action Buttons */}
//         <View style={styles.actionButtonsContainer}>
//           <TouchableOpacity style={styles.actionButton}>
//             <Text style={styles.actionButtonText}>Save</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.actionButton}>
//             <Text style={styles.actionButtonText}>End Match</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaViewComponent>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // alignItems: 'center',
//     padding: 20,
//   },
//   matchTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginVertical: 10,
//     color: 'black',
//   },
//   matchtext: {
//     alignItems: 'center',
//     margin: 10,
//   },
//   teamsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//   },
//   teamButton: {
//     backgroundColor: '#6200ee',
//     padding: 15,
//     borderRadius: 8,
//     flex: 1,
//     margin: 5,
//   },
//   teamText: {
//     color: 'white',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   battingTitle: {
//     fontSize: 18,
//     color: 'black',
//     fontWeight: '600',
//     marginVertical: 10,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 10,
//     width: '30%',
//     textAlign: 'center',
//   },
//   commentsInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 10,
//     width: '100%',
//     height: 100,
//     marginVertical: 10,
//     textAlignVertical: 'top',
//   },
//   addImageButton: {
//     backgroundColor: '#6200ee',
//     padding: 10,
//     borderRadius: 8,
//     marginVertical: 10,
//   },
//   imageButton: {
//     alignItems: 'center',
//     marginTop: 30,
//   },
//   addImageText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   finalScoreContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   finalScoreText: {
//     marginLeft: 8,
//     fontSize: 16,
//     color: 'black',
//   },
//   warningText: {
//     color: 'red',
//     marginVertical: 5,
//     fontSize: 12,
//   },
//   actionButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: 10,
//   },
//   actionButton: {
//     backgroundColor: '#6200ee',
//     padding: 15,
//     borderRadius: 8,
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   actionButtonText: {
//     color: 'white',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between', // Ensures equal spacing between the dropdowns
//     alignItems: 'center', // Vertically centers the dropdowns
//     marginVertical: 10, // Adds some spacing above and below the row
//   },
//   drop1: {
//     flex: 1, // Makes the first dropdown take equal space
//     marginHorizontal: 5, // Adds horizontal spacing between dropdowns
//   },
//   drop2: {
//     flex: 1, // Makes the second dropdown take equal space
//     marginHorizontal: 5,
//   },
//   drop3: {
//     flex: 1, // Makes the third dropdown take equal space
//     marginHorizontal: 5,
//   },
//   dropdown: {
//     backgroundColor: '#fafafa',
//     borderColor: '#ddd',
//     height: 40, // Adjust height as needed
//   },
//   dropdownContainer: {
//     backgroundColor: '#fafafa',
//     borderColor: '#ddd',
//   },
// });
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
import {RadioButton} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Api from '../Api';
import {useNavigation, useRoute} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

export default function FootballScoring() {
  const navigation = useNavigation();
  const route = useRoute();
  const {Fixtureid} = route.params;

  const [imageUri, setImageUri] = useState(null);
  const [serverImagePath, setServerImagePath] = useState(null);

  const [checked, setChecked] = useState('option1');
  const [team1Id, setTeam1Id] = useState(null);
  const [team1Name, setTeam1Name] = useState('');
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Id, setTeam2Id] = useState(null);
  const [team2Name, setTeam2Name] = useState('');
  const [team2Players, setTeam2Players] = useState([]);
  const [team1Data, setteam1Data] = useState({
    Goals: '',
  });
  const [team2Data, setteam2Data] = useState({
    Goals: '',
  });
  const [items1, setItems1] = useState([
    {label: 'Goal', value: 'Goal'},
    {label: 'Foul', value: 'Foul'},
    {label: 'Save', value: 'Save'},
    {label: 'Plenty', value: 'Plenty'},
  ]);
  const [items2, setItems2] = useState([]);
  const [items3, setItems3] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const handlehome = () => {
    navigation.navigate('StartScoring');
  };
  // Fetch Teams and Players
  // const FetchGoals = async () => {
  //   try {
  //     const response = await Api.fetchgoals(Fixtureid);
  //     if (response.status === 200) {
  //       const data = response.data;
  //       console.log(data);
  //       const team1Goals =
  //         data.find(item => item.team_id === team1Id)?.goals || 0;
  //       const team2Goals =
  //         data.find(item => item.team_id === team2Id)?.goals || 0;

  //       if (checked === 'option1') {
  //         setteam1Data(prevData => ({...prevData, Goals: team1Goals}));
  //       } else if (checked === 'option2') {
  //         setteam2Data(prevData => ({...prevData, Goals: team2Goals}));
  //       }
  //     } else {
  //       Alert.alert('Error', `Unexpected response status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       setteam1Data(prevData => ({...prevData, Goals: 0}));
  //       setteam2Data(prevData => ({...prevData, Goals: 0}));
  //     } else if (error.response) {
  //       Alert.alert('Error fetching data', `Status: ${error.response.status}`);
  //     } else {
  //       Alert.alert('Error', 'No Teams Selected.');
  //     }
  //   }
  // };
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
        Alert.alert('Error', 'No Teams Selected.');
        handlehome();
      }
    }
  };
  useEffect(() => {
    FetchTeamsandPlayers();
    // FetchGoals();
  }, []);

  // Format Players for Dropdown
  const formatPlayersForDropdown = players =>
    players.map(player => ({
      label: player.PlayerName,
      value: player.id,
    }));

  // Update Dropdown Items Based on Selection
  const handleTeamSwitch = () => {
    if (team1Players.length > 0 && team2Players.length > 0) {
      if (checked === 'option1') {
        setItems2(formatPlayersForDropdown(team1Players)); // Striker
        setItems3(formatPlayersForDropdown(team2Players)); // Assist
      } else if (checked === 'option2') {
        setItems2(formatPlayersForDropdown(team2Players)); // Striker
        setItems3(formatPlayersForDropdown(team1Players)); // Assist
      }
    }
  };

  useEffect(() => {
    handleTeamSwitch();
  }, [checked, team1Players, team2Players]);

  // Handle Input Changes for score,wickets,runs,comments
  const handleInputChange = (field, value) => {
    if (checked === 'option1') {
      setteam1Data(prevData => ({...prevData, [field]: value}));
    } else if (checked === 'option2') {
      setteam2Data(prevData => ({...prevData, [field]: value}));
    }
  };
  const SendBackendData = async () => {
    let payload = {
      Teamid: checked === 'option1' ? team1Id : team2Id,
      Goals: checked === 'option1' ? team1Data.Goals : team2Data.Goals,
      Fixture_id: Fixtureid,
    };
    // console.log(payload);
    // Validate required fields for sending events
    const isEventValid = value1 || value2 || value3;

    const imgpath =
      serverImagePath && serverImagePath.length > 0
        ? `"${serverImagePath[0]}"`
        : null;

    if (isEventValid && !imgpath) {
      Alert.alert('Please select an image before submitting events.');
      return; // Exit if validation fails
    }
    if (isEventValid) {
      await SendEvents(imgpath); // Pass imgpath to SendEvents
    }

    try {
      const response = await Api.PostFootballScore(payload);
      if (response.status === 200) {
        Alert.alert('Score Updated');
      } else {
        Alert.alert('Issue', 'Some issue in Score updation. Try again.');
      }
    } catch (error) {
      // console.error('Score update error:', error);
      Alert.alert(
        'Updation Failed',
        'An error occurred during Score Updation. Please try again.',
      );
    }
  };

  //for sending only score,wicket and runs
  const SendEvents = async imgpath => {
    if (!imgpath) {
      Alert.alert('Please select an image before submitting events.');
      return; // Exit if no image is selected
    }

    // Create payload
    const payload = {
      fixture_id: Fixtureid,
      event_type: value1,
      event_description: team1Data.comments,
      player_id: value2 || null,
      secondary_player_id: value3 || null,
    };

    // console.log(payload);

    try {
      const response = await Api.PostCricketEvents(payload, imgpath);
      if (response.status === 200) {
        // Alert.alert('Event Saved Successfully');
        // Reset state
        setValue1(null);
        setValue2(null);
        setValue3(null);
        // setValue4(null);
        setServerImagePath(''); // Clear image path
      } else {
        Alert.alert('Issue', 'Some issue occurred. Try again.');
      }
    } catch (error) {
      // console.error('Event update error:', error);
      Alert.alert(
        'Updation Failed',
        'An error occurred during Event Updation. Please try again.',
      );
    }
  };

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
        // console.log(serverPaths);
        Alert.alert('Success', 'Images uploaded successfully!');
      } else {
        Alert.alert('Error', 'Failed to upload images to the server.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while uploading the images.');
    }
  };

  const EndMatch = async () => {
    try {
      const response = await Api.EndFootballMatch(Fixtureid);
      if (response.status === 200) {
        Alert.alert('Winner Updated.');
        handlehome();
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('Error', 'Scores for one or both teams not found.');
      } else if (error.response && error.response.status === 409) {
        Alert.alert('Error', 'Scores Are Level Please Update');
      } else {
        Alert.alert('Network error', 'Failed to connect to the server.');
      }
    }
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title="Football Scoring" />
      <View style={styles.matchtext}>
        <Text style={styles.matchTitle}>League Match</Text>
      </View>
      <View style={styles.teamsContainer}>
        <View style={styles.radioItem}>
          <RadioButton
            value="option1"
            status={checked === 'option1' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('option1')}
          />
          <Text style={styles.teamText}>{team1Name}</Text>
        </View>
        <View style={styles.radioItem}>
          <RadioButton
            value="option2"
            status={checked === 'option2' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('option2')}
          />
          <Text style={styles.teamText}>{team2Name}</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Goals"
          placeholderTextColor="#666666"
          keyboardType="numeric"
          value={checked === 'option1' ? team1Data.Goals : team2Data.Goals}
          onChangeText={value => handleInputChange('Goals', value)}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Overs"
          keyboardType="numeric"
          value={checked === 'option1' ? team1Data.overs : team2Data.overs}
          onChangeText={value => handleInputChange('overs', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Wickets"
          keyboardType="numeric"
          value={checked === 'option1' ? team1Data.wickets : team2Data.wickets}
          onChangeText={value => handleInputChange('wickets', value)}
        /> */}
      </View>
      <TextInput
        style={styles.commentsInput}
        placeholder="Add Comments"
        multiline
        placeholderTextColor="#666666"
        value={checked === 'option1' ? team1Data.comments : team2Data.comments}
        onChangeText={value => handleInputChange('comments', value)}
      />
      <View style={styles.drop1}>
        <DropDownPicker
          open={open1}
          value={value1}
          items={items1}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems1}
          placeholder="Event"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.drop2}>
          <DropDownPicker
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
            placeholder="Striker"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>
        <View style={styles.drop3}>
          <DropDownPicker
            open={open3}
            value={value3}
            items={items3}
            setOpen={setOpen3}
            setValue={setValue3}
            setItems={setItems3}
            placeholder="Assist"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>
      </View>
      <View style={styles.finalScoreContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={pickImages}>
          <Text style={styles.actionButtonText}>Pick Image</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.warningText}>
        Press final score when both inninsdfwewerwegs are ended
      </Text>
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={SendBackendData}>
          <Text style={styles.actionButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={EndMatch}>
          <Text style={styles.actionButtonText}>End Match</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    padding: 20,
  },
  matchTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'black',
  },
  matchtext: {
    alignItems: 'center',
    margin: 10,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  teamButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    margin: 5,
  },
  teamText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  battingTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
    marginVertical: 10,
  },
  inputContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    // width: '100%',
    padding: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '50%',
    textAlign: 'center',
    color: 'black',
  },
  commentsInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    height: 100,
    marginVertical: 10,
    textAlignVertical: 'top',
    color: 'black',
  },
  addImageButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  imageButton: {
    alignItems: 'center',
    marginTop: 30,
  },
  addImageText: {
    color: 'white',
    fontWeight: 'bold',
  },
  finalScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 20,
  },
  // finalScoreText: {
  //   marginLeft: 8,
  //   fontSize: 16,
  //   color: 'black',
  // },
  warningText: {
    color: 'red',
    marginVertical: 5,
    fontSize: 12,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensures equal spacing between the dropdowns
    alignItems: 'center', // Vertically centers the dropdowns
    marginVertical: 10, // Adds some spacing above and below the row
  },
  drop1: {
    zIndex: 10000, // Higher zIndex for the first dropdown
    marginBottom: 10,
    // flex: 1, // Makes the first dropdown take equal space
    marginHorizontal: 7, // Adds horizontal spacing between dropdowns
  },
  drop2: {
    flex: 1, // Makes the second dropdown take equal space
    marginHorizontal: 5,
  },
  drop3: {
    flex: 1, // Makes the third dropdown take equal space
    marginHorizontal: 5,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
    height: 40, // Adjust height as needed
  },
  dropdownContainer: {
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
  },
});
