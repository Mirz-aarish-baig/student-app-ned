import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet,Image, ActivityIndicator,Pressable } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config'; 


const LoginScreen = () => {
  
  const navigation = useNavigation();
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [loading, setLoading] = useState(false);  

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful!");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login error: ", error.message);
      alert(error.message); 
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
        <Image
        source={require('../../assets/EDIFY.png')} 
        style={styles.welcomeImage}
      />
    
      <Text style={styles.heading}>Login to Edify</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

     
     
{loading ? (
  <ActivityIndicator size="large" color="#F5EBDD" />
) : (
  <Pressable style={styles.button} onPress={handleLogin}>
    <Text style={styles.buttonText}>Login</Text>
  </Pressable>
)}



      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.replace('Signup')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
   container: {
  flex: 1,
  backgroundColor: '#5f2d03ff',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},

heading: {
  fontSize: 35,
  color: '#F5EBDD',
  marginBottom: 40,
  fontWeight: 'bold',
  textAlign: 'center',
},

welcomeImage: {
  width: 200,
  height: 200,
  resizeMode: 'contain',
  marginBottom: 15,
},

input: {
  width: '100%',
  height: 48,
  backgroundColor: '#E8DED5',
  borderRadius: 10,
  marginBottom: 16,
  paddingHorizontal: 16,
  fontSize: 16,
  borderWidth: 0,
},

button: {
  width: '100%',
  height: 48,
  backgroundColor: '#F3E9DC',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  marginTop: 10,
},

buttonText: {
  color: '#5f2d03ff',
  fontSize: 18,
  fontWeight: '600',
},

signupText: {
  color: '#F5EBDD',
  marginTop: 18,
  fontSize: 15,
  textAlign: 'center',
},

signupLink: {
  color: '#FFD6A5',
  fontWeight: 'bold',
  textDecorationLine: 'underline',
},

  });
  

export default LoginScreen;