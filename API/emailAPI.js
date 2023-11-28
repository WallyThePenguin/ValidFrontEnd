import axios from 'axios';

const API_URL = 'http://wooboys.tplinkdns.com:3000';

const sendEmailVerification = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/email/sendverification`, {
      email: email,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to send email verification.');
  }
};

const verifyEmail = async (email, code) => {
  try {
    const response = await axios.post(`${API_URL}/email/verifyemail`, {
      email: email,
      code: code,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to verify email.');
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/email/sendpasswordreset`, {
      email: email,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to send password reset email.');
  }
};

const resetPassword = async (email, code, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/email/resetpassword`, {
      email: email,
      code: code,
      newPassword: newPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to reset password.');
  }
};

export { sendEmailVerification, verifyEmail, sendPasswordResetEmail, resetPassword };
