import React, { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'
import StandardHeader from '../../Components/Headers/StandardHeader'
import { useRecipe } from '../../Context/RecipeContext'
import RecipeTile from '../../Components/Tiles/RecipeTile'
import { RefreshControl } from 'react-native-gesture-handler'
import { useUser } from '../../Context/UserContext'
import { useNavigation } from '@react-navigation/native'
import CollectionInput from '../../Components/Inputs/Content/CollectionInput'
import CollectionTile from '../../Components/Tiles/CollectionTile'
import { BlurView } from '@react-native-community/blur'
import AuthInput from '../../Components/Inputs/Authentication/AuthInput'
import RedButton from '../../Components/Buttons/Authentication/RedButton'
import Logo from '../../Assets/icon-red.png';


const ListsScreen = () => {
  const navigation = useNavigation()

  const { currentProfile, userLists, getUserLists, loginUser } = useUser();

  const [refreshing, setRefreshing] = useState(false); 

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  console.log('user lists: ', JSON.stringify(userLists))


  const submitUserLoginFeed = () => {
    loginUser(username, password, navigation, 'ListScreen');
  };

  useEffect(() => {
    // Keyboard event listeners
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  const goToAddList = () => {
    currentProfile 
      ? navigation.navigate('CreateListScreen')
      : Alert.alert(
          'Login Required',
          'You need to be logged in to create a recipe. Please login to continue.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Login',
              onPress: () => navigation.navigate('LoginScreenList'),
            },
          ]
        );
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUserLists(currentProfile?.user_id).finally(() => {
      setRefreshing(false);
    });
  }, [currentProfile]);

  const displayContent = () => {
    return(
      <View style={tailwind`flex-1 bg-white`}>
        <StandardHeader 
          header='Collections'
          add={true}
          addClick={goToAddList}
        />
        <View style={tailwind`flex-1`}>
          <FlatList
            data={userLists}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              console.log('this is a list: ', item)
              return (
                <View key={item.id} style={tailwind`p-2`}>
                  <CollectionTile list={item}/>
                </View>
              );
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </View>
    )
  }

  const displayLogin = () => {
    return(
      <KeyboardAvoidingView
        style={tailwind`flex-1 absolute w-full h-full top-0 left-0 right-0 bottom-0 z-15`}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={tailwind`flex-1 bg-white`}>
          <StandardHeader 
            header='Collections'
            add={true}
            addClick={goToAddList}
          />
          <View style={tailwind`flex-1`}>
            <FlatList
              data={userLists}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                return (
                  <View key={item.id} style={tailwind`p-2`}>
                    <CollectionTile list={item}/>
                  </View>
                );
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
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
      </KeyboardAvoidingView>
    )
  }

  return (
    <View style={tailwind`flex-1 bg-white`}>
      {
        currentProfile && currentProfile.user_id 
          ? displayContent()
          : displayLogin()
      }
    </View>
  )
}

export default ListsScreen
