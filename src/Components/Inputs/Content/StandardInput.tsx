import React from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import tailwind from 'twrnc'

interface RecipeInputProps {
  header?: string,
  value: string,
  updateInput: (data: string) => void,
  capitalize: "none" | "sentences" | "words" | "characters" | undefined,
  multi: boolean,
  placeholder: string,
  required: boolean,
  secure?: boolean
}

const StandardInput: React.FC<RecipeInputProps> = ({secure, value, updateInput, capitalize, multi, placeholder, required}) => {
  return (
    <View style={tailwind`w-full px-2`}>
      <TextInput 
        value={value}
        onChangeText={updateInput}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        autoCapitalize={capitalize}
        multiline={multi}
        style={tailwind`w-full border-b-2 border-b-stone-700 text-base pb-1 px-1`}
        secureTextEntry={secure}
      />
    </View>
  )
}

export default StandardInput
