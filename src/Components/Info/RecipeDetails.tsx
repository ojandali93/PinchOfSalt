import React from 'react'
import { Text, View } from 'react-native'
import tailwind from 'twrnc'

interface RecipeDetailsProps {
  title: string,
  description: string
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({title, description}) => {
  return (
    <View style={tailwind`mt-5`}>
      <Text style={tailwind`text-2xl font-bold`}>{title}</Text>
      <Text style={tailwind`text-base font-base mt-2`}>{description}</Text>
    </View>
  )
}

export default RecipeDetails
