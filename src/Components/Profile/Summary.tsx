import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'

interface SummaryProps {
  following: number,
  followers: number,
  recipes: number,
  lists: number,
  onSelect: (data: string) => void
}

const Summary: React.FC<SummaryProps> = ({followers, following, recipes, lists, onSelect}) => {
  return (
    <View style={tailwind`flex flex-row mt-4 justify-between px-4`}>
      <TouchableOpacity onPress={() => onSelect('Following')} style={tailwind`flex items-center`}>
        <Text style={tailwind`text-base font-semibold`}>{following}</Text>
        <Text style={tailwind`text-base mt-1`}>Following</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect('Followers')} style={tailwind`flex items-center`}>
        <Text style={tailwind`text-base font-semibold`}>{followers}</Text>
        <Text style={tailwind`text-base mt-1`}>Followers</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect('Recipes')} style={tailwind`flex items-center`}>
        <Text style={tailwind`text-base font-semibold`}>{recipes}</Text>
        <Text style={tailwind`text-base mt-1`}>Recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect('Lists')} style={tailwind`flex items-center`}>
        <Text style={tailwind`text-base font-semibold`}>{lists}</Text>
        <Text style={tailwind`text-base mt-1`}>Lists</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Summary
