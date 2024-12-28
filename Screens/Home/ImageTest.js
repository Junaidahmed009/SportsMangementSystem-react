// import {View, Text} from 'react-native';
// import React from 'react';
// import {SafeAreaViewComponent} from '../MyComponents';

// export default function ImageTest() {
//   const pickImage = () => {
//     launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
//       if (response.assets) {
//         setImageUri(response.assets[0].uri);
//       }
//     });
//   };
//   return (
//     <SafeAreaViewComponent>
//       <View style={styles.container}>
//         <ButtonComponent
//           buttonTitle="Pick Image"
//           onPress={pickImage}
//           CustomStyle={{
//             width: '50%',
//           }}
//         />

//         {imageUri && (
//           <View style={styles.card}>
//             <Image source={{uri: imageUri}} style={styles.image} />
//             <Text style={styles.cardText}>Selected Image</Text>
//           </View>
//         )}
//       </View>
//     </SafeAreaViewComponent>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: -20,
//   },
//   card: {
//     width: 380,
//     padding: 15,
//     marginVertical: 20,
//     borderRadius: 10,
//     backgroundColor: 'white',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5, // Adds shadow on Android
//     alignItems: 'center',
//   },
//   image: {
//     width: 350,
//     height: 200,
//     borderRadius: 10,
//   },
//   cardText: {
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });
