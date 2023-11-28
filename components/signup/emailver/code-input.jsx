import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

const CodeInput = ({ handleCodeChange, code, error }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          value={code}
          onChangeText={handleCodeChange}
          keyboardType="numeric"
          placeholder="6 Digit Code"
          placeholderTextColor={COLORS.primary}
        />
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
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: COLORS.background,
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

export default CodeInput;
