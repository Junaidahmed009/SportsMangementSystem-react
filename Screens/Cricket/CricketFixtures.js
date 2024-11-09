import {View, Text} from 'react-native';
import React from 'react';
import {getUserData} from '../UsersAccount/UserData';

export default function CricketFixtures() {
  const userData = getUserData(); // Access the user data
  return (
    <>
      <Text>{userData.id}</Text>
      <Text>{userData.name}</Text>
      <Text>{userData.registration_no}</Text>
      <Text>{userData.role}</Text>
    </>
  );
}

// const Screen1 = () => {
//   const userData = getUserData(); // Access the user data

//   return (
//     <View>
//       {userData ? (
//         <>
//           <Text>Welcome, {userData.name}!</Text>
//           <Text>Roll No: {userData.rollno}</Text>
//         </>
//       ) : (
//         <Text>No user data available.</Text>
//       )}
//     </View>
//   );
// };

// export default Screen1;
