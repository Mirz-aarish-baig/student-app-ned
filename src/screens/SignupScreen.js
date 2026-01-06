import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleSignup = async () => {

  if (!fullName || !whatsapp || !email || !password) {
    Alert.alert(
      'Incomplete Details',
      'Please fill all the fields to continue.'
    );
    return;
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    Alert.alert(
      'Invalid Email',
      'Please enter a valid email address.'
    );
    return;
  }

  if (password.length < 6) {
    Alert.alert(
      'Weak Password',
      'Password must be at least 6 characters long.'
    );
    return;
  }

  if (whatsapp.length < 10) {
    Alert.alert(
      'Invalid WhatsApp Number',
      'Please enter a valid WhatsApp number.'
    );
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      fullName,
      whatsapp,
      email,
      createdAt: new Date(),
    });

    Alert.alert(
      'Success 🎉',
      'Account created successfully!'
    );

    navigation.navigate('Login');

  } catch (error) {
    Alert.alert(
      'Signup Failed',
      error.message
    );
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/EDIFY.png')}
        style={styles.logo}
      />

      <Text style={styles.heading}>Create Account</Text>
      <Text style={styles.subHeading}>Track your subjects, marks & academic progress 🚀</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#999"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="WhatsApp Number"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        value={whatsapp}
        onChangeText={setWhatsapp}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

    
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text style={styles.loginLink} onPress={() => navigation.replace('Login')}>
          Login
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#5f2d03ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  heading: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },

  subHeading: {
    fontSize: 12,
    color: '#ddd',
    marginBottom: 30,
  },

  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 15,
  },

  button: {
    width: '100%',
    height: 52,
    backgroundColor: '#F3E9DC',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
  },

  buttonText: {
    color: '#5f2d03',
    fontSize: 18,
    fontWeight: 'bold',
  },

  loginText: {
    color: '#eee',
    marginTop: 25,
    fontSize: 14,
  },

  loginLink: {
    color: '#ffd7a8',
    fontWeight: 'bold',
  },
});
export default SignupScreen;
