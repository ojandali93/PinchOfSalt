import React from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import tailwind from 'twrnc'

interface RecipeInputProps {
  header: string,
  value: string,
  updateInput: (data: string) => void,
  capitalize: "none" | "sentences" | "words" | "characters" | undefined,
  multi: boolean,
  placeholder: string
}

const CollectionInput: React.FC<RecipeInputProps> = ({header, value, updateInput, capitalize, multi, placeholder}) => {
  return (
    <View style={tailwind`w-full px-2`}>
      <Text style={tailwind`text-lg font-bold text-black`}>{header}</Text>
      <TextInput 
        value={value}
        onChangeText={updateInput}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        autoCapitalize={capitalize}
        multiline={multi}
        style={tailwind`w-full border-b-2 border-b-stone-700 mt-1 text-base pb-1 px-1`}
      />
    </View>
  )
}

export default CollectionInput
