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
import {Checkbox, RadioButton} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Api from '../Api';
import {useNavigation, useRoute} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

export default function CricketScoring() {
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
    score: '',
    overs: '',
    wickets: '',
    comments: '',
  });
  const [team2Data, setteam2Data] = useState({
    score: '',
    overs: '',
    wickets: '',
    comments: '',
  });
  const [items1, setItems1] = useState([
    {label: 'Four', value: 'Four'},
    {label: 'Six', value: 'Six'},
    {label: 'Bowled', value: 'Bowled'},
    {label: 'Catch', value: 'Catch'},
    {label: 'Run Out', value: 'Run Out'},
  ]);
  const [items2, setItems2] = useState([]);
  const [items3, setItems3] = useState([]);
  const [items4, setItems4] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);

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
        setItems2(formatPlayersForDropdown(team1Players)); // Batsman
        setItems3(formatPlayersForDropdown(team2Players)); // Bowler
        setItems4(formatPlayersForDropdown(team2Players)); // Fielder
      } else if (checked === 'option2') {
        setItems2(formatPlayersForDropdown(team2Players)); // Batsman
        setItems3(formatPlayersForDropdown(team1Players)); // Bowler
        setItems4(formatPlayersForDropdown(team1Players)); // Fielder
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
  //for sending only score,wicket and runs
  const SendBackendData = async () => {
    let payload;
    if (checked === 'option1') {
      payload = {
        Teamid: team1Id,
        Score: team1Data.score,
        Over: team1Data.overs,
        Wickets: team1Data.wickets,
        FixtureId: Fixtureid,
      };
    } else if (checked === 'option2') {
      payload = {
        Teamid: team2Id,
        Score: team2Data.score,
        Over: team2Data.overs,
        Wickets: team2Data.wickets,
        FixtureId: Fixtureid,
      };
    }

    try {
      const response = await Api.PostCricketScore(payload);
      if (response.status === 200) {
        Alert.alert('Score Updated');
      } else {
        Alert.alert('Issue', 'Some issue in Score upgrdition Try again');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('Issue', 'Some issue in Score upgrdition Try again');
      } else {
        Alert.alert(
          'Updation Failed',
          'An error occurred during Score Updation. Please try again.',
        );
      }
    }
    // console.log();
    // console.log('Team 1 Data:', team1Data);
    // console.log('Team 2 Data:', team2Data);
    // console.log('Dropdown Values:', {value1, value2, value3, value4});
    // console.log('Checked Option:', checked);
  };
  //for sending only score,wicket and runs
  const SendEvents = async () => {
    let payload;
    if (checked === 'option1') {
      payload = {
        fixture_id: Fixtureid,
        event_type: value1,
        event_description: team1Data.comments,
        player_id: value2,
        secondary_player_id: value3,
        fielder_id: value4,
      };
    } else if (checked === 'option2') {
      payload = {
        fixture_id: Fixtureid,
        event_type: value1,
        event_description: team1Data.comments,
        player_id: value2,
        secondary_player_id: value3,
        fielder_id: value4,
      };
    }
    console.log(payload);
    const imgpath = `"${serverImagePath[0]}"`;
    console.log(imgpath);

    try {
      console.log(payload);
      const response = await Api.PostCricketEvents(payload, imgpath);
      console.log('2');
      if (response.status === 200) {
        Alert.alert('Events Updated');
        setValue1(null);
      } else {
        Alert.alert('Issue', 'Some issue in Score upgrdition Try again');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        Alert.alert('Issue', 'Some issue in Score upgrdition Try again');
      } else {
        Alert.alert(
          'Updation Failed',
          'An error occurred during Score Updation. Please try again.',
        );
      }
    }
    // console.log();
    // console.log('Team 1 Data:', team1Data);
    // console.log('Team 2 Data:', team2Data);
    // console.log('Dropdown Values:', {value1, value2, value3, value4});
    // console.log('Checked Option:', checked);
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
        console.log(serverPaths);
        Alert.alert('Success', 'Images uploaded successfully!');
      } else {
        Alert.alert('Error', 'Failed to upload images to the server.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while uploading the images.');
    }
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title="Scoring Cricket" />
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
          placeholder="Score"
          keyboardType="numeric"
          value={checked === 'option1' ? team1Data.score : team2Data.score}
          onChangeText={value => handleInputChange('score', value)}
        />
        <TextInput
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
        />
      </View>
      <TextInput
        style={styles.commentsInput}
        placeholder="Add Comments"
        multiline
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
            placeholder="Batsman"
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
            placeholder="Bowler"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>
        <View style={styles.drop3}>
          <DropDownPicker
            open={open4}
            value={value4}
            items={items4}
            setOpen={setOpen4}
            setValue={setValue4}
            setItems={setItems4}
            placeholder="Fielder"
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
        Press final score when both innings are ended
      </Text>
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={SendBackendData}>
          <Text style={styles.actionButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={SendEvents}>
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
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '30%',
    textAlign: 'center',
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

// // // const [score, setScore] = useState('');
// // // const [overs, setOvers] = useState('');
// // // const [wickets, setWickets] = useState('');
// // // const [comments, setComments] = useState('');
// // // const [Team2score, setTeam2Score] = useState('');
// // // const [Team2overs, setTeam2overs] = useState('');
// // // const [Team2wickets, setTeam2Wickets] = useState('');
// // // const [comments2, setcomments2] = useState('');
// // // const [TeamDropdowns, setTeamDropdowns] = useState([]);
// // // const [TeamDropdowns2, setTeamDropdowns2] = useState([]);

// // // const handleScore = value => {
// // //   checked === 'option1' ? setScore(value) : setTeam2Score(value);
// // // };
// // // const handleOvers = value => {
// // //   checked === 'option1' ? setOvers(value) : setTeam2overs(value);
// // // };
// // // const handleWickets = value => {
// // //   checked === 'option1' ? setWickets(value) : setTeam2Wickets(value);
// // // };
// // // const handleComments = value => {
// // //   checked === 'option1' ? setComments(value) : setcomments2(value);
// // // };
// // // const handleDropdowns = value => {
// // //   checked === 'option1' ? setComments(value) : setcomments2(value);
// // // };

// const [teamsData, setteamsData] = useState([
//   {
//     score: '',
//     overs: '',
//     wickets: '',
//     comments: '',
//     value1: '',
//     // event: '',
//     // batsman: '',
//     // bowler: '',
//     // fielder: '',
//   },
//   {
//     score: '',
//     overs: '',
//     wickets: '',
//     comments: '',
//     // event: '',
//     // batsman: '',
//     // bowler: '',
//     // fielder: '',
//   },
// ]);
