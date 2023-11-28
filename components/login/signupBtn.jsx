import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const SignupButton = ({ handlePress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: COLORS.background,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: COLORS.text,
      paddingVertical: 12,
      paddingHorizontal: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
    },
    buttonText: {
      color: COLORS.primary,
      fontSize: SIZES.medium,
    },
  });

export default SignupButton;

