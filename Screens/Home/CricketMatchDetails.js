import React from 'react';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function CricketMatchDetails() {
  return (
    <SafeAreaViewComponent>
      <AppBarComponent
        title={'BIIT Sports'}
        handleBackPress={() => console.log('hello')}
      />
      <ScrollView style={styles.container}>
        {/* Header */}
        <Text style={styles.header}>Score Review</Text>

        {/* Match Info */}
        <Text style={styles.matchTitle}>Match 2</Text>
        <View style={styles.teamsContainer}>
          <TouchableOpacity style={styles.teamButton}>
            <Text style={styles.teamText}>Shaheens</Text>
          </TouchableOpacity>
          <Text style={styles.vsText}>vs</Text>
          <TouchableOpacity style={styles.teamButton}>
            <Text style={styles.teamText}>Gladiators</Text>
          </TouchableOpacity>
        </View>

        {/* Comments */}
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsTitle}>Comments</Text>
          <View style={styles.commentBox}>
            <Text style={styles.commentText}>Raza 70(30),ali 12-3(2.5)</Text>
          </View>
        </View>

        {/* Moments */}
        <Text style={styles.momentsTitle}>Moments</Text>
        <View style={styles.momentsContainer}>
          <Image
            source={{uri: 'https://via.placeholder.com/150'}}
            style={styles.momentImage}
          />
          <Image
            source={{uri: 'https://via.placeholder.com/150'}}
            style={styles.momentImage}
          />
          <Image
            source={{uri: 'https://via.placeholder.com/150'}}
            style={styles.momentImage}
          />
        </View>

        {/* Score Summary */}
        <View style={styles.scoreContainer}>
          <View style={styles.scoreBox}>
            <Text style={styles.teamText}>Shaheens</Text>
            <Text style={styles.scoreText}>125-2 (10)</Text>
          </View>
          <View style={styles.scoreBox}>
            <Text style={styles.teamText}>Gladiators</Text>
            <Text style={styles.scoreText}>120-6 (10)</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4B4B4B',
  },
  matchTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
    marginBottom: 10,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  teamButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  teamText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
    color: 'black',
  },
  vsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  commentsContainer: {
    marginBottom: 20,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: 'black',
  },
  commentBox: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  commentText: {
    fontSize: 16,
    color: '#333',
  },
  momentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: 'black',
  },
  momentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  momentImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  scoreBox: {
    alignItems: 'center',
    padding: 10, // Add padding for spacing inside the box
    borderWidth: 1, // Add border width to create the box outline
    borderColor: 'black', // Set border color
    borderRadius: 10, // Optional: Add rounded corners
    margin: 5, // Optional: Add margin for spacing between boxes
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
});
