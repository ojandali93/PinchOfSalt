import React from 'react'
import { ActivityIndicator, TextInput, View } from 'react-native'
import { CheckCircle } from 'react-native-feather'
import tailwind from 'twrnc'
import * as FeatherIcons from 'react-native-feather';


interface AuthInputProps {
  icon: string,
  validation: boolean,
  valid: boolean,
  multi: boolean,
  secure: boolean,
  placeholder: string,
  placeholderColor: string,
  value: string,
  onChange: (data: string) => void,
  loading: boolean,
  capitalization: boolean
}

const AuthInput: React.FC<AuthInputProps> = ({icon, validation, valid, multi, secure, placeholder, placeholderColor, value, onChange, capitalization, loading}) => {

  const IconComponent = FeatherIcons[icon]

  return (
    <View style={tailwind`flex flex-row w-full p-4 bg-stone-100 rounded-3 border-2 border-stone-400`}>
      {IconComponent && (
        <IconComponent height={24} width={24} color={'black'} style={tailwind`mr-3`} />
      )}
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        multiline={multi}
        secureTextEntry={secure}
        style={tailwind`flex-1 border-b-2 border-b-stone-500`}
        autoCapitalize={capitalization}
      />
      {
        validation ? loading ? <ActivityIndicator size={'small'} color={'black'}/> : <CheckCircle height={24} width={24} color={valid ? 'green' : 'red'} style={tailwind`ml-3`}/> : null 
      }
    </View>
  )
}

export default AuthInput
