import {useState, useEffect} from 'react';
import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
import {useNavigation} from '@react-navigation/native';
import Api from '../Api';
import {getUserData} from '../UsersAccount/UserData';

export default function StartScoring() {
  const navigation = useNavigation();
  const userdata = getUserData();
  // const route = useRoute();
  // const {Sportid} = route.params;
  const [fixtures, setfixtures] = useState([]);

  const FetchFixtures = async () => {
    const id = userdata.id; // Ensure Sportid is defined and valid
    try {
      const response = await Api.fetchmanagerfixtures(id);
      if (response.status === 200) {
        const results = response.data.results || response.data;

        const fixtureData = results.map(item => ({
          fixtureId: item.fixture_id,
          team1name: item.team1_name,
          team2name: item.team2_name,
          matchDate: item.matchdate,
          venue: item.venuee,
          winnerTeam: item.winner_name,
          matchType: item.matchType,
          sportName: item.sport_name,
          sportType: item.sport_type,
        }));
        setfixtures(fixtureData);
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('No Fixtures Found.');
      } else if (error.response) {
        Alert.alert(
          'Error fetching dropdown data',
          // `Status: ${error.response.status}`,
        );
      } else {
        // console.log(error);
        Alert.alert('Network error', 'Failed to connect to server.');
      }
    }
  };

  useEffect(() => {
    FetchFixtures();
  }, [Sportid]);
  const handleHome = () => {
    navigation.navigate('UserHome');
  };
  return (
    <SafeAreaViewComponent>
      <AppBarComponent title={'Fixtures'} handleBackPress={handleHome} />
      <ScrollView contentContainerStyle={styles.content}>
        {fixtures.map((fix, index) => (
          <View key={index} style={styles.card}>
            {/* <Text style={styles.matchTitle}>{fix.sportName}</Text> */}
            <Text style={styles.matchTitle2}>{fix.matchType}</Text>
            <View style={styles.teamsContainer}>
              <Text style={styles.teamBox}>{fix.team1name}</Text>
              <Text style={styles.vsText}>VS</Text>
              <Text style={styles.teamBox}>{fix.team2name}</Text>
            </View>
            <Text style={styles.teamBox2}>{fix.winnerTeam}</Text>
            <Text style={styles.matchInfo}>{fix.matchDate}</Text>
            {/* <Text style={styles.matchStatus}>{fix.sportType}</Text> */}
            <Text style={styles.matchStatus}>{fix.venue}</Text>
            {/* <TouchableOpacity style={styles.detailsButton} onPress={printdata}>
              <Text style={styles.detailsButtonText}>Start Match</Text>
            </TouchableOpacity> */}
          </View>
        ))}
      </ScrollView>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  matchTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  matchTitle2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  teamBox: {
    // borderWidth: 1,
    // borderColor: '#333',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    // color: 'black',
  },
  teamBox2: {
    // borderWidth: 1,
    // borderColor: '#333',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: -5,
    // color: 'black',
  },
  vsText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  matchInfo: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  matchStatus: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: '#6200ee',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
// import Api from '../Api';
// import {useNavigation} from '@react-navigation/native';
// import {getUserData} from '../UsersAccount/UserData';

// export default function StartScoring() {
//   const userData = getUserData();
//   const navigation = useNavigation();
//   const [Fixtures, setFixtures] = useState([]);

//   // const FetchFixtures = async () => {
//   //   try {
//   //     const userid = userData.id;
//   //     console.log(userid);
//   //     const response = await Api.fetchfixtures(userid);
//   //     if (response.status === 200) {
//   //       if (Array.isArray(response.data) && response.data.length > 0) {
//   //         setFixtures(response.data);
//   //       } else {
//   //         Alert.alert(
//   //           'No Fixtures Found',
//   //           'No cricket Fixtures are available for the current session.',
//   //         );
//   //         setFixtures([]);
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //     if (error.response && error.response.status === 404) {
//   //       Alert.alert(
//   //         'No Latest Sessions Found',
//   //         'No cricket Fixtures are available for the current session.',
//   //       );
//   //     } else {
//   //       Alert.alert(
//   //         'Network Error',
//   //         'Failed to connect to the server. Please try again.',
//   //       );
//   //     }
//   //     setFixtures([]);
//   //   }
//   // };
//   // useEffect(() => {
//   //   FetchFixtures();
//   // }, []);

//   const handleHome = () => {
//     navigation.navigate('CricketManagerhome');
//   };
//   const renderItem = ({item}) => {
//     return (
//       <View style={styles.teamContainer}>
//         <View style={styles.matchtype}>
//           <Text style={styles.teamName}>{item.match_type}</Text>
//         </View>
//         <Text style={styles.captainText}>Vedfnue: {item.venue}</Text>
//         <Text style={styles.captainText}>MatchDate: {item.matchDate}</Text>
//         <View style={styles.buttonsContainer}>
//           <TouchableOpacity
//             style={styles.viewButton}
//             // onPress={handleStatusApprove}
//           >
//             <Text style={styles.buttonText}>Select Teams</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.SelectedteamsView}>
//           <Text style={styles.Selectedteamstext}>
//             Selected Teams: {item.matchDate}
//           </Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaViewComponent>
//       <AppBarComponent title={'EDit Fixtures'} handleBackPress={handleHome} />
//       <FlatList
//         data={Fixtures}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={styles.listContainer}
//       />
//     </SafeAreaViewComponent>
//   );
// }

// const styles = StyleSheet.create({
//   listContainer: {
//     padding: 10,
//   },
//   teamContainer: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     shadowOffset: {width: 0, height: 2},
//     elevation: 2,
//   },
//   teamName: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: 'black',
//   },
//   matchtype: {
//     marginBottom: 5,
//     // marginTop: 10,
//     alignItems: 'center',
//   },

//   captainText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#555',
//     marginBottom: 10,
//   },
//   Selectedteamstext: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#555',
//   },
//   SelectedteamsView: {
//     marginBottom: 10,
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   viewButton: {
//     backgroundColor: '#6200ee',
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     flex: 1,
//     marginRight: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// // const handleTeamDetails = () => {
// //   const Teamid = item.id;
// //   handleplayers(Teamid);
// // };
// // const handleStatusApprove = () => {
// //   if (!item.teamStatus) {
// //     Alert.alert(
// //       'Confirmation',
// //       `Are you sure you want to approve ${item.name} Team?`,
// //       [
// //         {
// //           text: 'Cancel',
// //           style: 'cancel',
// //         },
// //         {text: 'OK', onPress: () => updateStatus(item.id)},
// //       ],
// //       {cancelable: false},
// //     );
// //   }
// // };

// //---------------
// // const updateStatus = async id => {
// //   try {
// //     const response = await Api.TeamStatusUpdate(id);

// //     if (response.status === 200) {
// //       Alert.alert('Success', 'Team status updated successfully');
// //     } else {
// //       Alert.alert(
// //         'Error',
// //         'Some technical issue occurred. Please try again.',
// //       );
// //     }
// //   } catch (error) {
// //     if (error.response) {
// //       if (error.response.status === 404) {
// //         Alert.alert('Error', 'Team not found');
// //       } else if (error.response.status === 409) {
// //         Alert.alert('Error', 'Team already approved. Refresh the page.');
// //       } else {
// //         Alert.alert(
// //           'Error',
// //           `Request failed with status ${error.response.status}`,
// //         );
// //       }
// //     } else {
// //       Alert.alert(
// //         'Network Error',
// //         'Failed to connect to the server. Please try again.',
// //       );
// //     }
// //   }
// // };

// // // import {View, Text} from 'react-native';
// // // import React from 'react';
// // // import {getUserData} from '../UsersAccount/UserData';

// // // export default function CricketFixtures() {
// // //   const userData = getUserData(); // Access the user data
// // //   return (
// // //     <>
// // //       <Text>{userData.id}</Text>
// // //       <Text>{userData.name}</Text>
// // //       <Text>{userData.registration_no}</Text>
// // //       <Text>{userData.role}</Text>
// // //     </>
// // //   );
// // // }

// // import React, {useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   // Image,
// // } from 'react-native';
// // import {
// //   SafeAreaViewComponent,
// //   AppBarComponent,
// //   ButtonComponent,
// //   TextInputComponent,
// // } from '../MyComponents';
// // import {useNavigation} from '@react-navigation/native';
// // import {Checkbox} from 'react-native-paper';

// // export default function CricketScoring() {
// //   const navigation = useNavigation();

// //   const handlecrickethome = () => {
// //     navigation.goBack();
// //   };

// //   return (
// //     <SafeAreaViewComponent>
// //       <AppBarComponent
// //         title={'Scoring Cricket'}
// //         handleBackPress={handlecrickethome}
// //       />

// //       <View style={styles.container}>
// //         <Text style={styles.matchText}>Match 1</Text>

// //         <View style={styles.teamContainer}>
// //           <TouchableOpacity style={styles.teamButton}>
// //             <Text style={styles.teamName}>Knights</Text>
// //           </TouchableOpacity>
// //           <TouchableOpacity style={styles.teamButton}>
// //             <Text style={styles.teamName}>Fighters</Text>
// //           </TouchableOpacity>
// //         </View>

// //         <Text style={styles.sectionTitle}>Knights - Batting</Text>

// //         <View style={styles.statsContainer}>
// //           <TextInputComponent
// //             placeholder="Score"
// //             // textValue={regno}
// //             // onChangeText={regno => setregno(regno)}
// //             CustomStyle={{
// //               // padding:20,
// //               width: '35%',
// //               // marginTop: 30,
// //               // marginHorizontal: 10,
// //             }}
// //           />
// //           {/* <Text style={styles.statText}>Score</Text> */}

// //           <TextInputComponent
// //             placeholder="Overs"
// //             // textValue={regno}
// //             // onChangeText={regno => setregno(regno)}
// //             CustomStyle={{
// //               // padding:20,
// //               width: '30%',
// //               // marginTop: 30,
// //               // marginHorizontal: 10,
// //             }}
// //           />
// //           {/* <Text style={styles.statText}>Overs</Text> */}

// //           <TextInputComponent
// //             placeholder="Wickets"
// //             // textValue={regno}
// //             // onChangeText={regno => setregno(regno)}
// //             CustomStyle={{
// //               // padding:20,
// //               width: '25%',
// //               // marginTop: 30,
// //               // marginHorizontal: 10,
// //             }}
// //           />
// //           {/* <Text style={styles.statText}>Wickets</Text> */}
// //         </View>

// //         <TextInput
// //           style={styles.commentBox}
// //           placeholder="Add Comments"
// //           multiline
// //           placeholderTextColor="#999"
// //         />

// //         <View style={styles.imageUploadContainer}>
// //           <TouchableOpacity style={styles.addButton}>
// //             <Text style={styles.addButtonText}>Add Image</Text>
// //           </TouchableOpacity>
// //           <TouchableOpacity style={styles.imageIcon}>
// //             {/* <Image
// //               source={{uri: 'your_image_icon_uri'}}
// //               style={styles.iconImage}
// //             /> */}
// //           </TouchableOpacity>
// //         </View>

// //         <View style={styles.checkboxContainer}>
// //           <Checkbox value={true}></Checkbox>
// //           {/* <CheckBox /> */}
// //           <Text style={styles.checkboxLabel}>Final Score</Text>
// //         </View>

// //         <Text style={styles.warningText}>
// //           Press final score when both innings are ended
// //         </Text>

// //         <View style={styles.buttons}>
// //           <ButtonComponent
// //             buttonTitle="Save"
// //             // onPress={Eventmanagerdata}
// //             CustomStyle={{
// //               width: '50%',
// //               marginHorizontal: 5,
// //             }}
// //           />
// //           <ButtonComponent
// //             buttonTitle="End Match"
// //             // onPress={Eventmanagerdata}
// //             CustomStyle={{
// //               width: '50%',
// //               marginHorizontal: 5,
// //             }}
// //           />
// //         </View>
// //       </View>
// //     </SafeAreaViewComponent>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 16,
// //   },
// //   matchText: {
// //     fontSize: 20,
// //     textAlign: 'center',
// //     marginBottom: 16,
// //     color: 'purple',
// //   },
// //   teamContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 16,
// //   },
// //   teamButton: {
// //     flex: 1,
// //     padding: 12,
// //     backgroundColor: '#6200ee',
// //     marginHorizontal: 8,
// //     alignItems: 'center',
// //     borderRadius: 8,
// //   },
// //   teamName: {
// //     fontSize: 16,
// //     color: 'white',
// //   },
// //   sectionTitle: {
// //     fontSize: 18,
// //     textAlign: 'center',
// //     marginVertical: 12,
// //     color: 'purple',
// //   },
// //   statsContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 16,
// //   },
// //   commentBox: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 8,
// //     padding: 12,
// //     marginBottom: 16,
// //     textAlignVertical: 'top',
// //     height: 200,
// //     backgroundColor: 'white',
// //   },
// //   imageUploadContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 16,
// //   },
// //   addButton: {
// //     padding: 10,
// //     backgroundColor: '#6200ee',
// //     borderRadius: 20,
// //     marginRight: 10,
// //   },
// //   addButtonText: {
// //     color: 'white',
// //   },
// //   imageIcon: {
// //     padding: 10,
// //   },
// //   iconImage: {
// //     width: 24,
// //     height: 24,
// //   },
// //   checkboxContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 8,
// //     // justifyContent: 'center', // Center the checkbox horizontally
// //     marginVertical: 10, // Add some space
// //     marginTop: 80,
// //   },
// //   checkboxLabel: {
// //     marginLeft: 8,
// //     fontSize: 16, // Ensure the label is visible
// //     color: 'black',
// //   },
// //   warningText: {
// //     fontSize: 12,
// //     color: 'red',
// //     marginBottom: 16,
// //   },
// //   buttonContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     flexWrap: 'wrap', // Allow buttons to wrap if there's not enough space
// //     marginTop: 20, // Add some top margin for spacing
// //   },
// //   buttons: {
// //     justifyContent: 'center',
// //     flexDirection: 'row',
// //     padding: 20,
// //   },
// // });
