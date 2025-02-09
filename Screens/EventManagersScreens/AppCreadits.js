import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

export default function AppCredits() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        // onPress={() => navigation.goBack()}
        style={styles.goBack}>
        <Text style={styles.goBackText}>←</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        {/* <FontAwesome name="user" size={50} color="#fff" /> */}
        <Text style={styles.name}>Prof Waqar Qaisar(RIP)</Text>
        {/* <Text style={styles.id}>ID: 123456</Text> */}
      </View>

      {/* Teacher's Picture */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../EventManagersScreens/RajaWaqar.png')} // Replace with your stored image path
          style={styles.image}
        />
      </View>

      {/* Memorial Message */}
      <Text style={styles.message}>
        A great teacher never truly leaves us. Their wisdom, kindness, and
        lessons stay in our hearts forever ❤️
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  goBack: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  goBackText: {
    fontSize: 30,
    color: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  id: {
    fontSize: 18,
    color: '#bdc3c7',
  },
  imageContainer: {
    width: 300,
    height: 350,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ecf0f1',
    fontStyle: 'italic',
  },
});
