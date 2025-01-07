import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Api from '../Api';
import {ButtonComponent, SafeAreaViewComponent} from '../MyComponents';

export default function ImageTest() {
  const [imageUri, setImageUri] = useState(null);
  const [serverImagePath, setServerImagePath] = useState(null);

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo', quality: 2}, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'You cancelled image selection.');
      } else if (response.errorCode) {
        Alert.alert('Error', `Image selection error: ${response.errorMessage}`);
      } else if (response.assets && response.assets[0]) {
        const selectedImage = response.assets[0];
        setImageUri(selectedImage.uri);
        Alert.alert(
          'Confirm Upload',
          'Do you want to upload this image?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Upload',
              onPress: () => uploadImage(selectedImage), // Proceed to upload the image
            },
          ],
          {cancelable: false},
        );
      }
    });
  };

  const uploadImage = async image => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });

      // Call the Api.postimage function with the formData and headers
      const response = await Api.postimage(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const serverPath = response.data[0]; // Assuming the backend returns an array of paths
        setServerImagePath(serverPath);
        Alert.alert('Success', 'Image uploaded successfully!');
      } else {
        Alert.alert('Error', 'Failed to upload image to the server.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while uploading the image.');
    }
  };

  return (
    <SafeAreaViewComponent>
      <View style={styles.container}>
        <ButtonComponent
          buttonTitle="Pick Image"
          onPress={pickImage}
          CustomStyle={{
            width: '50%',
          }}
        />

        {imageUri && (
          <View style={styles.card}>
            <Image source={{uri: imageUri}} style={styles.image} />
            <Text style={styles.cardText}>Selected Image</Text>
          </View>
        )}

        {serverImagePath && (
          <Text style={styles.serverPathText}>
            Server Path: {serverImagePath}
          </Text>
        )}
      </View>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: -20,
  },
  card: {
    width: 380,
    padding: 15,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 200,
    borderRadius: 10,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  serverPathText: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
});

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
