import axios from 'axios';
API_URL = "http://wooboys.tplinkdns.com:3000"

const performTokenRefresh = async (token) => {
    try {
      // Send a request to the server to refresh the token
      const response = await axios.post(`${API_URL}/refresh-token`, {
        token: token,
      },      {headers: {
        'Content-Type': 'application/json'
      }}
      );
  
      // Return the refresh token response from your API
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: 'Token refresh failed' };
    }
  };

export default performTokenRefresh;