import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants';

const VerifyButton = ({ handlePress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Verify E-mail</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: COLORS.primary,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: COLORS.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
    },
    buttonText: {
      color: COLORS.background,
      fontSize: SIZES.medium,
    },
  });

export default VerifyButton;
