import React, { useState } from 'react'
import { View, Text, Alert, ScrollView } from 'react-native'
import StandardHeader from '../../Components/Headers/StandardHeader'
import StandardInput from '../../Components/Inputs/Content/StandardInput'
import MainButton from '../../Components/Buttons/Content/MainButton'
import tailwind from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import supabase from '../../Utils/supabase'

const ResetPassword = () => {

  const navigation = useNavigation()

  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  // Password validation logic
  const validatePasswords = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please enter both password fields.')
      return false
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match. Please try again.')
      return false
    }
    return true
  }

  const handleResetPassword = async () => {
    if (!validatePasswords()) return

    setLoading(true)

    try {
      const {data: confirmData, error: confirmError} = await supabase.auth.updateUser({password: newPassword})
      if(confirmError){
        Alert.alert('Password Error', 'There was an issue updating your password. Please try again.')
      } else {
        Alert.alert('Success', 'Password has been reset.', [
          {text: 'Confirmed', onPress: () => navigation.goBack()},
        ])
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to reset the password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StandardHeader header='Reset Password' back={true}/>
      <ScrollView contentContainerStyle={tailwind`flex-1 justify-end px-2`}>
        <View style={tailwind`py-2`}>
          <Text style={tailwind`text-base px-2 font-bold`}>New Password: </Text>
          <StandardInput 
            value={newPassword}
            updateInput={setNewPassword}
            header='New Password'
            multi={false}
            capitalize='none'
            secure={true}  // Mask input for password
            placeholder='Enter new password'
            required={true}
          />
        </View>
        <View style={tailwind`py-2`}>
          <Text style={tailwind`text-base px-2 font-bold`}>Confirm Password: </Text>
          <StandardInput 
            value={confirmPassword}
            updateInput={setConfirmPassword}
            header='Confirm Password'
            multi={false}
            capitalize='none'
            secure={true}  // Mask input for password
            placeholder='Re-enter new password'
            required={true}
          />
        </View>
      </ScrollView>
      <View style={tailwind`p-2`}>
        <MainButton 
          header='Reset Password' 
          loading={loading} 
          clickButton={handleResetPassword}
        />
      </View>
    </View>
  )
}

export default ResetPassword
