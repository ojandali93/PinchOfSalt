import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import NameAndImageProfile from '../Profile/NameAndImageProfile'
import Bio from '../Profile/Bio'
import tailwind from 'twrnc'
import { useNavigation } from '@react-navigation/native'

interface UserProfileProps {
  profile: any
}

const AuthorDetails: React.FC<UserProfileProps> = ({profile}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => {navigation.navigate('SelectedProfileScreen', {user_id: profile.user_id})}} style={tailwind`mt-4`}>
      <Text style={tailwind`text-2xl font-bold mb-3`}>Author</Text>
      <NameAndImageProfile username={profile.username} accountName={profile.account_name} profilePicture={profile.profile_picture}/>
      <Bio bio={profile.bio} />
    </TouchableOpacity>
  )
}

export default AuthorDetails