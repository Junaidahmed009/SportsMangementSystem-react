import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
import {Checkbox, RadioButton} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Football() {
  const [score, setScore] = useState('');
  const [overs, setOvers] = useState('');
  const [wickets, setWickets] = useState('');
  const [comments, setComments] = useState('');
  const [finalScore, setFinalScore] = useState(false);
  const [value, setValue] = useState('first');

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    {label: 'Option 1', value: '1'},
    {label: 'Option 2', value: '2'},
    {label: 'Option 3', value: '3'},
  ]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {label: 'Option A', value: 'A'},
    {label: 'Option B', value: 'B'},
    {label: 'Option C', value: 'C'},
  ]);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([
    {label: 'Red', value: 'red'},
    {label: 'Green', value: 'green'},
    {label: 'Blue', value: 'blue'},
  ]);

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title={'Scoring Football'} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.matchtext}>
          <Text style={styles.matchTitle}>Semi Final</Text>
        </View>

        {/* Teams */}
        <View style={styles.teamsContainer}>
          <TouchableOpacity style={styles.teamButton}>
            <Text style={styles.teamText}>Test1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.teamButton}>
            <Text style={styles.teamText}>Test2</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.battingTitle}>40 Minute Match</Text>

        {/* <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Score"
            keyboardType="numeric"
            value={score}
            onChangeText={setScore}
          />
          <TextInput
            style={styles.input}
            placeholder="Overs"
            keyboardType="numeric"
            value={overs}
            onChangeText={setOvers}
          />
          <TextInput
            style={styles.input}
            placeholder="Wickets"
            keyboardType="numeric"
            value={wickets}
            onChangeText={setWickets}
          />
        </View> */}

        {/* Comments */}
        <TextInput
          style={styles.commentsInput}
          placeholder="Add Comments"
          multiline
          value={comments}
          onChangeText={setComments}
        />
        {/* Dropdown Row */}
        <View style={styles.row}>
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
          <View style={styles.drop2}>
            <DropDownPicker
              open={open2}
              value={value2}
              items={items2}
              setOpen={setOpen2}
              setValue={setValue2}
              setItems={setItems2}
              placeholder="Hit By"
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
              placeholder="Defended"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>
        </View>
        {/* Final Score Checkbox */}
        <View style={styles.finalScoreContainer}>
          <Checkbox
            status={finalScore ? 'checked' : 'unchecked'}
            onPress={() => setFinalScore(!finalScore)}
          />
          <Text style={styles.finalScoreText}>Final Score</Text>
        </View>

        <Text style={styles.warningText}>
          Press final score when both innings are ended
        </Text>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>End Match</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  battingTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
    marginVertical: 10,
  },
  inputContainer: {
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
  },
  finalScoreText: {
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
  },
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
    flex: 1, // Makes the first dropdown take equal space
    marginHorizontal: 5, // Adds horizontal spacing between dropdowns
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
