// import {View, Text} from 'react-native';
// import React from 'react';
// import {getUserData} from '../UsersAccount/UserData';

// export default function CricketFixtures() {
//   const userData = getUserData(); // Access the user data
//   return (
//     <>
//       <Text>{userData.id}</Text>
//       <Text>{userData.name}</Text>
//       <Text>{userData.registration_no}</Text>
//       <Text>{userData.role}</Text>
//     </>
//   );
// }

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  // Image,
} from 'react-native';
import {
  SafeAreaViewComponent,
  AppBarComponent,
  ButtonComponent,
  TextInputComponent,
} from '../MyComponents';
import {useNavigation} from '@react-navigation/native';
import {Checkbox} from 'react-native-paper';

export default function CricketScoring() {
  const navigation = useNavigation();

  const handlecrickethome = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent
        title={'Scoring Cricket'}
        handleBackPress={handlecrickethome}
      />

      <View style={styles.container}>
        <Text style={styles.matchText}>Match 1</Text>

        <View style={styles.teamContainer}>
          <TouchableOpacity style={styles.teamButton}>
            <Text style={styles.teamName}>Knights</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.teamButton}>
            <Text style={styles.teamName}>Fighters</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Knights - Batting</Text>

        <View style={styles.statsContainer}>
          <TextInputComponent
            placeholder="Score"
            // textValue={regno}
            // onChangeText={regno => setregno(regno)}
            CustomStyle={{
              // padding:20,
              width: '35%',
              // marginTop: 30,
              // marginHorizontal: 10,
            }}
          />
          {/* <Text style={styles.statText}>Score</Text> */}

          <TextInputComponent
            placeholder="Overs"
            // textValue={regno}
            // onChangeText={regno => setregno(regno)}
            CustomStyle={{
              // padding:20,
              width: '30%',
              // marginTop: 30,
              // marginHorizontal: 10,
            }}
          />
          {/* <Text style={styles.statText}>Overs</Text> */}

          <TextInputComponent
            placeholder="Wickets"
            // textValue={regno}
            // onChangeText={regno => setregno(regno)}
            CustomStyle={{
              // padding:20,
              width: '25%',
              // marginTop: 30,
              // marginHorizontal: 10,
            }}
          />
          {/* <Text style={styles.statText}>Wickets</Text> */}
        </View>

        <TextInput
          style={styles.commentBox}
          placeholder="Add Comments"
          multiline
          placeholderTextColor="#999"
        />

        <View style={styles.imageUploadContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageIcon}>
            {/* <Image
              source={{uri: 'your_image_icon_uri'}}
              style={styles.iconImage}
            /> */}
          </TouchableOpacity>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox value={true}></Checkbox>
          {/* <CheckBox /> */}
          <Text style={styles.checkboxLabel}>Final Score</Text>
        </View>

        <Text style={styles.warningText}>
          Press final score when both innings are ended
        </Text>

        <View style={styles.buttons}>
          <ButtonComponent
            buttonTitle="Save"
            // onPress={Eventmanagerdata}
            CustomStyle={{
              width: '50%',
              marginHorizontal: 5,
            }}
          />
          <ButtonComponent
            buttonTitle="End Match"
            // onPress={Eventmanagerdata}
            CustomStyle={{
              width: '50%',
              marginHorizontal: 5,
            }}
          />
        </View>
      </View>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  matchText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
    color: 'purple',
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  teamButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#6200ee',
    marginHorizontal: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  teamName: {
    fontSize: 16,
    color: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 12,
    color: 'purple',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  commentBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    textAlignVertical: 'top',
    height: 200,
    backgroundColor: 'white',
  },
  imageUploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    padding: 10,
    backgroundColor: '#6200ee',
    borderRadius: 20,
    marginRight: 10,
  },
  addButtonText: {
    color: 'white',
  },
  imageIcon: {
    padding: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    // justifyContent: 'center', // Center the checkbox horizontally
    marginVertical: 10, // Add some space
    marginTop: 80,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16, // Ensure the label is visible
    color: 'black',
  },
  warningText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // Allow buttons to wrap if there's not enough space
    marginTop: 20, // Add some top margin for spacing
  },
  buttons: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20,
  },
});
