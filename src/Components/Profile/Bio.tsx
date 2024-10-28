import React from 'react'
import { Text, View } from 'react-native'
import tailwind from 'twrnc'

interface BioProps {
  bio: string
}

const Bio: React.FC<BioProps> = ({bio}) => {
  return (
    <View style={tailwind`mt-4`}>
      <Text style={tailwind`text-base`}>{bio}</Text>
    </View>
  )
}

export default Bio
