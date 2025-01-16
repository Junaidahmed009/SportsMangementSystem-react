import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaViewComponent,
  AppBarComponent,
  ButtonComponent,
} from '../MyComponents';
import Api from '../Api';
import {useNavigation} from '@react-navigation/native';
import {getUserData} from '../UsersAccount/UserData';

export default function EditFixtures() {
  const userData = getUserData();
  const navigation = useNavigation();

  const [data, setData] = useState([]); //Teams Data fetched from backend.
  const [Fixtures, setFixtures] = useState([]); //fetch fixtures from backend
  const [cancelbutton, setcancelbutton] = useState([]);
  const [activeCardEdited, setactiveCardedited] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Controls visibility of team selection modal

  const handleHome = () => {
    navigation.navigate('CricketManagerhome');
  };
  // this function filters data according to matchtype and save it and send it
  const handlesave = async matchtype => {
    const matchtypeFixtures = Fixtures.filter(f => f.match_type === matchtype);
    // for loop for checking teams id infixture array
    for (const teams of matchtypeFixtures) {
      if (
        teams.selectedteamsids[0] === undefined ||
        teams.selectedteamsids[1] === undefined
      ) {
        Alert.alert(`Please select All teams in ${matchtype}`);
        return; // Exit the function if validation fails
      }
    }
    // filtering data from array
    let filterdata = matchtypeFixtures.map(fixture => ({
      Fixtureid: fixture.id,
      Team1id: fixture.selectedteamsids[0],
      Team2id: fixture.selectedteamsids[1],
    }));
    const AllData = {UpdatedFixtures: filterdata};
    try {
      const response = await Api.updatefixtures(AllData);
      if (response.status === 200) {
        Alert.alert(`Fixtures of ${matchtype} updated`);
        filterdata = null;
        handleHome(); // i didnt test it
      } else {
        Alert.alert('No Fixtures Updated', 'Try later.');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        Alert.alert('Not Found', 'No teams found try later');
      } else {
        Alert.alert(
          'Network Error',
          'Failed to connect to the server. Please try again.',
        );
      }
    }
  };

  //this function is used to fetch fixtures from backend
  const FetchFixtures = async () => {
    try {
      const userid = userData.id;
      const response = await Api.fetchfixtures(userid);
      if (response.status === 200) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const updateFixtures = response.data.map(fixture => ({
            ...fixture,
            selectedteamsids: [],
          }));
          setFixtures(updateFixtures);
        } else {
          Alert.alert(
            'No Fixtures Found',
            'No cricket Fixtures are available for the current session.',
          );
          setFixtures([]);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        Alert.alert(
          'No Latest Sessions Found',
          'No cricket Fixtures are available for the current session.',
        );
      } else {
        Alert.alert(
          'Network Error',
          'Failed to connect to the server. Please try again.',
        );
      }
      setFixtures([]);
    }
  };
  useEffect(() => {
    FetchFixtures();
  }, []);
  //this function is used to fetch Approved teams from backend
  const fetchTeams = async () => {
    // Check if data already exists
    try {
      const userid = userData.id;
      const response = await Api.fetchteams(userid);
      if (response.status === 200) {
        const teamsData = response.data.map(team => ({
          id: team.teamid,
          name: team.teamname,
        }));
        setData(teamsData);
        // console.log(data);
      } else {
        Alert.alert('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        Alert.alert('No Teams Found', 'No cricket Teams are available.');
      } else {
        Alert.alert(
          'Network Error',
          'Failed to connect to the server. Please try again.',
        );
      }
    }
  };

  //this function is used to select teams from flat list.
  const handleTeamSelect = team => {
    setFixtures(prevFixtures =>
      prevFixtures.map(fixture => {
        if (fixture.id === activeCardEdited) {
          const selectedTeamIds = fixture.selectedteamsids || [];
          const selectedTeamNames = fixture.selectedteamsnames || [];
          const isSelected = selectedTeamIds.includes(team.id);

          if (!isSelected) {
            // Check if the team is already selected in other fixtures
            const isTeamAlreadySelected = prevFixtures.some(
              otherFixture =>
                otherFixture.id !== activeCardEdited && // Skip the current fixture
                otherFixture.selectedteamsids?.includes(team.id), // Check other fixtures
            );

            if (isTeamAlreadySelected) {
              Alert.alert('This team is already selected in another fixture.');
              return fixture; // No changes if the team is already selected
            }
          }

          let updatedIds = [];
          let updatedNames = [];

          if (isSelected) {
            // Remove the team by ID and Name
            updatedIds = selectedTeamIds.filter(id => id !== team.id);
            updatedNames = selectedTeamNames.filter(name => name !== team.name);
          } else if (selectedTeamIds.length < 2) {
            // Add the team ID and Name
            updatedIds = [...selectedTeamIds, team.id];
            updatedNames = [...selectedTeamNames, team.name];
          } else {
            Alert.alert('You can only select 2 teams per fixture.');
            return fixture; // No changes if already 2 teams selected
          }

          return {
            ...fixture,
            selectedteamsids: updatedIds,
            selectedteamsnames: updatedNames,
          };
        }
        return fixture;
      }),
    );
  };
  //this function is used to edit the card
  const renderTeamItem = ({item}) => {
    const activeFixture = Fixtures.find(
      fixture => fixture.id === activeCardEdited,
    );
    const selectedTeams = activeFixture?.selectedteamsids || [];
    const isSelected = selectedTeams.includes(item.id); // Check by ID

    return (
      <TouchableOpacity
        style={[styles.teamItem, isSelected && styles.selectedTeam]}
        onPress={() => handleTeamSelect(item)}>
        <Text style={styles.teamText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  //this function is used to save the selected values from list of selected teams
  const handleSaveSelection = () => {
    const activeFixture = Fixtures.find(
      fixture => fixture.id === activeCardEdited,
    );
    // Use the correct property name: selectedteamsids
    if (!activeFixture || activeFixture.selectedteamsids.length < 2) {
      Alert.alert('Select at least 2 teams');
      return;
    }
    setModalVisible(false);
  };
  const handleCancelSelection = () => {
    if (!cancelbutton || !cancelbutton.ids || !cancelbutton.names) {
      console.error('Cancel button data is missing or undefined');
      return;
    }

    setFixtures(prevFixtures =>
      prevFixtures.map(fixture =>
        fixture.id === activeCardEdited
          ? {
              ...fixture,
              selectedteamsids: cancelbutton.ids,
              selectedteamsnames: cancelbutton.names,
            }
          : fixture,
      ),
    );
    setModalVisible(false);
  };

  const renderItem = ({item, index}) => {
    const isLastFixtureOfMatchType =
      index === Fixtures.length - 1 ||
      Fixtures[index + 1]?.match_type !== item.match_type;
    const handleEditCards = () => {
      setcancelbutton({
        ids: item.selectedteamsids || [],
        names: item.selectedteamsnames || [],
      });
      setactiveCardedited(item.id);
      fetchTeams(item.match_type);
      setModalVisible(true);
    };

    const activeFixture = Fixtures.find(fixture => fixture.id === item.id);
    const selectedTeamNames = activeFixture?.selectedteamsnames || [];
    const Selectedteamstext =
      selectedTeamNames.length > 0
        ? selectedTeamNames.join(', ')
        : 'No teams selected';

    return (
      <View style={styles.teamContainer}>
        <View style={styles.matchtype}>
          <Text style={styles.teamName}>{item.match_type}</Text>
        </View>
        <Text style={styles.captainText}>Venue: {item.venue}</Text>
        <Text style={styles.captainText}>MatchDate: {item.matchDate}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.viewButton} onPress={handleEditCards}>
            <Text style={styles.buttonText}>Select Teams</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.SelectedteamsView}>
          <Text style={styles.Selectedteamstext}>
            Selected Teams: {Selectedteamstext}
          </Text>
        </View>
        {isLastFixtureOfMatchType && (
          <View style={styles.saveButton}>
            <TouchableOpacity
              style={styles.saveButtonstyle}
              onPress={() => handlesave(item.match_type)}>
              <Text style={styles.saveButtonText}>
                Save {item.match_type} Fixtures
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  return (
    <SafeAreaViewComponent>
      <AppBarComponent title={'EDit Fixtures'} handleBackPress={handleHome} />
      <FlatList
        data={Fixtures}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select 2 Teams</Text>
            <FlatList
              data={data}
              renderItem={renderTeamItem}
              keyExtractor={item => item.id.toString()}
              extraData={Fixtures}
            />

            <View style={styles.modalFooter}>
              <ButtonComponent
                buttonTitle="Save"
                onPress={handleSaveSelection}
                CustomStyle={{
                  height: 50,
                  width: '40%',
                  marginHorizontal: 5,
                }}
              />
              <ButtonComponent
                buttonTitle="Cancel"
                onPress={handleCancelSelection}
                CustomStyle={{
                  height: 50,
                  width: '40%',
                  marginHorizontal: 5,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  teamContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  teamName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  matchtype: {
    marginBottom: 5,
    // marginTop: 10,
    alignItems: 'center',
  },

  captainText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  Selectedteamstext: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  SelectedteamsView: {
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  viewButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  teamText: {
    fontSize: 16,
    color: '#555',
  },
  teamItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedTeam: {
    backgroundColor: '#d4edda',
    borderColor: '#28a745',
    borderWidth: 1,
  },
  saveButton: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  saveButtonstyle: {
    backgroundColor: '#6200ee',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
    // flex: 1,
    marginRight: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
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

// export default function EditFixtures() {
//   const userData = getUserData();
//   const navigation = useNavigation();
//   const [Fixtures, setFixtures] = useState([]);

//   const FetchFixtures = async () => {
//     try {
//       const userid = userData.id;
//       console.log(userid);
//       const response = await Api.fetchfixtures(userid);
//       if (response.status === 200) {
//         if (Array.isArray(response.data) && response.data.length > 0) {
//           setFixtures(response.data);
//         } else {
//           Alert.alert(
//             'No Fixtures Found',
//             'No cricket Fixtures are available for the current session.',
//           );
//           setFixtures([]);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       if (error.response && error.response.status === 404) {
//         Alert.alert(
//           'No Latest Sessions Found',
//           'No cricket Fixtures are available for the current session.',
//         );
//       } else {
//         Alert.alert(
//           'Network Error',
//           'Failed to connect to the server. Please try again.',
//         );
//       }
//       setFixtures([]);
//     }
//   };
//   useEffect(() => {
//     FetchFixtures();
//   }, []);

//   const handleHome = () => {
//     navigation.navigate('CricketManagerhome');
//   };
//   const renderItem = ({item}) => {
//     return (
//       <View style={styles.teamContainer}>
//         <View style={styles.matchtype}>
//           <Text style={styles.teamName}>{item.match_type}</Text>
//         </View>
//         <Text style={styles.captainText}>Venue: {item.venue}</Text>
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

// switch (matchtype) {
//   case 'League Match':
//     setleagueFixtures(matchtypeFixtures);
//     break;
//   case 'League Match 2':
//     setleague2Fixtures(matchtypeFixtures);
//     break;
//   case 'Quarter Final':
//     setquarterfinalFixtures(matchtypeFixtures);
//     break;
//   case 'Semi Final':
//     setsemifinalFixtures(matchtypeFixtures);
//     break;
//   case 'Final':
//     setfinalFixtures(matchtypeFixtures);
//     break;
//   default:
//     console.warn(`Unknown match type: ${matchtype}`);
// }

// Use matchtypeFixtures directly to avoid relying on asynchronous state

// const [filterdata, setfilterdata] = useState([]);
// const SaveEditedFixtures = async (matchtype, fixture) => {
//   let filterdata = [];
//   if (matchtype == 'League Match') {
//     filterdata = leagueFixtures.map(fixture => ({
//       fixtureid: fixture.id,
//       team1id: fixture.selectedteamsids[0] || null,
//       team2id: fixture.selectedteamsids[1] || null,
//     }));
//     console.log(filterdata);
//   }

// try {
//   const response = await Api.fetchfixtures(userid);
//   if (response.status === 200) {
//     if (Array.isArray(response.data) && response.data.length > 0) {
//       const updateFixtures = response.data.map(fixture => ({
//         ...fixture,
//         selectedteamsids: [],
//       }));
//       setFixtures(updateFixtures);
//     } else {
//       Alert.alert(
//         'No Fixtures Found',
//         'No cricket Fixtures are available for the current session.',
//       );
//       setFixtures([]);
//     }
//   }
// } catch (error) {
//   console.log(error);
//   if (error.response && error.response.status === 404) {
//     Alert.alert(
//       'No Latest Sessions Found',
//       'No cricket Fixtures are available for the current session.',
//     );
//   } else {
//     Alert.alert(
//       'Network Error',
//       'Failed to connect to the server. Please try again.',
//     );
//   }
//   setFixtures([]);
// }
// };
