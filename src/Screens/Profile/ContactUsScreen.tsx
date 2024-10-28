import React, { useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useUser } from '../../Context/UserContext';
import email from 'react-native-email';
import tailwind from 'twrnc';
import StandardHeader from '../../Components/Headers/StandardHeader';
import MainButton from '../../Components/Buttons/Content/MainButton';
import EditInputTextComponent from '../../Components/Inputs/Content/EditInputTextComponent';
import RecipeInput from '../../Components/Inputs/Content/RecipeInput';
import StandardInput from '../../Components/Inputs/Content/StandardInput';

const ContactUsScreen = () => {
  const { currentProfile } = useUser();

  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubjext = (text: string) => {
    setSubject(text);
  };

  const handleMessage = (text: string) => {
    setMessage(text);
  };

  const submitForm = () => {
    const to = ['dinewithmeinc@gmail.com']; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      cc: [currentProfile.email], // string or array of email addresses
      subject: subject,
      body: message,
      checkCanOpen: false, // Call Linking.canOpenURL prior to Linking.openURL
    }).catch(console.error);
  };

  return (
    <KeyboardAvoidingView
      style={tailwind`flex-1 bg-white`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90} 
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tailwind`flex-1`}>
          <StandardHeader back={true} header='Contact Us' />
          <View style={tailwind`flex-1 flex flex-col justify-end p-3`}>
            <Text style={tailwind`text-2xl font-semibold`}>Contact Dine With Me</Text>
            <Text   style={tailwind` text-base mt-2`}>Need to contact us, simply fill out the form below with your details. Due to high volume, please give 24-48 hours for a response from a team member.</Text>
            <View  style={tailwind`flex flex-row w-full justify-between items-center mt-3`}>
              <Text style={tailwind` text-lg font-bold`}>Username:</Text>
              <Text style={tailwind` text-base mt-3`}>{currentProfile.username}</Text>
            </View>
            <View style={tailwind`flex flex-row w-full justify-between items-center mb-3`}>
              <Text style={tailwind` text-lg font-bold`}>Email:</Text>
              <Text style={tailwind` text-base mt-3`}>{currentProfile.email}</Text>
            </View>
            <View style={tailwind`w-full mt-3`}>
              <Text style={tailwind` text-lg font-bold mb-2`}>Subject: </Text>
              <StandardInput
                value={subject}
                updateInput={handleSubjext}
                placeholder='Subject...'
                multi={false}
                required={false}
                capitalize='sentences'
              />
            </View>
            <View>
              <Text style={tailwind` text-lg font-bold mb-2 mt-3`}>Message: </Text>
              <StandardInput
                value={message}
                updateInput={handleMessage}
                placeholder='message...'
                multi={true}
                required={false}
                capitalize='sentences'
              />
            </View>
            <View style={tailwind`mt-3`}>
              <MainButton header='Submit' loading={false} clickButton={() => {submitForm()}}/>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ContactUsScreen;
