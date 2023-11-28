import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import EmailInput from '../../components/signup/email-input';
import PasswordInput from '../../components/signup/password-input';
import PhoneNumInput from '../../components/signup/phoneNumInput';
import SignupButton from '../../components/signup/signupBtn';
import { COLORS } from '../../constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAPI from '../../API/userAPI';
import login from '../../API/loginAPI';

const SignupPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError('');
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError('');
  };
  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
    setPhoneError('');
  };
  
  const handleSignup = async () => {
    // Regex pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regex pattern for password validation (at least 8 characters)
    const passwordPattern = /^.{8,}$/;
    // Regex pattern for phone number validation (10 digits)
    const phonePattern = /^\d{10}$/;
    
    let valid = true;

    // Perform regex validation for email, password, and phone number
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email format');
      valid = false;
    }
    if (!passwordPattern.test(password)) {
      setPasswordError('Length of password needs to be atleast 8');
      valid = false;
    }
    if (!phonePattern.test(phoneNumber)) {
      setPhoneError('Invalid format (10 digits)');
      valid = false;
    }
    
    if (!valid) {
      return;
    }
    
    // Perform signup logic here
    const response = await UserAPI.createUser({ phoneNumber: phoneNumber.toString(), email: email, password: password.toString() });
    if (response.exists === true) {
      console.log('User already exists');
      // Handle an already existing user.
    } else {
      const loginResponse = await login(email, password);
      if (loginResponse.success === true) {
        await AsyncStorage.setItem('token', loginResponse.token);
        await AsyncStorage.setItem('expiresIn', loginResponse.expiresIn);
        await AsyncStorage.setItem('userId', loginResponse.userId);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', loginResponse.password);
        router.push("/emailver");
      } else {
        router.push("/emailver");
      }
    }
  };
  
  const handleSignupPress = () => {
    handleSignup();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'signup',
          headerStyle: { backgroundColor: COLORS.background },
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Sign Up</Text>
        <EmailInput handleEmailChange={handleEmailChange} email={email} error={emailError} />
        <PhoneNumInput handlePhoneNumberChange={handlePhoneNumberChange} phoneNumber={phoneNumber} error={phoneError} />
        <PasswordInput handlePasswordChange={handlePasswordChange} password={password} error={passwordError} />
        <SignupButton handlePress={handleSignupPress} />
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
    marginTop: 0
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: "center",
    color: COLORS.primary
  },
});

export default SignupPage;
