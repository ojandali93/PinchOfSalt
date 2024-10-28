import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Search, X } from 'react-native-feather'
import { TextInput } from 'react-native-gesture-handler'
import tailwind from 'twrnc'

interface SearchHeaderProps {
  searchTerm: string,
  changeSeearchTerm: (data: string) => void
  clearSearch: () => void,
  searchResults: any[]
}

const SearchHeader: React.FC<SearchHeaderProps> = ({searchTerm, changeSeearchTerm, clearSearch, searchResults}) => {

  const navigation = useNavigation()

  return (
    <View style={tailwind`w-full bg-slate-950 rounded-bl-5 rounded-br-5 pb-4`}>
      <View style={tailwind`mt-2 flex flex-row items-center px-4`}>
        <View style={tailwind`flex-1 bg-stone-100 p-1 rounded-full flex flex-row items-center mb-4`}>
          <TextInput 
            value={searchTerm}
            onChangeText={changeSeearchTerm}
            placeholder='Search Users...'
            placeholderTextColor={'#4f4f4f'}
            style={tailwind`flex-1 px-2`}
          />
          <TouchableOpacity onPress={() => {clearSearch()}} style={tailwind`p-2 bg-stone-500 rounded-full`}>
            <X height={16} width={16} color={'white'} style={tailwind``} />
          </TouchableOpacity>
        </View>
      </View>
      {
        searchResults.length > 0
          ? <ScrollView style={tailwind`w-full h-full`}>
              {
                searchResults.map((item) => {
                  return(
                    <TouchableOpacity onPress={() => navigation.navigate('SelectedProfileScreen', {user_id: item.user_id})} key={item.id} style={tailwind`w-full flex flex-row items-center py-3 border-b-2 border-b-slate-600 px-4`}>
                      <View style={tailwind`h-12 w-12`}>
                        <Image style={tailwind`flex-1 rounded-full`} source={{uri: item.profile_picture}}/>
                      </View>
                      <View style={tailwind`ml-3`}>
                        <Text style={tailwind`text-white text-base font-bold`}>{item.username}</Text>
                        <Text style={tailwind`text-white text-sm`}>{item.account_name}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          : null
      }
    </View>
  )
}

export default SearchHeader
