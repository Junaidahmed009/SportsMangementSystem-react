
import axios from 'axios';

class Api {
  //baseURL: 'http://192.168.1.51/SportsManagementSystemBE/api/',
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://192.168.1.47/SportsManagementSystemBE/api/',
      timeout: 10000,
      headers: {
        'Content-type': 'application/json',
      },
    });
  }
//UsersAccount
  signup(user) {
    return this.apiClient.post('Users/SignupUser', user);
  }
  login(loginUser) {
    return this.apiClient.post('Users/LoginUser', loginUser);
  }
  forgetpassword(userdetails){
    return this.apiClient.post('Users/Forgetpasswordverification',userdetails)
  }
  resetPassword(passwordDetails){
    return this.apiClient.post('Users/Submitnewpassword',passwordDetails)
  }


  //ChairpersonScreens
  addsession(sessiondetail) {
    return this.apiClient.post('Session/PostSession', sessiondetail);
  }
  //Rule of game Screen.
  fetchSports() {
    return this.apiClient.get('Chairperson/GetSports'); // Adjust the endpoint as needed
  }
}

export default new Api();
