import {View, Text, StyleSheet, Button, Modal} from 'react-native';
import React, {useState} from 'react';
import {
  SafeAreaViewComponent,
  AppBarComponent,
  Card,
  TextInputComponent,
  DropdownComponent,
  ButtonComponent,
} from '../MyComponents';
import DatePicker from 'react-native-date-picker';

export default function CreateFixtures() {
  const [venue, setVenue] = useState('');
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([]);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([]);
  const [matchDate, setMatchDate] = useState(new Date());
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const openDatePicker = () => {
    setIsPickerOpen(true); // Open the picker modal
  };

  const confirmDate = selectedDate => {
    setMatchDate(selectedDate); // Set the selected date and time
    setIsPickerOpen(false); // Close the picker
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title={'Create Schedule'} />
      <Text style={styles.teamsText}>For 32 Teams</Text>
      <Card>
        <View style={styles.rowContainer}>
          <ButtonComponent
            buttonTitle="Select Teams"
            onPress={openDatePicker}
            CustomStyle={{
              width: '50%',
              marginHorizontal: 5,
            }}
          />
        </View>
        <View style={styles.Textboxstyle}>
          <TextInputComponent
            placeholder="Venue"
            textValue={venue}
            onChangeText={text => setVenue(text)}
            CustomStyle={styles.textInput}
          />
        </View>
        <View style={styles.buttons}>
          <ButtonComponent
            buttonTitle="Select Date"
            onPress={openDatePicker}
            CustomStyle={{
              width: '50%',
              marginHorizontal: 5,
            }}
          />
          <Text style={{margin: 10, color: 'black'}}>
            Selected Date & Time: {matchDate.toLocaleString()}
          </Text>
        </View>

        <Modal visible={isPickerOpen} transparent animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                width: 320,
                alignItems: 'center',
              }}>
              <DatePicker
                date={matchDate}
                onDateChange={setMatchDate}
                mode="datetime"
                style={{alignSelf: 'center'}} // Center the DatePicker
              />
              {/* Horizontal layout for buttons */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                  width: '100%',
                }}>
                <View style={{flex: 1, marginRight: 5}}>
                  <Button
                    title="Confirm"
                    onPress={() => confirmDate(matchDate)}
                    color="#6200ee"
                  />
                </View>
                <View style={{flex: 1, marginLeft: 5}}>
                  <Button
                    title="Cancel"
                    onPress={() => setIsPickerOpen(false)}
                    color="#6200ee"
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </Card>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  vsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  teamsText: {
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
  dropdown: {
    width: 150,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  dropDownContainer: {
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
    padding: 10,
  },
});

// import {View, Text, StyleSheet, FlatList, Modal, Button} from 'react-native';
// import React, {useState} from 'react';
// import {
//   SafeAreaViewComponent,
//   AppBarComponent,
//   Card,
//   TextInputComponent,
//   DropdownComponent,
//   ButtonComponent,
// } from '../MyComponents';
// import DatePicker from 'react-native-date-picker';

// export default function CreateFixtures() {
//   // Array to store unique state for each card
//   const [cardsData, setCardsData] = useState(
//     Array(16).fill({
//       team1: null,
//       team2: null,
//       venue: '',
//       matchDate: new Date(),
//       isPickerOpen: false,
//     }),
//   );

//   const teamList = [
//     {label: 'Team A', value: 'teamA'},
//     {label: 'Team B', value: 'teamB'},
//     // Add more teams...
//   ];

//   // Update the state for a specific card
//   const updateCardData = (index, key, value) => {
//     setCardsData(prev =>
//       prev.map((card, i) => (i === index ? {...card, [key]: value} : card)),
//     );
//   };

//   const renderCard = ({item, index}) => (
//     <Card key={index}>
//       <View style={styles.rowContainer}>
//         <View>
//           <DropdownComponent
//             open={open2}
//             value={value2}
//             items={items2}
//             setOpen={setOpen2}
//             setValue={setValue2}
//             setItems={setItems2}
//             placeholder="Select Team 1"
//             CustomStyle={styles.dropdown}
//             dropDownContainerStyle={styles.dropDownContainer}
//           />
//         </View>
//         <Text style={styles.vsText}>VS</Text>
//         <View>
//           <DropdownComponent
//             open={open1}
//             value={value1}
//             items={items1}
//             setOpen={setOpen1}
//             setValue={setValue1}
//             setItems={setItems1}
//             placeholder="Select Team 2"
//             CustomStyle={styles.dropdown}
//             dropDownContainerStyle={styles.dropDownContainer}
//           />
//         </View>
//       </View>
//       <View style={styles.Textboxstyle}>
//         <TextInputComponent
//           placeholder="Venue"
//           textValue={venue}
//           onChangeText={text => setVenue(text)}
//           CustomStyle={styles.textInput}
//         />
//       </View>
//       <View style={styles.buttons}>
//         <ButtonComponent
//           buttonTitle="Select Date"
//           onPress={openDatePicker}
//           CustomStyle={{
//             width: '50%',
//             marginHorizontal: 5,
//           }}
//         />
//         <Text style={{margin: 10, color: 'black'}}>
//           Selected Date & Time: {matchDate.toLocaleString()}
//         </Text>
//       </View>

