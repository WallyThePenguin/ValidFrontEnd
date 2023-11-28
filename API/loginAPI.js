import axios from 'axios';
const API_URL = "http://wooboys.tplinkdns.com:3000"

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: email,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    new Error('Failed to login');
    return error;
  }
};

export default login;