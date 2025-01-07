import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaViewComponent,
  AppBarComponent,
  ButtonComponent,
  DropdownComponent,
} from '../MyComponents';
import Api from '../Api';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function CricketRegistration() {
  const navigation = useNavigation();
  const route = useRoute();
  const {teamId, userId, sportsid} = route.params;

  const [openCourse, setOpenCourse] = useState(false);
  const [openSection, setOpenSection] = useState(false);
  const [openSemNo, setOpenSemNo] = useState(false);
  const [valueCourse, setValueCourse] = useState(null);
  const [valueSection, setValueSection] = useState(null);
  const [valueSemNo, setValueSemNo] = useState(null);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]); // Selected player from Dropdown value or full data is saved here.
  const [regNosArray, setRegNosArray] = useState([]); // the selected player roll no is saved here

  const Courses = [
    {label: 'BCS', value: 'BCS'},
    {label: 'BSIT', value: 'BIT'},
    {label: 'BSCS(AI)', value: 'BSCS(AI)'},
    {label: 'BSSE', value: 'BSSE'},
  ];
  const Semesterno = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
  ];
  const Sections = [
    {label: 'A', value: 'A'},
    {label: 'B', value: 'B'},
    {label: 'C', value: 'C'},
    {label: 'D', value: 'D'},
    {label: 'E', value: 'E'},
  ];
  useEffect(() => {
    handleLoginUser();
  }, []);
  const [userGender, setuserGender] = useState(null);
  //this function is getting data of user and setting it. also setting the user name and reg no seprate and gender seprately.
  const handleLoginUser = async () => {
    if (!userId) {
      Alert.alert('Error', 'Some issue with User ID. Please try again later.');
      return;
    }

    const id = userId;
    try {
      const response = await Api.handleloginuser(id);
      if (response.status === 200) {
        Alert.alert('Welcome', 'Please now select the remaining players.');
        const userdata = [];
        response.data.forEach(user => {
          userdata.push({name: user.Name, reg_no: user.Reg_no});
          setuserGender(user.Gender);
        });
        setSelectedPlayers(prevPlayers => [...prevPlayers, ...userdata]);
        setRegNosArray(prevRegNos => [
          ...prevRegNos,
          ...userdata.map(user => user.reg_no),
        ]);
      } else {
        Alert.alert('Error', 'Unexpected response. Please try again.');
      }
    } catch (error) {
      Alert.alert('Networsfrwek Error', 'Failed to connect to the server.');
    }
  };
  // fetching students based on gender.
  const fetchStudents = async () => {
    if (!valueCourse || !valueSection || !valueSemNo) {
      Alert.alert('Please select all 3 fields');
      return;
    }
    // console.log(valueCourse, valueSection, valueSemNo, userGender);

    try {
      const Gender = userGender;
      const response = await Api.fetchstudents(
        valueCourse,
        valueSection,
        valueSemNo,
        Gender,
      );
      if (response.status === 200 && Array.isArray(response.data)) {
        Alert.alert('Check the list & Select players');
        const Studentdata = response.data.map(student => ({
          label: `${student.name} (${student.reg_no})`,
          value: student.reg_no,
          name: student.name,
          reg_no: student.reg_no,
        }));
        setItems1(Studentdata);
      } else {
        Alert.alert('Unexpected data format or response status:', response);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          Alert.alert('Not Found', 'No Students found.');
        } else {
          Alert.alert('Error', 'An unexpected error occurred.');
        }
      } else {
        // Network or other unexpected errors
        Alert.alert('Network Error', 'Failed to connect to the server.');
      }
    }
  };

  const playerLimitBySport = {
    1: 8,
    2: 8,
    4: 2,
    6: 2,
    7: 8,
    10: 2,
    12: 8,
  };
  const handleUserHome = () => {
    navigation.navigate('UserHome'); // Replace 'Home' with the correct route name
  };
  //getting player from dropdown and also max limit is allowed
  const GetPlayers = () => {
    if (!value1) {
      Alert.alert('Please select a value from Dropdown');
      return;
    }

    const maxPlayersAllowed = playerLimitBySport[sportsid];

    if (maxPlayersAllowed !== undefined) {
      if (selectedPlayers.length >= maxPlayersAllowed) {
        Alert.alert(
          'Player Limit Reached',
          `You can only select up to ${maxPlayersAllowed} players.`,
        );
        setValue1(null);
        return;
      }
    }

    const selectedPlayer = items1.find(item => item.value === value1);

    if (selectedPlayer && regNosArray.includes(selectedPlayer.reg_no)) {
      Alert.alert('Duplicate Player', 'This player has already been selected.');
      return;
    }

    if (selectedPlayer) {
      const playerToAdd = {
        name: selectedPlayer.name,
        reg_no: selectedPlayer.reg_no,
        value: selectedPlayer.value,
      };

      setSelectedPlayers(prevPlayers => [...prevPlayers, playerToAdd]);
      setRegNosArray(prevRegNos => [...prevRegNos, selectedPlayer.reg_no]);
      setValue1(null);
    } else {
      Alert.alert('No player found matching the current value1:', value1);
    }
  };

  const SavePlayerData = async () => {
    if (!regNosArray || regNosArray.length === 0) {
      Alert.alert('Please select some users');
      return;
    }

    const maxPlayersAllowed = playerLimitBySport[sportsid];
    if (
      maxPlayersAllowed !== undefined &&
      regNosArray.length > maxPlayersAllowed
    ) {
      Alert.alert(
        'Player Limit',
        `You can only select ${maxPlayersAllowed} players for this sport.`,
      );
      return;
    }

    const Playersdata = {
      RollNumbers: regNosArray,
      TeamNo: teamId,
    };

    try {
      const response = await Api.postPlayersdata(Playersdata);

      if (response.status === 201) {
        Alert.alert('Team Created.');
        handleUserHome();
      } else {
        Alert.alert('Unexpected response. Please try again.');
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        const {status, data} = error.response;

        if (status === 404) {
          Alert.alert(
            'Not Found',
            'Some players do not exist in the database.',
          );
        } else if (status === 409) {
          const rollno = data?.Rollno; // Extract roll number from response data
          Alert.alert(
            'Player Conflict',
            `Player with roll number ${rollno} is already part of another team for this sport.`,
          );
        } else {
          Alert.alert('Error', 'An unexpected error occurred.');
        }
      } else {
        Alert.alert('Network Error', 'Failed to connect to the server.');
      }
    }
  };

  const removePlayer = regNo => {
    setSelectedPlayers(prevPlayers =>
      prevPlayers.filter(player => player.reg_no !== regNo),
    );
    setRegNosArray(prevRegNos => prevRegNos.filter(reg => reg !== regNo));
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent
        title={'Players Selection'}
        handleBackPress={() => navigation.navigate('TeamRegistration')}
      />
      <View style={styles.dropdownRow}>
        <View style={styles.dropdownContainer}>
          <DropdownComponent
            CustomStyle={{width: '100%', height: 50}}
            dropDownContainerStyle={{
              width: '100%',
              position: 'absolute',
              zIndex: 10000,
            }}
            open={openCourse}
            value={valueCourse}
            items={Courses}
            setOpen={setOpenCourse}
            setValue={setValueCourse}
            placeholder="Course"
          />
        </View>
        <View style={styles.dropdownContainer}>
          <DropdownComponent
            CustomStyle={{width: '100%', height: 50}}
            dropDownContainerStyle={{
              width: '100%',
              position: 'absolute',
              zIndex: 10000,
            }}
            open={openSection}
            value={valueSection}
            items={Sections}
            setOpen={setOpenSection}
            setValue={setValueSection}
            placeholder="Section"
          />
        </View>
        <View style={styles.dropdownContainer}>
          <DropdownComponent
            CustomStyle={{width: '90%', height: 50}}
            dropDownContainerStyle={{
              width: '90%',
              position: 'absolute',
              zIndex: 10000,
            }}
            open={openSemNo}
            value={valueSemNo}
            items={Semesterno}
            setOpen={setOpenSemNo}
            setValue={setValueSemNo}
            placeholder="SemNo"
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <ButtonComponent
          buttonTitle="Get Students"
          onPress={fetchStudents}
          CustomStyle={{
            width: '50%',
            marginHorizontal: 5,
          }}
        />
      </View>

      <View style={styles.studentdropdown}>
        <DropdownComponent
          CustomStyle={{width: '95%', height: 50}}
          dropDownContainerStyle={{
            width: '95%',
            position: 'absolute',
          }}
          open={open1}
          value={value1}
          items={items1}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems1}
          placeholder="Select players"
          // onSelectItem={handleSelectItem} // Call the handler to add selected items to the array
          style={{width: '90%', height: 50}}
        />
      </View>
      <View style={styles.buttons}>
        <ButtonComponent
          buttonTitle="Get player"
          onPress={GetPlayers}
          CustomStyle={{
            width: '50%',
            marginHorizontal: 5,
          }}
        />
        <ButtonComponent
          buttonTitle="Save"
          onPress={SavePlayerData}
          CustomStyle={{
            width: '50%',
            marginHorizontal: 5,
          }}
        />
      </View>
      <View style={styles.FlatListstyle}>
        <FlatList
          data={selectedPlayers}
          keyExtractor={flat => flat.reg_no}
          renderItem={({item}) => (
            <View style={styles.listItemContainer}>
              <Text style={styles.listItemText}>
                {`${item.name} (${item.reg_no})`}
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removePlayer(item.reg_no)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyMessage}>No players selected</Text>
          )}
        />
      </View>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  buttons: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingTop: 20,
  },
  dropdownContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  studentdropdown: {
    alignSelf: 'center',
    alignItems: 'center',
    // paddingVertical: 20,
    // width: '80%',
    paddingTop: 10,
  },
  listItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flexShrink: 1,
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    minWidth: 70,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  FlatListstyle: {
    flex: 1,
    paddingTop: 10,
  },
});

//  get user function part
// const specialSportsIds = [3, 5, 8, 9, 11, 13];

// const userData = {
//   UserId: userId,
//   ...(specialSportsIds.includes(sportsid) ? {TeamNo: teamId} : {}),
// };

//-------------
