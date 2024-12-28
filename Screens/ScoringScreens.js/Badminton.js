import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';

const Badminton = () => {
  // Image paths
  const images = [
    require('../images/5946c08f45a42.jpg'),
    require('../images/59362-pakistanteamcoverjpg-1511858515.jpg'),
    require('../images/images.jpeg'),
  ];

  return (
    <SafeAreaViewComponent>
      <AppBarComponent title={'Match Details'} />
      {/* Header */}
      {/* <Text style={styles.header}>Score Review</Text> */}
      {/* Match Title */}
      <Text style={styles.matchTitle}>Match 17</Text>
      {/* Teams */}
      <View style={styles.teamsContainer}>
        <View style={styles.teamBox}>
          <Text style={styles.teamText}>Knights</Text>
        </View>
        <Text style={styles.vsText}>vs</Text>
        <View style={styles.teamBox}>
          <Text style={styles.teamText}>Fighters</Text>
        </View>
      </View>
      {/* Comments */}
      <View style={styles.commentsContainer}>
        <Text style={styles.commentsHeader}>Comments</Text>
        <Text style={styles.commentText}>
          Great match! Both teams played well.
        </Text>
      </View>
      <View style={styles.commentsContainer}>
        <Text style={styles.commentsHeader}>Match Events</Text>
        <Text style={styles.commentText}>
          Amir riaz 6 to hassan ahmed,Qasim take wicket of hassan,Zahid 6 to
          hassan ahmed
        </Text>
      </View>
      {/* Moments Section */}
      <Text style={styles.momentsHeader}>Moments</Text>
      <ScrollView horizontal contentContainerStyle={styles.momentsContainer}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Text style={styles.timeText}>
              {index === 0 ? '10:45 AM' : index === 1 ? '11:00 AM' : '11:15 AM'}
            </Text>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      {/* Scores */}
      <View style={styles.scoresContainer}>
        <View style={styles.scoreBox}>
          <Text style={styles.teamName}>Knights</Text>
          <Text style={styles.scoreText}>220-5 (10)</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.teamName}>Fighters</Text>
          <Text style={styles.scoreText}>222-5 (10)</Text>
        </View>
      </View>
    </SafeAreaViewComponent>
  );
};

export default Badminton;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#6A42F4',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  matchTitle: {
    margin: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  // teamBox: {
  //   borderWidth: 1,
  //   borderColor: '#C1C1C1',
  //   borderRadius: 5,
  //   padding: 10,
  // },
  teamText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  vsText: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#000',
  },
  commentsContainer: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    // marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  commentsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
  momentsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#555',
    textAlign: 'center',
  },
  momentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageWrapper: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 60,
    borderRadius: 5,
  },
  scoresContainer: {
    marginBottom: 250,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  // scoreBox: {
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderColor: '#C1C1C1',
  //   borderRadius: 5,
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  // },
  teamName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  scoreText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});
