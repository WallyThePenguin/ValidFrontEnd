import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Stack, useNavigation, useRouter } from 'expo-router';
import { COLORS } from '../constants/index';
import EmailInput from '../components/login/email-input';
import LoginButton from '../components/login/loginBtn';
import SignupButton from '../components/login/signupBtn';
import PasswordInput from '../components/login/passwordInput';
import PassButton from '../components/login/passBtn';
import login from '../API/loginAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = async (email, password) => {
    // Perform login logic here with the email and password
    const response = await login(email, password);
    if (response && response.success === true) {
      try {
        await AsyncStorage.setItem('logged', 'true');
        await AsyncStorage.setItem('token', response.token);
        await AsyncStorage.setItem('expiresIn', response.expiresIn);
        await AsyncStorage.setItem('userId', response.userId);
        await AsyncStorage.setItem('password', response.password);
        router.push('/home');
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await AsyncStorage.setItem('logged', 'false');
        console.log('Login Failed');
      } catch (e) {
        console.log('Login Failed + Storage logged failed.');
        console.log(e);
      }
    }
    // You can replace the console.log statements with your own login logic

    // After successful login, navigate to the next screen
  };

  const handleLoginPress = () => {
    handleLogin(email, password);
  };

  const handleSignup = async () => {
    try {
      // Perform signup logic here
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      router.push('/signup');
    } catch (e) {
      console.log(e);
    }
  };
  const handlePasswordCheckPress = async () => {
    router.push('/password')
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'login',
          headerStyle: { backgroundColor: COLORS.background },
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
  
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <EmailInput handleEmailChange={handleEmailChange} email={email} />
          <PasswordInput
            handlePasswordChange={handlePasswordChange}
            password={password}
          />
  
          <View style={styles.buttonContainer}>
            <LoginButton handlePress={handleLoginPress} />
          </View>
        </View>
      </View>
  
      <View style={styles.signupContainer}>
        <SignupButton handlePress={handleSignup} />
      </View>
      <View style={styles.PassButtonContainer}>
      <PassButton handlePress={handlePasswordCheckPress} />
      </View>
    </SafeAreaView>
  );
  
  
  
  
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  formContainer: {
    width: '90%', // Adjust the width as desired
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%', // Set the width to 100%
  },
  signupContainer: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 10,
    width: '80%',
  },
  PassButtonContainer: {
    position: 'absolute',
    bottom: 100, // Adjust as needed for the distance from the bottom
    alignSelf: 'center',
  },
});





export default LoginPage;

