import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { Plus } from 'react-native-feather'
import tailwind from 'twrnc'

interface MainButtonProps {
  header: string,
  clickButton: () => void,
  loading: boolean
}

const MainButton: React.FC<MainButtonProps> = ({header, clickButton, loading}) => {
  return (
    <View style={tailwind`w-full self-center mt-1`}>
      {
        loading 
          ? <View style={tailwind`w-full bg-red-500 p-2 mt-1 rounded-2 flex flex-row justify-center items-center`}>
              <ActivityIndicator size={'large'} color={'white'}/>
            </View>
          : <TouchableOpacity
              onPress={clickButton}
              style={tailwind`w-full bg-red-500 p-2 mt-1 rounded-2 flex flex-row justify-center items-center`}
            >
              <Text style={tailwind`text-white text-center text-base font-bold ml-2 py-1`}>
                {header}
              </Text>
            </TouchableOpacity>
      }
    </View>
  )
}

export default MainButton
