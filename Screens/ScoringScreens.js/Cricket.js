import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
// import ButtonComponent from './ButtonComponent'; // Replace with your custom ButtonComponent
import {ButtonComponent} from '../MyComponents';
import Api from '../Api';

const StartScoring = () => {
  const [imageUri, setImageUri] = useState(null); // To store selected image URI
  const [uploadedImagePath, setUploadedImagePath] = useState(null); // To store the uploaded image path

  // Function to pick an image from the gallery
  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.error('Image Picker Error: ', response.error);
        Alert.alert('Error', 'Something went wrong while picking the image.');
      } else if (response.assets) {
        const selectedImage = response.assets[0];
        setImageUri(selectedImage.uri);
        uploadImageToServer(selectedImage); // Upload the selected image
      }
    });
  };

  // Function to upload the selected image to the backend
  const uploadImageToServer = async image => {
    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      name: image.fileName || 'image.jpg',
      type: image.type || 'image/jpeg',
    });

    try {
      const response = await Api.PostImage(formData);
      if (response.status === 200) {
        console.log('Image uploaded successfully:', data);
        setUploadedImagePath(data[0]); // Use the first image path from the response
        Alert.alert('Success', 'Image uploaded successfully!');
      } else {
        console.error('Upload failed:', data);
        Alert.alert('Error', 'Image upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'An error occurred while uploading the image.');
    }
  };

  return (
    <View style={styles.container}>
      <ButtonComponent
        buttonTitle="Pick Image"
        onPress={pickImage}
        CustomStyle={{
          width: '50%',
        }}
      />

      {imageUri && (
        <View style={styles.card}>
          <Image source={{uri: imageUri}} style={styles.image} />
          <Text style={styles.cardText}>Selected Image</Text>
        </View>
      )}

      {uploadedImagePath && (
        <View style={styles.card}>
          <Image
            source={{uri: `http://<your-backend-url>${uploadedImagePath}`}}
            style={styles.image}
          />
          <Text style={styles.cardText}>Uploaded Image</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default StartScoring;

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

// export default function Cricket() {
//   const [teamsData, setteamsData] = useState([
//     {
//       score: '',
//       overs: '',
//       wickets: '',
//       comments: '',
//       event: '',
//       batsman: '',
//       bowler: '',
//       fielder: '',
//     },
//     {
//       score: '',
//       overs: '',
//       wickets: '',
//       comments: '',
//       event: '',
//       batsman: '',
//       bowler: '',
//       fielder: '',
//     },
//   ]);
//   const handleInputChange = (field, value) => {
//     const teamindex = checked === 'option1' ? 0 : 1;
//     const updateTeamsData = [...teamsData];
//     updateTeamsData[teamindex][field] = value;
//     console.log(`Updated field: ${field}, Value: ${value}`);

//     setteamsData(updateTeamsData);
//   };

//   const printdata = () => {
//     console.log(teamsData);
//   };

//   const [finalScore, setFinalScore] = useState(false);
//   const [checked, setChecked] = useState('option1'); // State for selected radio button

//   const [open1, setOpen1] = useState(false); //Event
//   // const [value1, setValue1] = useState(null);
//   const [items1, setItems1] = useState([
//     {label: 'Four', value: '1'},
//     {label: 'Six', value: '2'},
//     {label: 'Bowled', value: '3'},
//     {label: 'Catch', value: '4'},
//     {label: 'Run Out', value: '5'},
//   ]);

//   const [open2, setOpen2] = useState(false); //Batsman
//   // const [value2, setValue2] = useState(null);
//   const [items2, setItems2] = useState([
//     {label: 'Option A', value: 'A'},
//     {label: 'Option B', value: 'B'},
//     {label: 'Option C', value: 'C'},
//   ]);

//   const [open3, setOpen3] = useState(false);
//   // const [value3, setValue3] = useState(null); //Bowler
//   const [items3, setItems3] = useState([
//     {label: 'Red', value: '1'},
//     {label: 'Green', value: '2'},
//     {label: 'Blue', value: '3'},
//   ]);
//   const [open4, setOpen4] = useState(false);
//   // const [value4, setValue4] = useState(null); //Bowler
//   const [items4, setItems4] = useState([
//     {label: 'Red', value: 'Red'},
//     {label: 'Green', value: '2'},
//     {label: 'Blue', value: '3'},
//   ]);

//   return (
//     <SafeAreaViewComponent>
//       <AppBarComponent title={'Scoring Cricket'} />
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.matchtext}>
//           <Text style={styles.matchTitle}>League Match</Text>
//         </View>
//         <View style={styles.teamsContainer}>
//           <View style={styles.radioItem}>
//             <RadioButton
//               value="option1"
//               status={checked === 'option1' ? 'checked' : 'unchecked'}
//               onPress={() => setChecked('option1')}
//             />
//             <Text style={styles.teamText}>Shaheens</Text>
//           </View>

//           <View style={styles.radioItem}>
//             <RadioButton
//               value="option2"
//               status={checked === 'option2' ? 'checked' : 'unchecked'}
//               onPress={() => setChecked('option2')}
//             />
//             <Text style={styles.teamText}>Gladiators</Text>
//           </View>
//         </View>
//         <Text style={styles.battingTitle}>Shaheens - Batting</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Score"
//             keyboardType="numeric"
//             value={
//               checked === 'option1' ? teamsData[0].score : teamsData[1].score
//             }
//             onChangeText={value => handleInputChange('score', value)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Overs"
//             keyboardType="numeric"
//             value={
//               checked === 'option1' ? teamsData[0].overs : teamsData[1].overs
//             }
//             onChangeText={value => handleInputChange('overs', value)}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Wickets"
//             keyboardType="numeric"
//             value={
//               checked === 'option1'
//                 ? teamsData[0].wickets
//                 : teamsData[1].wickets
//             }
//             onChangeText={value => handleInputChange('wickets', value)}
//           />
//         </View>
//         {/* Comments */}
//         <TextInput
//           style={styles.commentsInput}
//           placeholder="Add Comments"
//           multiline
//           value={
//             checked === 'option1'
//               ? teamsData[0].comments
//               : teamsData[1].comments
//           }
//           onChangeText={value => handleInputChange('comments', value)}
//         />
//         {/* Dropdown Row */}
//         <View style={styles.drop1}>
//           <DropDownPicker
//             open={open1}
//             value={
//               checked === 'option1' ? teamsData[0].event : teamsData[1].event
//             }
//             items={items1}
//             setOpen={setOpen1}
//             setValue={value => handleInputChange('event', value)}
//             setItems={setItems1}
//             placeholder="Event"
//             style={styles.dropdown}
//             dropDownContainerStyle={styles.dropdownContainer}
//             listMode="SCROLLVIEW" // Ensures it uses a ScrollView instead of FlatList
//             nestedScrollEnabled // Enables nested scrolling
//           />
//         </View>
//         <View style={styles.row}>
//           <View style={styles.drop2}>
//             <DropDownPicker
//               open={open2}
//               value={
//                 checked === 'option1'
//                   ? teamsData[0].batsman
//                   : teamsData[1].batsman
//               }
//               items={items2}
//               setOpen={setOpen2}
//               setValue={value => handleInputChange('batsman', value)}
//               setItems={setItems2}
//               placeholder="Batsman"
//               style={styles.dropdown}
//               dropDownContainerStyle={styles.dropdownContainer}
//               listMode="SCROLLVIEW" // Ensures it uses a ScrollView instead of FlatList
//               nestedScrollEnabled // Enables nested scrolling
//             />
//           </View>
//           <View style={styles.drop3}>
//             <DropDownPicker
//               open={open3}
//               value={
//                 checked === 'option1'
//                   ? teamsData[0].bowler
//                   : teamsData[1].bowler
//               }
//               items={items3}
//               setOpen={setOpen3}
//               setValue={value => handleInputChange('bowler', value)}
//               setItems={setItems3}
//               placeholder="Bowler"
//               style={styles.dropdown}
//               dropDownContainerStyle={styles.dropdownContainer}
//               listMode="SCROLLVIEW" // Ensures it uses a ScrollView instead of FlatList
//               nestedScrollEnabled // Enables nested scrolling
//             />
//           </View>
//           <View style={styles.drop3}>
//             <DropDownPicker
//               open={open4}
//               value={teamsData[checked === 'option1' ? 0 : 1].fielder} // Get the current fielder value
//               items={items4}
//               setOpen={setOpen4}
//               setValue={value => {
//                 handleInputChange('fielder', value); // Pass the selected value to `handleInputChange`
//               }}
//               setItems={setItems4}
//               placeholder="Fielder"
//               style={styles.dropdown}
//               dropDownContainerStyle={styles.dropdownContainer}
//               listMode="SCROLLVIEW" // Ensures it uses a ScrollView instead of FlatList
//               nestedScrollEnabled // Enables nested scrolling
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
//           <TouchableOpacity style={styles.actionButton} onPress={printdata}>
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
//     color: 'black',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   radioItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
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
//     marginBottom: 10,
//     // flex: 1, // Makes the first dropdown take equal space
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

// // const [score, setScore] = useState('');
// // const [overs, setOvers] = useState('');
// // const [wickets, setWickets] = useState('');
// // const [comments, setComments] = useState('');
// // const [Team2score, setTeam2Score] = useState('');
// // const [Team2overs, setTeam2overs] = useState('');
// // const [Team2wickets, setTeam2Wickets] = useState('');
// // const [comments2, setcomments2] = useState('');
// // const [TeamDropdowns, setTeamDropdowns] = useState([]);
// // const [TeamDropdowns2, setTeamDropdowns2] = useState([]);

// // const handleScore = value => {
// //   checked === 'option1' ? setScore(value) : setTeam2Score(value);
// // };
// // const handleOvers = value => {
// //   checked === 'option1' ? setOvers(value) : setTeam2overs(value);
// // };
// // const handleWickets = value => {
// //   checked === 'option1' ? setWickets(value) : setTeam2Wickets(value);
// // };
// // const handleComments = value => {
// //   checked === 'option1' ? setComments(value) : setcomments2(value);
// // };
// // const handleDropdowns = value => {
// //   checked === 'option1' ? setComments(value) : setcomments2(value);
// // };
