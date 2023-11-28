import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const PasswordInput = ({ handlePasswordChange, password }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor={COLORS.primary}
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Password</Text>
      </View>
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
});

export default PasswordInput;



