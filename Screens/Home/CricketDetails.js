import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export default function CricketDetails() {
  return (
    <SafeAreaViewComponent>
      {/* App Bar */}
      <AppBarComponent
        title={'BIIT Sports'}
        handleBackPress={() => console.log('hello')}
      />

      {/* Match Cards */}
      <ScrollView contentContainerStyle={styles.content}>
        {matchData.map((match, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.matchTitle}>{match.title}</Text>
            <View style={styles.teamsContainer}>
              <Text style={styles.teamBox}>{match.teamA}</Text>
              <Text style={styles.vsText}>VS</Text>
              <Text style={styles.teamBox}>{match.teamB}</Text>
            </View>
            <Text style={styles.matchInfo}>{match.dateTime}</Text>
            <Text style={styles.matchStatus}>{match.status}</Text>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaViewComponent>
  );
}

// Sample match data
const matchData = [
  {
    title: 'Match 1 - Pindi Stadium',
    teamA: 'Shaheens',
    teamB: 'Fighters',
    dateTime: '12/11/2024 09:00am',
    status: 'Rain Delay',
  },
  {
    title: 'Match 2 - Carriage Factory',
    teamA: 'Gladiators',
    teamB: 'Eagles',
    dateTime: '22/2/2024 08:00am',
    status: 'Yet to be Played',
  },
  {
    title: 'Match 3 - Shalamar Ground',
    teamA: 'Pindiboys',
    teamB: 'Sharks',
    dateTime: '',
    status: 'Pindiboys defeated Sharks by 15 runs',
  },
];

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
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    textAlign: 'center',
    color: 'black',
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
