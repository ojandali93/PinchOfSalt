import React from 'react'
import { Image, Text, View } from 'react-native'
import tailwind from 'twrnc'

interface NameAndImageProps {
  username: string,
  accountName: string,
  profilePicture: string
}

const NameAndImageProfile: React.FC<NameAndImageProps> = ({username, accountName, profilePicture}) => {
  return (
    <View style={tailwind`flex flex-row items-center`}>
      <View style={tailwind`h-16 w-16`}>
        <Image alt='Profile Picture' style={tailwind`h-16 w-16 bg-stone-300 rounded-full`} source={{uri: profilePicture}} />
      </View>
      <View style={tailwind`ml-4`}>
        <Text style={tailwind`text-xl font-semibold`}>{username}</Text>
        <Text style={tailwind`text-base`}>{accountName}</Text>
      </View>
    </View>
  )
}

export default NameAndImageProfile
