import React from 'react'
import { Image, Text, View } from 'react-native'
import tailwind from 'twrnc'
import Logo from '../../Assets/icon-red.png'

const TopLogin = () => {
  return (
    <View style={tailwind`flex-1 bg-slate-950 rounded-bl-5 rounded-br-5`}>
      <View style={tailwind`h-full flex flex-col items-center justify-center px-4`}>
        <Image style={tailwind`h-32 w-32`} source={Logo}/>
        <Text style={tailwind`text-3xl font-bold text-white mt-4`}>Dine With Me</Text>
        <Text style={tailwind`text-xl font-semibold text-white mt-2`}>Discovering Amazing Recipes</Text>
      </View>
    </View>
  )
}

export default TopLogin
