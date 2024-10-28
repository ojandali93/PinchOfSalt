import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { ChevronLeft } from 'react-native-feather'
import tailwind from 'twrnc'

interface FixedTopLoginProps {
  header: string,
  back: boolean
}

const FixedTopLogin: React.FC<FixedTopLoginProps> = ({header, back}) => {

  const navigation = useNavigation()

  return (
    <View style={tailwind`flex-1 bg-slate-950 rounded-bl-5 rounded-br-5`}>
      <View style={tailwind`h-full flex flex-row items-start justify-start px-4`}>
        <View style={tailwind`flex flex-row items-center mt-3`}>
          {
            back
              ? <TouchableOpacity onPress={() => navigation.goBack()} style={tailwind``}>
                  <ChevronLeft height={28} width={28} color={'white'}/>
                </TouchableOpacity>
              : null
          }
          <Text style={tailwind`text-3xl font-bold text-white ml-3`}>{header}</Text>
        </View>
      </View>
    </View>
  )
}

export default FixedTopLogin
