import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import tailwind from 'twrnc';
import TopLogin from '../../Components/Authentication/TopLogin';
import AuthInput from '../../Components/Inputs/Authentication/AuthInput';
import RedButton from '../../Components/Buttons/Authentication/RedButton';
import { useUser } from '../../Context/UserContext';
import { useNavigation } from '@react-navigation/native';
import FixedTopLogin from '../../Components/Authentication/FixedTopLogin';
import supabase from '../../Utils/supabase';
import { Heart } from 'react-native-feather';

const SignupScreen = () => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verifyPassword, setVerifyPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null); 

  const [loadingUsernameSearch, setLoadingUsernameSearch] = useState<boolean>(false)
  const [validUsername, setValidUsername] = useState<boolean>(true)
  const [validEmail, setValidEmail] = useState<boolean>(false)
  const [validPassword, setValidPassword] = useState<boolean>(false)
  const [validPasswordAndVerify, setValidPasswordAndVerify] = useState<boolean>(false)

  const navigation = useNavigation()

  const submitUserLogin = () => {
    validUsername && validPassword && validPasswordAndVerify && username.length > 0
      ? navigation.navigate('ProfileSetupScreen', {
                                                    username, 
                                                    firstName, 
                                                    lastName,
                                                    email,
                                                    password,
                                                    name: `${firstName} ${lastName}`,
                                                  })
      : Alert.alert('Invalid Information', 'There are some fields that are not valid. Correct and resubmit.')
  }

  const validateUsername = (data: string) => {
    setUsername(data)
    setValidUsername(false)
  }

  const validatePassword = (data: string) => {
    setPassword(data)
    const hasUpperCase = /[A-Z]/.test(data);
    const hasLowerCase = /[a-z]/.test(data);
    const hasNumber = /[0-9]/.test(data);
    setValidPassword(hasUpperCase && hasLowerCase && hasNumber)
  }

  const validateEmail = (data: string) => {
    setEmail(data)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data);
    setValidEmail(emailRegex)
  }

  const validateVerify = (data: string) => {
    setVerifyPassword(data)
    setValidPasswordAndVerify(data === password)
  }

  const checkValidUsername = async (username: string) => {
    setLoadingUsernameSearch(true)
    try {
      const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .ilike('username', username.toLowerCase());

      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      if (data && data.length > 0) {
        setValidUsername(false); // Username exists
        setLoadingUsernameSearch(false)
      } else {
        setValidUsername(true); // Username is available
        setLoadingUsernameSearch(false)
      }
    } catch (err) {
      console.error('An error occurred while checking the username:', err);
    }
  };


  // Function to handle user typing with debounce
  const handleInputChange = (value: string) => {
    setUsername(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout); // Clear the previous timeout if typing continues
    }

    // Set a new timeout to check username after 1.5 seconds
    setTypingTimeout(
      setTimeout(() => {
        checkValidUsername(value);
      }, 1500)
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjusts based on the platform
      style={tailwind`flex-1 bg-white`}
    >
      <ScrollView contentContainerStyle={tailwind`flex-grow`} showsVerticalScrollIndicator={false}>
        <FixedTopLogin header='Create Account' back={true}/>
        <View style={tailwind`w-full py-6 px-4`}>

          <View style={tailwind`w-full flex flex-row`}>
            <View style={tailwind`w-1/2 pr-2`}>
              <AuthInput
                icon='Type'
                valid={false}
                validation={false}
                placeholder='first name...'
                placeholderColor='grey'
                multi={false}
                secure={false}
                value={firstName}
                onChange={setFirstName}
                capitalization={false}
                loading={false}
              />
            </View>
            <View style={tailwind`w-1/2 pl-2`}>
              <AuthInput
                icon='Type'
                valid={false}
                validation={false}
                placeholder='last name...'
                placeholderColor='grey'
                multi={false}
                secure={false}
                value={lastName}
                onChange={setLastName}
                capitalization={false}
                loading={false}
              />
            </View>
          </View>

          {/* Username Input */}
          <View style={tailwind`mt-4`}>
            <AuthInput
              icon='User'
              valid={validUsername}
              validation={username.length > 0 ? true : false}
              placeholder='Username...'
              placeholderColor='grey'
              multi={false}
              secure={false}
              value={username}
              onChange={handleInputChange}
              capitalization={false}
              loading={loadingUsernameSearch}
            />
          </View>

          <View style={tailwind`mt-4`}>
            <AuthInput
              icon='Mail'
              valid={validEmail}
              validation={true}
              placeholder='Email...'
              placeholderColor='grey'
              multi={false}
              secure={false}
              value={email}
              onChange={validateEmail}
              capitalization={false}
              loading={false}
            />
          </View>

          {/* Password Input */}
          <View style={tailwind`mt-4`}>
            <AuthInput
              icon='Lock'
              valid={validPassword}
              validation={true}
              placeholder='Password...'
              placeholderColor='grey'
              multi={false}
              secure={true}
              value={password}
              onChange={validatePassword}
              capitalization={false}
              loading={false}
            />
          </View>

          <View style={tailwind`mt-4`}>
            <AuthInput
              icon='Lock'
              valid={validPasswordAndVerify}
              validation={true}
              placeholder='Password...'
              placeholderColor='grey'
              multi={false}
              secure={true}
              value={verifyPassword}
              onChange={validateVerify}
              capitalization={false}
              loading={false}
            />
          </View>

          {/* Login Button */}
          <View style={tailwind`mt-4`}>
            <RedButton loading={false} submit={submitUserLogin}/>
          </View>

          {/* Create Account Link */}
          <View style={tailwind`w-full flex flex-row justify-center items-center mt-3`}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={tailwind`ml-1 font-semibold text-red-500`}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
