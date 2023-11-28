import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { COLORS } from '../../constants/index';

const PasswordCheckPage = () => {
  const [customPassword, setCustomPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordScore, setPasswordScore] = useState(0);

  const generateStrongPassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=';
    let password = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }

    return password;
  };

  const calculatePasswordEntropy = (password) => {
    // Basic entropy calculation
    const charsetSize = 76; // Assuming 76 possible characters in the charset
    const passwordLength = password.length;
    const entropy = Math.log2(Math.pow(charsetSize, passwordLength));
    return entropy;
  };

  const updatePasswordScore = (password) => {
    // Criteria weights
    const lengthWeight = 2;
    const diversityWeight = 2;
    const entropyWeight = 4;
  
    // Length score
    const minLength = 8;
    const lengthScore = Math.min(password.length / minLength, 1) * lengthWeight;
  
    // Diversity score
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()-_+=]/.test(password);
  
    const diversityScore = (hasUpperCase + hasLowerCase + hasNumber + hasSpecialChar) / 4 * diversityWeight;
  
    // Calculate the entropy score based on provided ranges
    const entropy = calculatePasswordEntropy(password);
    let entropyScore;
  
    if (entropy < 35) {
      entropyScore = 1; // Weak and powerless against sophisticated attacks
    } else if (entropy >= 36 && entropy <= 59) {
      entropyScore = 2; // Moderately strong at best
    } else if (entropy >= 60 && entropy < 78) {
      entropyScore = 3; // A reasonable level of security
    } else if (entropy >= 78 && entropy < 96) {
      entropyScore = 4; // Difficult for most machines to crack
    } else if (entropy >= 96 && entropy < 128) {
      entropyScore = 5; // Needed for important cryptographic keys
    } else if (entropy >= 128 && entropy < 200) {
      entropyScore = 6; // Strong enough to withstand most brute force attacks
    } else if (entropy >= 200 && entropy <= 250) {
      entropyScore = 7; // A very strong password
    } else {
      entropyScore = 1; // Default score for unknown cases
    }
  
    // Calculate the overall score out of 10
    const overallScore = Math.round((lengthScore + diversityScore + entropyScore) * 10 / (lengthWeight + diversityWeight + entropyWeight));
  
    // Update the password score state
    setPasswordScore(overallScore);
  };

const checkPasswordStrength = () => {
  const passwordToCheck = customPassword || generateStrongPassword(); // Use custom password if provided, else generate a strong one

  // Update password strength and score
  setPasswordStrength(passwordToCheck);
  updatePasswordScore(passwordToCheck);
};
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Check Password Strength</Text>

        {/* Input field for custom password */}
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter custom password (optional)"
          secureTextEntry
          onChangeText={(text) => setCustomPassword(text)}
          value={customPassword}
        />

        {/* Display generated or custom password */}
        <Text style={styles.generatedPassword}>{passwordStrength}</Text>

        {/* Display password entropy */}
        <Text style={styles.entropy}>Entropy: {calculatePasswordEntropy(passwordStrength)}</Text>

        {/* Display password score */}
        <Text style={styles.score}>Password Score: {passwordScore}/10</Text>

        {/* Check Password Strength button */}
        <TouchableOpacity style={styles.checkButton} onPress={checkPasswordStrength}>
          <Text style={styles.checkButtonText}>Check Password Strength</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    marginTop: -200,
  },
  content: {
    width: '80%',
    marginTop: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: COLORS.primary,
  },
  passwordInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  generatedPassword: {
    fontSize: 18,
    marginBottom: 10,
    alignSelf: 'center',
  },
  entropy: {
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'center',
  },
  score: {
    fontSize: 16,
    marginBottom: 20,
    alignSelf: 'center',
  },
  checkButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  checkButtonText: {
    color: COLORS.white,
  },
});

export default PasswordCheckPage;
