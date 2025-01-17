import {useState, useEffect} from 'react';
import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, Image} from 'react-native';
import {
  SafeAreaViewComponent,
  AppBarComponent,
  BASE_URL,
} from '../MyComponents';
import {useNavigation} from '@react-navigation/native';
import Api from '../Api';
import {getUserData} from '../UsersAccount/UserData';

export default function CaptionTeams() {
  const navigation = useNavigation();
  const UserData = getUserData();
  const [Teamsdata, setTeamsdata] = useState([]);
  //   const [searchQuery, setSearchQuery] = useState('');
  //   const [Sporttitle, setsporttitle] = useState('Fixtures');

  const FetchCaptionTeams = async () => {
    const id = UserData.id;
    try {
      const response = await Api.fetchCaptionTeams(id);
      if (response.status === 200) {
        const results = response.data.results || response.data; // Handle cases where results key might not exist
        const TeamsData = results.map(item => ({
          Tname: item.Tname,
          teamStatus: item.teamStatus,
          image_path: item.image_path,
          className: item.className,
          sport: item.sport,
        }));
        setTeamsdata(TeamsData);
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
    FetchCaptionTeams();
  }, []);
  const handleHome = () => {
    navigation.navigate('UserHome');
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title={'Caption Teams'} handleBackPress={handleHome} />
      <ScrollView contentContainerStyle={styles.content}>
        {Teamsdata.map((team, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardContent}>
              {/* Left Section: Team Image */}
              <View style={styles.teamImageContainer}>
                <Image
                  source={{uri: `${BASE_URL}${team.image_path}`}}
                  style={styles.teamImage}
                />
              </View>

              {/* Right Section: Team Details */}
              <View style={styles.teamDetailsContainer}>
                <Text style={styles.teamName}>{team.Tname}</Text>
                <Text style={styles.detailText}>{team.className}</Text>
                <Text style={styles.detailText}>{team.sport}</Text>
                <Text style={styles.statusText}>
                  {team.teamStatus === true ? 'Approved' : 'Unapproved'}
                </Text>
              </View>
            </View>
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
    padding: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamImageContainer: {
    marginRight: 16,
  },
  teamImage: {
    width: 80, // Small rectangle size
    height: 80,
    borderRadius: 10,
  },
  teamDetailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
