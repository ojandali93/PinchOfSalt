import React from 'react'
import { Text, View } from 'react-native'
import * as Icons from 'react-native-feather';
import { TextInput } from 'react-native-gesture-handler';
import tailwind from 'twrnc';

interface LoginInputProps {
  label: string;
  value: string;
  handleFunction: (text: string) => void;
  secure: boolean;
  placeholder: string;
  multiline: boolean;
}

const EditInputTextComponent: React.FC<LoginInputProps> = (props) => {
  const {label, value, handleFunction, secure, placeholder, multiline} = props


  const IconComponent = Icons[label]

  return (
    <View 
      style={tailwind`flex flex-row items-center w-full border-b-2 bg-stone-500`}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'white'}
        autoCapitalize='none'
        returnKeyLabel='Done'
        secureTextEntry={secure}
        value={value}
        onChangeText={(text) => {handleFunction(text)}}
        multiline={multiline ? true : false}
        style={tailwind`flex-1 text-white text-base mb-2 pb-1 font-semibold`}
      />
    </View>
  )
}

export default EditInputTextComponent
