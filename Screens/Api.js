
import axios from 'axios';

class Api {
  //baseURL: 'http://192.168.1.51/SportsManagementSystemBE/api/',
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://192.168.1.51/SportsManagementSystemBE/api/',
      timeout: 10000,
      headers: {
        'Content-type': 'application/json',
      },
    });
  }
//UsersAccount table Apis
  signup(user) {
    return this.apiClient.post('Users/SignupUser', user);
  }
  login(loginUser) {
    return this.apiClient.post('Users/LoginUser', loginUser);
  }


  //ChairpersonScreens
  addsession(sessiondetail) {
    return this.apiClient.post('Session/PostSession', sessiondetail);
  }
}

export default new Api();
