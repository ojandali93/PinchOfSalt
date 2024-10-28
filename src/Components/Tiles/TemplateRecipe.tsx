import React from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import tailwind from 'twrnc'
import Portrait from '../../Assets/portrait.jpg'
import { MoreHorizontal } from 'react-native-feather'

const imageWidth = Dimensions.get('screen').width
const imageHeight = imageWidth

const TemplateRecipe = () => {
  return (
    <View style={tailwind`w-full rounded-3 bg-stone-200 mb-4`}>
      <View style={tailwind`w-full h-14 flex flex-row justify-between items-center px-2`}> 
        <View style={tailwind`flex-1 h-full flex flex-row items-center`}>
          <Image style={tailwind`h-10 w-10 rounded-full border-2 border-stone-400`} source={Portrait}/>
          <View style={tailwind`ml-2`}>
            <Text style={tailwind`font-bold text-base`}>Username</Text>
            {/* <Text style={tailwind`text-sm`}>Account name </Text> */}
          </View>
        </View>
        <MoreHorizontal height={24} width={24} color={'black'}/>
      </View>
      <View style={[tailwind`w-full h-92 bg-green-300 rounded-3`, {height: imageHeight}]}>
        <Image style={tailwind`w-full h-full rounded-3`} source={{uri: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}}/>
      </View>
      <View style={[tailwind`absolute z-10 opacity-45 w-full h-92 bg-slate-900 rounded-3 mt-14`, {height: imageHeight}]}></View>
      <View style={[tailwind`absolute z-15 w-full h-92 mt-14 flex flex-col justify-between p-3`, {height: imageHeight}]}>
        <View style={tailwind`flex flex-row justify-between`}>
          <View />
          <Text style={tailwind`text-lg font-bold text-white`}>Yield: 8-10 Pancakes</Text>
        </View>
        <View>
          <Text style={tailwind`text-2xl font-bold text-white`}>Title</Text>
          <Text style={tailwind`text-lg text-white mb-3`}>This is a description of a recipe</Text>
          <View style={tailwind`flex flex-row justify-between items-center`}>
            <Text style={tailwind`text-lg font-bold text-white`}>Prep Time: min</Text>
            <Text style={tailwind`text-lg font-bold text-white`}>Cook Time: min</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default TemplateRecipe
