import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS } from '../../constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { verifyEmail, sendEmailVerification } from '../../API/emailAPI';
import VerifyButton from '../../components/signup/emailver/verifyBtn';
import ResendButton from '../../components/signup/emailver/resendBtn';
import CodeInput from '../../components/signup/emailver/code-input';

const EmailVerificationPage = () => {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('')
  useEffect(() => {
    // Function to perform async operation on page load
    const fetchData = async () => {
      try {
        // Retrieve the stored item from AsyncStorage
        await AsyncStorage.getItem('email')
        .then(async (value) => await sendEmailVerification(value));
        await AsyncStorage.getItem('email').then((value) =>setEmail(value))
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); // Call the function on page load
  }, []); // Empty dependency array ensures the effect runs only once
  const handleCodeChange = (text) => {
    setCode(text);
  };
  const handleVerification = async () => {
    const response = await verifyEmail(email, code)
    if (response.success == true){
        router.push('/home')
    }
    else if (response.verified == true){
        console.log("Already verified")
        router.push('/home')
    }
    else if (response.success == false) {
        console.log('Invalid Code')
    }
    else{
        console.log()
    }
  };
  const resendEmailVerification = async () => {
    try{
        await sendEmailVerification(email)
    }catch(e){
        console.log('Failed to resend email verification', e)
    }
  }
  const handlePress =() =>{
    handleVerification();
  }
  const handlePress2 = ()=>{
    resendEmailVerification();
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
        <Text style={styles.title}>Verify E-mail</Text>
        <CodeInput handleCodeChange={handleCodeChange} code={code}/>
        <VerifyButton handlePress={handlePress}/>
        <ResendButton handlePress={handlePress2}/>
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

export default EmailVerificationPage;