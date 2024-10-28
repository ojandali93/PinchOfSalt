import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import email from 'react-native-email';
import StandardInput from '../../Components/Inputs/Content/StandardInput';
import tailwind from 'twrnc';
import MainButton from '../../Components/Buttons/Content/MainButton';
import StandardHeader from '../../Components/Headers/StandardHeader';
import { useUser } from '../../Context/UserContext';

const FeedbackScreen = () => {
  const navigation = useNavigation();
  const { currentProfile } = useUser();
  const [message, setMessage] = useState<string>('');

  const handleMessage = (text: string) => {
    setMessage(text);
  };

  const submitForm = () => {
    const to = ['contact@grubber.io']; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      cc: [currentProfile?.email], // string or array of email addresses
      subject: 'Feedback / Suggestion',
      body: message,
      checkCanOpen: false, // Call Linking.canOpenURL prior to Linking.openURL
    }).catch(console.error);
  };

  return (
    <KeyboardAvoidingView
      style={tailwind`flex-1`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90} // Adjust this offset as needed
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tailwind`flex-1`}>
          <StandardHeader back={true} header='Feedback & Suggestions' />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={tailwind`flex-1 flex flex-col justify-end p-3`}>
              <View>
                <Text style={tailwind`text-2xl font-semibold`}>Feedback & Suggestions</Text>
                <Text style={tailwind`text-base mt-2`}>
                  Your feedback and suggestions are extremely important to us. It is critical to the success of Grubber long term. 
                  Your suggestions and feedback is what our team uses to improve all aspects of Grubber. Feel free to submit your feedback below. Thank you for taking the time 
                  to give us your feedback.
                </Text>
                <View style={tailwind`flex flex-row w-full justify-between items-center mt-3`}>
                  <Text style={tailwind`text-lg font-bold`}>Username:</Text>
                  <Text style={tailwind`text-base mt-3`}>{currentProfile?.username}</Text>
                </View>
                <View style={tailwind`flex flex-row w-full justify-between items-center mb-3`}>
                  <Text style={tailwind`text-lg font-bold`}>Email:</Text>
                  <Text style={tailwind`text-base mt-3`}>{currentProfile?.email}</Text>
                </View>
                <View>
                  <Text style={tailwind`text-lg font-bold mb-2 mt-3`}>Feedback: </Text>
                  <StandardInput
                    value={message}
                    updateInput={handleMessage}
                    placeholder='feedback...'
                    multi={true}
                    required={false}
                    capitalize='sentences'
                  />
                </View>
                <MainButton header='Submit Feedback' loading={false} clickButton={submitForm} />
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default FeedbackScreen;
