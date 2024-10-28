import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../Context/UserContext';
import { BlurView } from '@react-native-community/blur';
import tailwind from 'twrnc';
import StandardHeader from '../../Components/Headers/StandardHeader';
import NameAndImageProfile from '../../Components/Profile/NameAndImageProfile';
import Bio from '../../Components/Profile/Bio';
import Summary from '../../Components/Profile/Summary';
import { useRecipe } from '../../Context/RecipeContext';
import AuthInput from '../../Components/Inputs/Authentication/AuthInput';
import RedButton from '../../Components/Buttons/Authentication/RedButton';
import Logo from '../../Assets/icon-red.png';

const ProfileScreen = () => {
  const { currentProfile, userLists, userFollowing, userFollowers, loginUser } = useUser();
  const { userRecipes } = useRecipe();
  const navigation = useNavigation();

  const [centerView, setCenterView] = useState<string>('Recipes')
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submitUserLoginFeed = () => {
    loginUser(username, password, navigation, 'ProfileScreen');
  };


  const limitStringLength = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  if (!currentProfile) {
    // Show the alert screen when the user is not logged in
    return (
      <View style={tailwind`flex-1 w-full`}>
        {/* Background Image */}
        <StandardHeader header={'Omar'} more={true} moreClick={() => {navigation.navigate('SettingScreen')}}/>
        <View style={tailwind`flex-1 bg-white p-4`}>
          <NameAndImageProfile username={'Profile'} accountName={'Omar Jandali | Aspiring Chef'} profilePicture='https://firebasestorage.googleapis.com/v0/b/dwm-reactnative.appspot.com/o/ProfilePictures%2F62A803C5-41E4-4290-B2FC-2AD0927B86C4.jpg?alt=media&token=44cc3c46-b573-4d71-9c9c-81f5ba57c419'/>
          <Bio bio='I am a new and energized chef that wants to show the world what good food looks like and how easy it is create delicious food that is healthy.' />
          <Summary followers={382} following={124} recipes={12} lists={5} onSelect={setCenterView} />
        </View>
        <BlurView
          style={tailwind`absolute w-full h-full top-0 left-0 right-0 bottom-0 z-10`}
          blurType="dark"
          blurAmount={5}
        />

        <View style={tailwind`absolute top-0 left-0 right-0 bottom-0 z-20 flex justify-end`}>
          <View style={tailwind`w-full py-6 px-4`}>
            <View style={tailwind`w-full flex flex-col items-center`}>
              <Image style={tailwind`h-32 w-32`} source={Logo} />
              <Text style={tailwind`text-3xl font-bold text-white mt-4`}>Pinch of Salt</Text>
              <Text style={tailwind`text-xl font-semibold text-white mt-1 mb-6`}>
                Discovering Amazing Recipes
              </Text>
            </View>
            <View style={tailwind``}>
              <AuthInput
                icon="User"
                valid={false}
                validation={false}
                placeholder="Username..."
                placeholderColor="grey"
                multi={false}
                secure={false}
                value={username}
                onChange={setUsername}
                loading={false}
                capitalization={false}
              />
            </View>

            <View style={tailwind`mt-4`}>
              <AuthInput
                icon="Lock"
                valid={false}
                validation={false}
                placeholder="Password..."
                placeholderColor="grey"
                multi={false}
                secure={true}
                value={password}
                onChange={setPassword}
                loading={false}
                capitalization={false}
              />
            </View>

            <View style={tailwind`w-full flex flex-row justify-end mt-1`}>
              <Text style={tailwind`text-white font-bold`}>Forgot Password?</Text>
            </View>

            <View style={tailwind`mt-4`}>
              <RedButton submit={submitUserLoginFeed} loading={false} />
            </View>

            <View style={tailwind`w-full flex flex-row justify-center items-center mt-3`}>
              <Text style={tailwind`text-white font-bold`}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignupScreenFeed')}>
                <Text style={tailwind`ml-1 font-semibold text-red-500`}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Render the profile details and recipe grid if the user is logged in
  return (
    <View style={tailwind`flex-1`}>
      <StandardHeader header={'Profile'} more={true} moreClick={() => navigation.navigate('SettingsScreen')} />
      <ScrollView style={tailwind`flex-1 bg-white p-4`}>
        <NameAndImageProfile 
          username={currentProfile.username} 
          accountName={currentProfile.account_name} 
          profilePicture={currentProfile.profile_picture}
        />
        <Bio bio={currentProfile.bio} />
        <Summary 
          followers={userFollowers.length}
          following={userFollowing.length} 
          recipes={userRecipes.length} 
          lists={userLists.length}
          onSelect={setCenterView} 
        />
        <View style={tailwind`h-1 w-full bg-stone-200 my-4`}></View>

        {/* Recipe Grid */}
        <View style={tailwind`flex flex-wrap flex-row`}>
          {
            centerView === 'Recipes'
              ? <>
                  {
                    userRecipes.map((recipe, index) => (
                      <TouchableOpacity
                        key={index}
                        style={tailwind`w-1/3 p-1`} // 3-column grid
                        onPress={() => navigation.navigate('SingleRecipeScreenProfile', { recipe })}
                      >
                        <Image
                          source={{ uri: recipe.main_image }}
                          style={tailwind`w-full h-32 rounded-lg`}
                        />
                      </TouchableOpacity>
                    ))
                  }
                </>
              : centerView === 'Lists'
                  ? <>
                      {
                        userLists.map((list, index) => (
                          <TouchableOpacity
                            key={index}
                            style={tailwind`w-full flex flex-row mb-3`} // 3-column grid
                            onPress={() => navigation.navigate('SingleListScreenProfile', { list })}
                          >
                            <Image
                              source={{ uri: list.main_image }}
                              style={tailwind`w-32 h-32 rounded-lg`}
                            />
                            <View style={tailwind`flex-1 ml-3`}>
                              <Text style={tailwind`text-xl font-bold my-2`}>{list.title}</Text>
                              <Text style={tailwind`text-base`}>{limitStringLength(list.description, 90)}</Text>
                            </View>
                          </TouchableOpacity>
                        ))
                      }
                    </>
                  : centerView === 'Followers'
                      ? <>
                          {
                            userFollowers.map((list, index) => (
                              <TouchableOpacity
                                key={index}
                                style={tailwind`w-full flex flex-row items-center mb-3`} // 3-column grid
                                onPress={() => navigation.navigate('SelectedProfileScreen', {user_id: list.Profiles.user_id})}
                              >
                                <Image
                                  source={{ uri: list.Profiles.main_image }}
                                  style={tailwind`w-14 h-14 rounded-full`}
                                />
                                <View style={tailwind`flex-1 ml-3`}>
                                  <Text style={tailwind`text-base font-bold`}>{list.Profiles.username}</Text>
                                  <Text style={tailwind`text-base`}>{list.Profiles.account_name}</Text>
                                </View>
                              </TouchableOpacity>
                            ))
                          }
                        </>
                      : centerView === 'Following'
                          ? <>
                              {
                                userFollowing.map((list, index) => (
                                  <TouchableOpacity
                                    key={index}
                                    style={tailwind`w-full flex flex-row items-center mb-3`} // 3-column grid
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
                            </>
                          : null
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
