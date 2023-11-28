import axios from 'axios';
const API_URL = "http://wooboys.tplinkdns.com:3000"


const UserAPI = {
  createUser: async (name, phoneNumber, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/user`, {
        name: name,  // Pass the name as a string directly
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  },
  updatePhoneNumber: async (userId, phoneNumber, token) => {
    try {
      const response = await axios.put(`${API_URL}/user/${userId}/phoneNumber`, {
        phoneNumber: phoneNumber,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update phone number');
    }
  },

  updatePVerify: async (userId, pverify, token) => {
    try {
      const response = await axios.put(`${API_URL}/user/${userId}/pverify`, {
        pverify: pverify,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update pverify');
    }
  },

  updateEmail: async (userId, email, token) => {
    try {
      const response = await axios.put(`${API_URL}/user/${userId}/email`, {
        email: email,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update email');
    }
  },

  updateEVerify: async (userId, everify, token) => {
    try {
      const response = await axios.put(`${API_URL}/user/${userId}/everify`, {
        everify: everify,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update everify');
    }
  },

  updatePassword: async (userId, password, token) => {
    try {
      const response = await axios.put(`${API_URL}/user/${userId}/password`, {
        password: password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update password');
    }
  },

  getUserById: async (userId, token) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      return response.data.user;
    } catch (error) {
      throw new Error('Failed to get user by ID');
    }
  },
};

export default UserAPI;


