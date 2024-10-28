import React from 'react'
import { Image, View } from 'react-native'
import tailwind from 'twrnc'
import Google from '../../Assets/google-black.png'
import Facebook from '../../Assets/facebook-black.png'
import Twitter from '../../Assets/twitter-black.png'

const LoginAlternatives = () => {
  return (
    <View style={tailwind`w-full flex flex-row justify-center items-center mt-1`}>
      <View style={tailwind`h-18 w-18 bg-stone-300 rounded-3 flex flex-row justify-center items-center`}>
        <Image style={tailwind`h-10 w-10`} source={Facebook}/>
      </View>
      <View style={tailwind`h-18 w-18 bg-stone-300 rounded-3 mx-3 flex flex-row justify-center items-center`}>
        <Image style={tailwind`h-10 w-10`} source={Google}/>
      </View>
      <View style={tailwind`h-18 w-18 bg-stone-300 rounded-3 flex flex-row justify-center items-center`}>
        <Image style={tailwind`h-10 w-10`} source={Twitter}/>
      </View>
    </View>
  )
}

export default LoginAlternatives
