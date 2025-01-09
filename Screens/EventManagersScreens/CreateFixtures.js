import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import {
  SafeAreaViewComponent,
  AppBarComponent,
  Card,
  TextInputComponent,
  ButtonComponent,
} from '../MyComponents';
import DatePicker from 'react-native-date-picker';
import Api from '../Api';
import {getUserData} from '../UsersAccount/UserData';
import {useNavigation} from '@react-navigation/native';

export default function CreateFixtures() {
  const navigation = useNavigation();
  const handleUserHome = () => {
    navigation.navigate('CricketManagerhome');
  };
  const [sport, setSport] = useState([]);
  const [data, setData] = useState([]); // Stores team data fetched from backend
  const [modalVisible, setModalVisible] = useState(false); // Controls visibility of team selection modal
  const [activeCardEdited, setactiveCardedited] = useState(null);
  const [cardsData, setCardsData] = useState([]);
  const [cardsData2, setCardsData2] = useState([]);
  const [quartercardsData, setQuarterCardsData] = useState([]);
  const [semicardsData, setSemiCardsData] = useState([]);
  const [finalcardsData, setFinalCardsData] = useState([]); // Active card index being edited in modal
  const mergedCardsData = [
    ...cardsData.map(item => ({
      ...item,
      type: 'firstCard',
    })),
    ...cardsData2.map(item => ({
      ...item,
      type: 'secondCard',
    })),
    ...quartercardsData.map(item => ({
      ...item,
      type: 'thirdCard',
    })),
    ...semicardsData.map(item => ({
      ...item,
      type: 'fourthCard',
    })),
    ...finalcardsData.map(item => ({
      ...item,
      type: 'fifthCard',
    })),
  ];
  const userData = getUserData();
  const fetchManagerData = async () => {
    try {
      const id = userData.id; // Assuming userData is available
      const response = await Api.getManagerSport(id);
      if (response.status === 200) {
        const Sport = response.data;
        // console.log(Sport);
        if (Sport.game === 'Cricket') {
          setSport([16, 8, 4, 2, 1]);
        } else if (
          Sport.game === 'Football' ||
          Sport.game === 'Badminton(Dual)' ||
          Sport.game === 'Race' ||
          Sport.game === 'Badminton(Single)'
        ) {
          setSport([0, 8, 4, 2, 1]);
        } else if (Sport.game === 'Tug of War' || Sport.game === 'Race') {
          setSport([0, 0, 4, 2, 1]);
        } else if (Sport.game === 'Chess') {
          setSport([0, 0, 0, 2, 1]);
        }
      } else {
        Alert.alert('No Sport Found for Manager');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('An error occurred while fetching manager data.');
    }
  };
  // / Update Cards Data when `sport` changes
  useEffect(() => {
    if (sport.length > 0) {
      // Update each state dynamically
      setCardsData(
        Array(sport[0])
          .fill(null)
          .map((_, index) => ({
            selectedTeams: [],
            venue: '',
            matchDate: new Date(),
            isPickerOpen: false,
            id: `first-${index}`,
          })),
      );

      setCardsData2(
        Array(sport[1])
          .fill(null)
          .map((_, index) => ({
            venue: '',
            matchDate: new Date(),
            isPickerOpen: false,
            id: `second-${index}`,
            title: 'League Matches 2',
          })),
      );

      setQuarterCardsData(
        Array(sport[2])
          .fill(null)
          .map((_, index) => ({
            venue: '',
            matchDate: new Date(),
            isPickerOpen: false,
            id: `third-${index}`,
            title: 'Quarter Final',
          })),
      );

      setSemiCardsData(
        Array(sport[3])
          .fill(null)
          .map((_, index) => ({
            venue: '',
            matchDate: new Date(),
            isPickerOpen: false,
            id: `fourth-${index}`,
            title: 'Semi Final',
          })),
      );

      setFinalCardsData(
        Array(sport[4])
          .fill(null)
          .map((_, index) => ({
            venue: '',
            matchDate: new Date(),
            isPickerOpen: false,
            id: `fifth-${index}`,
            title: 'Final',
          })),
      );
    }
  }, [sport]); // Depend on `sport`

  // Fetch data on component mount
  useEffect(() => {
    fetchManagerData();
  }, []);
  const formatDateToCustomFormat = date => {
    const d = new Date(date); // used for get dates or time from different standard of datetimes.
    const pad = num => String(num).padStart(2, '0'); // this adds a single num a o like 2pm it makes 02.
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate(),
    )} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(
      d.getSeconds(),
    )}.${String(d.getMilliseconds()).padStart(3, '0')}`;
  };
  const ScheduleDataForBackend = async () => {
    try {
      const allCards = [
        ...cardsData,
        ...cardsData2,
        ...quartercardsData,
        ...semicardsData,
        ...finalcardsData,
      ];
      if (allCards.some(card => !card.venue.trim())) {
        Alert.alert('Please fill all 31 cards with a venue.');
        return;
      }
      const formatCardData = (cards, matchType, includeTeams = false) =>
        cards.map(card => ({
          ...(includeTeams && {
            Team1_id: card.selectedTeams?.[0]?.id || null,
            Team2_id: card.selectedTeams?.[1]?.id || null,
          }),
          ...(includeTeams || {
            Team1_id: null,
            Team2_id: null,
          }),
          MatchDate: formatDateToCustomFormat(card.matchDate),
          Venue: card.venue.trim(),
          Match_type: matchType,
        }));

      const card1formattedData = formatCardData(
        cardsData,
        'League Match',
        true,
      );
      const card2formattedData = formatCardData(cardsData2, 'League Match 2');
      const quarterformattedData = formatCardData(
        quartercardsData,
        'Quarter Final',
      );
      const semiformattedData = formatCardData(semicardsData, 'Semi Final');
      const finalsormattedData = formatCardData(finalcardsData, 'Final');
      const DisplayAlldata = [
        ...card1formattedData,
        ...card2formattedData,
        ...quarterformattedData,
        ...semiformattedData,
        ...finalsormattedData,
      ];
      // console.log(DisplayAlldata, userData.id);
      const AllData = {
        Schedules: DisplayAlldata,
        UserId: userData.id,
      };
      const response = await Api.PostFixturesData(AllData);
      if (response.status === 201) {
        Alert.alert(
          'Success',
          'Your Fixtures for the Event have been created successfully',
        );
        handleUserHome();
      } else {
        Alert.alert(
          'Error',
          `Unexpected response from the server. Status: ${response.status}`,
        );
      }
    } catch (error) {
      console.error('Error sending schedule data:', error);
      Alert.alert(
        'Error',
        `An error occurred while creating fixtures: ${error.message}`,
      );
    }
  };

  const fetchTeams = async () => {
    try {
      const id = userData.id;
      const response = await Api.fetchteams1(id);
      if (response.status === 200) {
        const teamsData = response.data.map(team => ({
          id: team.id,
          name: team.name,
        }));
        setData(teamsData);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          Alert.alert(
            'No data for teams was found',
            'Select Venue and Date only.',
          );
        } else if (error.response.status === 409) {
          Alert.alert(
            'Low Count',
            'Teams less than 32.Select Venue and Date only.',
          );
        }
      }
      // console.error('Error fetching teams:', error);
    }
  };
  useEffect(() => {
    fetchTeams();
  }, []);

  const updateCardData = (id, key, value) => {
    setCardsData(prev => {
      return prev.map(card => {
        return card.id === id ? {...card, [key]: value} : card;
      });
    });
    setCardsData2(prev => {
      return prev.map(card => {
        return card.id === id ? {...card, [key]: value} : card;
      });
    });
    setQuarterCardsData(prev => {
      return prev.map(card => {
        return card.id === id ? {...card, [key]: value} : card;
      });
    });
    setSemiCardsData(prev => {
      return prev.map(card => {
        return card.id === id ? {...card, [key]: value} : card;
      });
    });
    setFinalCardsData(prev => {
      return prev.map(card => {
        return card.id === id ? {...card, [key]: value} : card;
      });
    });
  };

  const handleModal = id => {
    setactiveCardedited(id);
    setModalVisible(true);
  };

  const handleTeamSelect = team => {
    if (activeCardEdited === null || activeCardEdited === undefined) return;
    const activecard = cardsData.find(card => card.id === activeCardEdited);
    if (!activecard) return;

    // Check if the team is already selected in any previous card
    const isTeamAlreadySelected = cardsData.some(card => {
      if (card.id !== activeCardEdited) {
        // Check if the team is in any of the selectedTeams of previous cards
        return card.selectedTeams.some(t => t.id === team.id);
      }
      return false;
    });
    if (isTeamAlreadySelected) {
      Alert.alert(
        'Error',
        'This team has already been selected in another match.',
      );
      return;
    }

    setCardsData(prevCardsData =>
      prevCardsData.map(card => {
        if (card.id === activeCardEdited) {
          const selectedTeams = card.selectedTeams;
          const isAlreadySelected = selectedTeams.some(t => t.id === team.id);

          // If the team is already selected, remove it; otherwise, add it
          const updatedTeams = isAlreadySelected
            ? selectedTeams.filter(t => t.id !== team.id)
            : selectedTeams.length < 2
            ? [...selectedTeams, team]
            : selectedTeams; // Limit to 2 selected teams

          return {...card, selectedTeams: updatedTeams};
        }
        return card;
      }),
    );
  };

  const handleSaveSelection = () => {
    const activeCard = cardsData.find(card => card.id === activeCardEdited);
    const selectedTeams = activeCard?.selectedTeams || [];

    if (selectedTeams.length < 2) {
      Alert.alert('Select at least 2 teams');
      return;
    }
    setModalVisible(false);
  };
  const renderTeamItem = ({item}) => {
    const activeCard = cardsData.find(card => card.id === activeCardEdited);
    const selectedTeams = activeCard?.selectedTeams || [];
    const isSelected = selectedTeams.some(selected => selected.id === item.id);

    return (
      <TouchableOpacity
        style={[styles.teamItem, isSelected && styles.selectedTeam]}
        onPress={() => handleTeamSelect(item)}>
        <Text style={styles.teamText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const renderCard = ({item}) => {
    if (item.type === 'firstCard') {
      return (
        <Card key={item.id}>
          <View style={styles.rowContainer}>
            <Text>League Matches</Text>
            <ButtonComponent
              buttonTitle="Select Teams"
              onPress={() => handleModal(item.id)}
              CustomStyle={{
                width: '80%',
                marginHorizontal: 5,
                marginBottom: 10,
                marginTop: 10,
              }}
            />
            <Text style={{color: 'black'}}>
              Selected Teams:{' '}
              {item.selectedTeams.length > 0
                ? item.selectedTeams.map(team => team.name).join(', ')
                : 'No teams selected'}
            </Text>
          </View>
          <View style={styles.Textboxstyle}>
            <TextInputComponent
              placeholder="Venue"
              textValue={item.venue}
              onChangeText={text => updateCardData(item.id, 'venue', text)}
              CustomStyle={styles.textInput}
            />
          </View>
          <View style={styles.buttons}>
            <ButtonComponent
              buttonTitle="Select Date"
              onPress={() => updateCardData(item.id, 'isPickerOpen', true)}
              CustomStyle={{
                width: '50%',
                marginHorizontal: 5,
                marginBottom: 10,
              }}
            />
            <Text style={{margin: 10, color: 'black'}}>
              Selected Date & Time: {item.matchDate.toLocaleString()}
            </Text>
          </View>
          <Modal visible={item.isPickerOpen} transparent animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <DatePicker
                  date={item.matchDate}
                  onDateChange={date =>
                    updateCardData(item.id, 'matchDate', date)
                  }
                  textColor="black" // This should work to change the text color
                />
                <View style={styles.modalFooter}>
                  <Button
                    title="Confirm"
                    onPress={() =>
                      updateCardData(item.id, 'isPickerOpen', false)
                    }
                    color="#6200ee"
                  />
                  <Button
                    title="Cancel"
                    onPress={() =>
                      updateCardData(item.id, 'isPickerOpen', false)
                    }
                    color="#6200ee"
                  />
                </View>
              </View>
            </View>
          </Modal>
        </Card>
      );
    } else if (
      item.type === 'secondCard' ||
      item.type === 'thirdCard' ||
      item.type === 'fourthCard' ||
      item.type === 'fifthCard'
    ) {
      // i change things here
      return (
        <Card key={item.id}>
          <View style={styles.typeStyles}>
            <Text>{item.title}</Text>
          </View>

          <View style={styles.Textboxstyle}>
            <TextInputComponent
              placeholder="Venue"
              textValue={item.venue}
              onChangeText={text => updateCardData(item.id, 'venue', text)}
              CustomStyle={styles.textInput}
            />
          </View>
          <View style={styles.buttons}>
            <ButtonComponent
              buttonTitle="Select Date"
              onPress={() => updateCardData(item.id, 'isPickerOpen', true)}
              CustomStyle={{
                width: '50%',
                marginHorizontal: 5,
                marginBottom: 10,
              }}
            />
            <Text style={{margin: 10, color: 'black'}}>
              Selected Date & Time: {item.matchDate.toLocaleString()}
            </Text>
          </View>
          <Modal visible={item.isPickerOpen} transparent animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <DatePicker
                  date={item.matchDate}
                  onDateChange={date =>
                    updateCardData(item.id, 'matchDate', date)
                  }
                  mode="datetime"
                />
                <View style={styles.modalFooter}>
                  <Button
                    title="Confirm"
                    onPress={() =>
                      updateCardData(item.id, 'isPickerOpen', false)
                    }
                    color="#6200ee"
                  />
                  <Button
                    title="Cancel"
                    onPress={() =>
                      updateCardData(item.id, 'isPickerOpen', false)
                    }
                    color="#6200ee"
                  />
                </View>
              </View>
            </View>
          </Modal>
        </Card>
      );
    }
    return null;
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title="Create Fixtures" />
      {/* <Text style={styles.teamsText}>For 32 Teams</Text> */}
      <FlatList
        data={mergedCardsData}
        renderItem={renderCard}
        // keyExtractor={(item, index) => `card-${item.type}-${index}`}
        keyExtractor={item => item.id}
        ListFooterComponent={
          <View
            style={{
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ButtonComponent
              buttonTitle="Save"
              onPress={ScheduleDataForBackend}
              CustomStyle={{
                width: '50%',
                // marginHorizontal: 5,
                // marginBottom: 10,
              }}
            />
          </View>
        }
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
              extraData={
                cardsData.find(card => card.id === activeCardEdited)
                  ?.selectedTeams
              }
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
                onPress={() => setModalVisible(false)}
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
  rowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  teamsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    margin: 10,
  },
  groupstagetext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    margin: 10,
    marginBottom: -10,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
  },
  Textboxstyle: {
    justifyContent: 'center',
    margin: 5,
    marginTop: -5,
  },
  buttons: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
  },
  modalContent: {
    backgroundColor: 'black',
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
  teamText: {
    fontSize: 16,
    color: '#555',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  typeStyles: {
    alignItems: 'center',
    marginBottom: 10,
  },
});
