import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StandardHeader from '../../Components/Headers/StandardHeader';
import tailwind from 'twrnc';
import MainButton from '../../Components/Buttons/Content/MainButton';
import Logo from '../../Assets/icon-red.png'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const AboutScreen = () => {
  const navigation = useNavigation()

  const openWebsite = () => {
    Linking.canOpenURL('https://grubber.io').then(() => {
      Linking.openURL('https://grubber.io');
    });
  }

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StandardHeader back={true} header='Feedback & Suggestions'/>
      <View style={tailwind`flex-1 flex flex-col justify-end`}>
        <ScrollView style={tailwind`flex-1 px-2`}>
          <View style={tailwind`w-full flex flex-col justify-end items-center pt-12 pb-8`}>
            <Image style={tailwind` h-24 w-24 `} source={Logo}/>
          </View>
          <Text style={tailwind`text-2xl font-bold`}>Pinch of Salt Inc.</Text>
          <Text style={tailwind`text-lg font-semibold`}>Bringing amazing recipes to the world.</Text>
          <Text style={tailwind`text-base`}>Version: 1.0.1</Text>
          <Text style={tailwind`text-base`}>Established: Oct. 1, 2024</Text>
          <Text style={tailwind`text-base mt-2`}>Pinch of Salt was designed, debeloped, and release with one goal in mind. Bringing incredible and amamzing recipes to the world. from 
            simple recipes like scrambled eggs to more complex recipes like the beef wellinging. We can want spread amamzing food recipes for those who love to cook as well as those 
            who want to start cooking.
          </Text>
          <Text style={tailwind`text-base mt-2`}>With all mainstream socual media, it is easy to get lost in the clutter that is being posted without a dedicated place to share food 
            recipes and experiences that deserve to be shared. We also want to make it easier than ever to be able to store your favorite food recipes through hand created and 
            curated lists that categorize and organize your favorite food recipes. You will be able to easy look for and find your favorite recipes by clicking your lists. Do you have
            any recipe that you would like to publish, we are also dedicated to creating a platform that gives you aa place to publish your favorite recipes. 
          </Text>
        </ScrollView>
        <View style={tailwind`p-2`}>
          <MainButton header='Visit www.dinewithme.io' loading={false} clickButton={() => {openWebsite()}}/>
        </View>
      </View>
    </View>
  )
}

export default AboutScreen