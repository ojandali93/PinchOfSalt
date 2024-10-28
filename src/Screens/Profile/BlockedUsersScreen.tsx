import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'
import StandardHeader from '../../Components/Headers/StandardHeader'
import { useUser } from '../../Context/UserContext'
import { useNavigation } from '@react-navigation/native'

const BlockedUsersScreen = () => {

  const {userBlocked} = useUser()
  const navigation = useNavigation()

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StandardHeader 
        header='Blocked Users'
        back={true}
      />
      <View style={tailwind`flex-1 bg-white`}>
        {
          userBlocked.map((list, index) => (
            <TouchableOpacity
              key={index}
              style={tailwind`w-full flex flex-row items-center mb-3 p-3`} // 3-column grid
              onPress={() => navigation.navigate('SelectedProfileScreen', {user_id: list.Profiles.user_id})}
            >
              <Image
                source={{ uri: list.Profiles.profile_picture }}
                style={tailwind`w-14 h-14 rounded-full`}
              />
              <View style={tailwind`flex-1 ml-3`}>
                <Text style={tailwind`text-base font-bold`}>{list.Profiles.username}</Text>
                <Text style={tailwind`text-base`}>{list.Profiles.account_name}</Text>
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  )
}

export default BlockedUsersScreen