//       <Modal visible={isPickerOpen} transparent animationType="slide">
//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           }}>
//           <View
//             style={{
//               backgroundColor: 'white',
//               padding: 20,
//               borderRadius: 10,
//               width: 320,
//               alignItems: 'center',
//             }}>
//             <DatePicker
//               date={matchDate}
//               onDateChange={setMatchDate}
//               mode="datetime"
//               style={{alignSelf: 'center'}} // Center the DatePicker
//             />
//             {/* Horizontal layout for buttons */}
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 marginTop: 20,
//                 width: '100%',
//               }}>
//               <View style={{flex: 1, marginRight: 5}}>
//                 <Button
//                   title="Confirm"
//                   onPress={() => confirmDate(matchDate)}
//                   color="#6200ee"
//                 />
//               </View>
//               <View style={{flex: 1, marginLeft: 5}}>
//                 <Button
//                   title="Cancel"
//                   onPress={() => setIsPickerOpen(false)}
//                   color="#6200ee"
//                 />
//               </View>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </Card>
//   );

//   return (
//     <SafeAreaViewComponent>
//       <AppBarComponent title="Create Schedule" />
//       <Text style={styles.teamsText}>For 32 Teams</Text>
//       <FlatList
//         data={cardsData}
//         renderItem={renderCard}
//         keyExtractor={(item, index) => `card-${index}`}
//       />
//     </SafeAreaViewComponent>
//   );
// }

// const styles = StyleSheet.create({
//   rowContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   vsText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   teamsText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000',
//     margin: 10,
//     marginBottom: -10,
//   },
//   textInput: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     padding: 15,
//   },
//   Textboxstyle: {
//     justifyContent: 'center',
//     margin: 5,
//     marginTop: -5,
//   },
//   dropdown: {
//     width: 150,
//     height: 50,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     backgroundColor: '#f9f9f9',
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//     marginHorizontal: 10,
//   },
//   dropDownContainer: {
//     width: 150,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: 320,
//     alignItems: 'center',
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//     width: '100%',
//   },
// });

// // <View style={styles.rowContainer}>
// //   {/* Dropdown for Team 1 */}
// //   <DropdownComponent
// //     value={item.team1}
// //     items={teamList}
// //     setValue={value => updateCardData(index, 'team1', value)}
// //     placeholder="Select Team 1"
// //     CustomStyle={styles.dropdown}
// //     dropDownContainerStyle={styles.dropDownContainer}
// //   />
// //   <Text style={styles.vsText}>VS</Text>
// //   {/* Dropdown for Team 2 */}
// //   <DropdownComponent
// //     value={item.team2}
// //     items={teamList}
// //     setValue={value => updateCardData(index, 'team2', value)}
// //     placeholder="Select Team 2"
// //     CustomStyle={styles.dropdown}
// //     dropDownContainerStyle={styles.dropDownContainer}
// //   />
// // </View>;

// // {
// //   /* Venue Input */
// // }
// // <View style={styles.Textboxstyle}>
// //   <TextInputComponent
// //     placeholder="Venue"
// //     textValue={item.venue}
// //     onChangeText={text => updateCardData(index, 'venue', text)}
// //     CustomStyle={styles.textInput}
// //   />
// // </View>;

// // {
// //   /* Date Picker */
// // }
// // <View style={styles.buttons}>
// //   <ButtonComponent
// //     buttonTitle="Select Date"
// //     onPress={() => updateCardData(index, 'isPickerOpen', true)}
// //     CustomStyle={{width: '50%', marginHorizontal: 5}}
// //   />
// //   <Text style={{margin: 10, color: 'black'}}>
// //     Selected Date & Time: {item.matchDate.toLocaleString()}
// //   </Text>
// // </View>;

// // {
// //   /* Modal for Date Picker */
// // }
// // <Modal visible={item.isPickerOpen} transparent animationType="slide">
// //   <View style={styles.modalOverlay}>
// //     <View style={styles.modalContent}>
// //       <DatePicker
// //         date={item.matchDate}
// //         onDateChange={date => updateCardData(index, 'matchDate', date)}
// //         mode="datetime"
// //       />
// //       <View style={styles.modalButtons}>
// //         <Button
// //           title="Confirm"
// //           onPress={() => updateCardData(index, 'isPickerOpen', false)}
// //           color="#6200ee"
// //         />
// //         <Button
// //           title="Cancel"
// //           onPress={() => updateCardData(index, 'isPickerOpen', false)}
// //           color="#6200ee"
// //         />
// //       </View>
// //     </View>
// //   </View>
// // </Modal>;
