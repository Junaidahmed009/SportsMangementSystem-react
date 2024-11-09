// UserData.js
let userData = null; // Initial state for user data

const storeUserData = data => {
  userData = data; // Function to set user data
};

const getUserData = () => userData; // Function to get user data

export {storeUserData, getUserData};
