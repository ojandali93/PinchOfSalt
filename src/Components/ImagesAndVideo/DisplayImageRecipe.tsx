import React from 'react'
import { Image, View } from 'react-native'
import tailwind from 'twrnc'

interface DispayImageProps {
  image: string
}

const DisplayImageRecipe: React.FC<DispayImageProps> = ({image}) => {
  return (
    <View style={tailwind`w-full h-80 rounded-2`}>
      <Image alt='Recipes Main Image' style={tailwind`flex-1 rounded-2`} source={{uri: image}} />
    </View>
  )
}

export default DisplayImageRecipe
