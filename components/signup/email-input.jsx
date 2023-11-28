import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const EmailInput = ({ handleEmailChange, email, error }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="E-mail"
          placeholderTextColor={error ? COLORS.error : COLORS.primary}
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, error && styles.labelError]}>E-mail</Text>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%',
    marginBottom: 10,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    paddingHorizontal: 16,
    marginTop: 10,
    backgroundColor: COLORS.background,
  },
  labelContainer: {
    position: 'absolute',
    marginLeft: 10,
    marginBottom: -10,
    top: 2,
    left: 2,
    backgroundColor: COLORS.background,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 12,
    color: COLORS.primary,
    paddingHorizontal: 5,
  },
  labelError: {
    color: COLORS.error,
  },
  inputError: {
    borderColor: COLORS.error, // Adjust the color for error state
  },
  errorText: {
    color: COLORS.error, // Adjust the color for error text
    marginTop: 5,
    fontSize: 12,
  },
});

export default EmailInput;