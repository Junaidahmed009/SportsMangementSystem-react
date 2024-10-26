
import axios from 'axios';

class Api {
  //baseURL: 'http://192.168.1.51/SportsManagementSystemBE/api/',
  constructor() {
    this.apiClient = axios.create({
     
      baseURL: 'http://192.168.93.132/SportsManagementSystemBE/api/',
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
    return this.apiClient.put('Users/Submitnewpassword',passwordDetails)
  }


  //ChairpersonScreens
  addsession(sessiondetail) {
    return this.apiClient.post('Session/PostSession', sessiondetail);
  }

  eventmanagerdata(data) {
    return this.apiClient.post('Sports/PostEventManagers', data);
  }
  //Rule of game Screen.
  fetchSports() {
    return this.apiClient.get('Sports/GetSports'); 
  }
  fetchrules(Sportsid) {
    return this.apiClient.get('Rules/FetchRules', { params: { Sportsid } }); 
}
  rulesofgames(saverules) {
    return this.apiClient.post('Rules/UpdateRules',saverules);
  }
  //EventManagerSelection screen.
  getsportsandmanger() {
    return this.apiClient.get('Sports/GetSportsandManagers'); 
  }
  savedata(data) {
    return this.apiClient.post('Sports/SaveManagersdata',data);
  }

}

export default new Api();
