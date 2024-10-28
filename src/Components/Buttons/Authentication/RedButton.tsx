import React from 'react'
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { CheckCircle, User } from 'react-native-feather'
import tailwind from 'twrnc'

interface RedButtonProps {
  submit: () => void,
  loading: boolean
}

const RedButton: React.FC<RedButtonProps> = ({submit, loading}) => {
  return (
    <>
      {
        loading
            ? <TouchableOpacity onPress={() => {}} style={tailwind`flex flex-row justify-center items-center w-full py-3 bg-red-500 rounded-3`}>
                <ActivityIndicator size={'small'} color={'white'}/>
              </TouchableOpacity>
          : <TouchableOpacity onPress={submit} style={tailwind`flex flex-row justify-center items-center w-full py-3 bg-red-500 rounded-3`}>
              <Text style={tailwind`text-lg font-bold text-white`}>Login</Text>
            </TouchableOpacity>
      }
    </>
  )
}

export default RedButton
