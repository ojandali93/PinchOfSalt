import React from 'react'
import { Text, View } from 'react-native'
import { MoreHorizontal } from 'react-native-feather'
import tailwind from 'twrnc'

const Template = () => {
  return (
    <View style={tailwind`w-full h-18 bg-slate-950 rounded-bl-5 rounded-br-5`}>
      <View style={tailwind`h-full flex flex-row items-center justify-between px-4`}>
        <Text style={tailwind`text-2xl text-white font-semibold`}>Text Here</Text>
        <MoreHorizontal height={24} width={24} color={'white'}/>
      </View>
    </View>
  )
}

export default Template
