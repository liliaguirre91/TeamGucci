import axios from 'axios'

//const USER_NAME = 'name' //This shoudl be the name entered by the user
//const USER_EMAIL = 'email' //This should be the email entered by the user
const USER_QUERY_URL = 'http://localhost:5555'
//const USER_INFO_URL = `${USER_QUERY_URL}/${USER_NAME}/${USER_EMAIL}`

class UserDataService {
   
   retrieveUserInfo(name, email) {
      return axios.get(USER_QUERY_URL + '/' + name + '/' + email);
   }
}

export default new UserDataService()
