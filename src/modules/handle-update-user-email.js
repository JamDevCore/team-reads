import axios from 'axios';
import Auth from './Auth';
let modulePromise;


const { REACT_APP_AUTH_0_BEARER_TOKEN } = process.env;

const auth = new Auth();

const updateUserEmail = ({ userId, email }, promise) => {
  modulePromise = promise;
  try {
    axios({
      method: 'patch',
      url: `https://jamesvitaly.eu.auth0.com/api/v2/users/${userId}`,
      mode: 'cors',
      data: {
        "email": email,
      },
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${REACT_APP_AUTH_0_BEARER_TOKEN}`,
      },
    })
    .then((res )=> {
      console.log(res)
      modulePromise.resolve(res);
    })
    .catch((err) => {
      console.log(err)
      modulePromise.reject(err)
    })
  } catch (exception) {
    modulePromise.reject({
      type: 'handleUpdateUserEmail.updateUserEmail',
      reason: exception,
    });
  }
};

const handleUpdateUserEmail = ({ userId, email }) => new Promise((resolve, reject) => {
  updateUserEmail({ userId, email }, { resolve, reject });
});

export default handleUpdateUserEmail;
