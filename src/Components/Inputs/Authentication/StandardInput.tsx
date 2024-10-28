import React from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import { CheckCircle, User } from 'react-native-feather'
import tailwind from 'twrnc'

const StandardInput = () => {
  return (
    <View style={tailwind`flex flex-row w-full p-4 bg-stone-100 rounded-3 border-2 border-stone-400`}>
      <User height={24} width={24} color={'black'} style={tailwind`mr-3`}/>
      <TextInput
        value=''
        onChangeText={() => {console.log('input')}}
        placeholder='text...'
        placeholderTextColor={'grey'}
        multiline={false}
        secureTextEntry={false}
        style={tailwind`flex-1 border-b-2 border-b-stone-500`}
      />
      <CheckCircle height={24} width={24} color={'green'} style={tailwind`ml-3`}/>
    </View>
  )
}

export default StandardInput
