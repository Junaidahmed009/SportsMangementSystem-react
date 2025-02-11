// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Alert,
//   Button,
//   TextInput,
//   StyleSheet,
//   FlatList,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import Api from '../Api';

// export default function AdminGist() {
//   const navigation = useNavigation();
//   //   const route = useRoute();
//   //   const {value1} = route.params;
//   //   const [regno, setRegno] = useState('');
//   const [Finallists, setFinallists] = useState([]);
//   const [topScorer, settopScorer] = useState([]);
//   const [bestPlayer, setbestPlayer] = useState([]);
//   const [wicketTaker, setwicketTaker] = useState([]);
//   const [goalScoere, setgoalScoere] = useState([]);

//   const FetchUserdata = async () => {
//     try {
//       let value1 = 14;
//       const response = await Api.fetchGistAdmin(value1);
//       if (response.status === 200) {
//         const data = response.data;
//         setFinallists(data.finalList || []);
//         settopScorer(data.topScorer || []);
//         setbestPlayer(data.bestPlaye || []);
//         setwicketTaker(data.wicketTaker || []);
//         setgoalScoere(data.goalScoere || []);
//       } else {
//         Alert.alert('Error', `Unexpected response status: ${response.status}`);
//       }
//     } catch (error) {
//       if (error.response?.status === 400) {
//         Alert.alert('Error', 'Reg-no not found in student table');
//       } else if (error.response?.status === 404) {
//         Alert.alert('Info', 'No Data Found');
//       } else {
//         Alert.alert('Network error', 'Failed to connect to server.');
//       }
//     }
//   };
//   useEffect(() => {
//     FetchUserdata();
//   }, []);
//   const printdata = () => {
//     console.log(Finallists);
//     console.log(topScorer);
//     console.log(bestPlayer);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Button title="Search" onPress={printdata} color="#007bff" />
//     </SafeAreaView>
//   );
// }

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     padding: 20,
//   },
// });
import React, {useState, useEffect} from 'react';
import {View, Text, Alert, Button, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Api from '../Api';

export default function AdminGist() {
  const navigation = useNavigation();
  const [Finallists, setFinallists] = useState([]);
  const [topScorer, settopScorer] = useState([]);
  const [bestPlayer, setbestPlayer] = useState([]);
  const [wicketTaker, setwicketTaker] = useState([]);
  const [goalScoere, setgoalScoere] = useState([]);

  const FetchUserdata = async () => {
    try {
      let value1 = 14;
      const response = await Api.fetchGistAdmin(value1);
      if (response.status === 200) {
        const data = response.data;
        setFinallists(data.finalList || []);
        settopScorer(data.topScorer || []);
        setbestPlayer(data.bestPlaye || []);
        setwicketTaker(data.wicketTaker || []);
        setgoalScoere(data.goalScoere || []);
      } else {
        Alert.alert('Error', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        Alert.alert('Error', 'Reg-no not found in student table');
      } else if (error.response?.status === 404) {
        Alert.alert('Info', 'No Data Found');
      } else {
        Alert.alert('Network error', 'Failed to connect to server.');
      }
    }
  };

  useEffect(() => {
    FetchUserdata();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.card}>
      {Object.keys(item).map(key => (
        <Text key={key} style={styles.text}>
          {key}: {item[key]}
        </Text>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Admin Gist</Text>
      <Button title="Refresh Data" onPress={FetchUserdata} color="#007bff" />

      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.sectionTitle}>Final List</Text>
            <FlatList
              data={Finallists}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />

            <Text style={styles.sectionTitle}>Top Scorers</Text>
            <FlatList
              data={topScorer}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />

            <Text style={styles.sectionTitle}>Best Players</Text>
            <FlatList
              data={bestPlayer}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />

            <Text style={styles.sectionTitle}>Wicket Takers</Text>
            <FlatList
              data={wicketTaker}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />

            <Text style={styles.sectionTitle}>Goal Scorers</Text>
            <FlatList
              data={goalScoere}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        }
        data={[]}
        renderItem={null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
  },
});
