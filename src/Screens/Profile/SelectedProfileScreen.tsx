import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Modal, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '../../Context/UserContext';
import tailwind from 'twrnc';
import StandardHeader from '../../Components/Headers/StandardHeader';
import NameAndImageProfile from '../../Components/Profile/NameAndImageProfile';
import Bio from '../../Components/Profile/Bio';
import Summary from '../../Components/Profile/Summary';
import { useRecipe } from '../../Context/RecipeContext';
import supabase from '../../Utils/supabase';
import { FeedStackParamList } from '../../Navigation/FeedStackNavigation';
import NameAndImageProfileRelations from '../../Components/Profile/NameAndImageProfileRelations';
import { BlurView } from '@react-native-community/blur';
import { Flag, UserX } from 'react-native-feather';

type SingleRecipeRouteProp = RouteProp<FeedStackParamList, 'SelectedProfileScreenFeed'>;

const SelectedProfileScreen = () => {
  const route = useRoute<SingleRecipeRouteProp>();
  const { user_id } = route.params; 

  const { grabSelectedUserRecipes, selectedUserRecipes } = useRecipe();
  const { selectedUserLists, getSelectedUserLists, userFollowing, currentProfile, getUserFollowing,
    getSelectedUserFollowers, getSelectedUserFollowing, selectedUserFollowers, selectedUserFollowing } = useUser()
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>(true)
  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  const [centerView, setCenterView] = useState<string>('Recipes')

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isCateogryVisible, setIsCategoryVisible] = useState<boolean>(false)

  const limitStringLength = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  useEffect(() => {
    getSelectedUserProfile(user_id)
    getSelectedUserLists(user_id)
    getSelectedUserFollowers(user_id)
    getSelectedUserFollowing(user_id)
  }, [])

  const getSelectedUserProfile = async (user_id: string) => {
    try {
      const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .ilike('user_id', user_id);
      if (error) {
        console.error('Error fetching data:', error);
      }
      setSelectedProfile(data[0])
      grabSelectedUserRecipes(user_id)
      setLoading(false)
    } catch (err) {
      console.error('An error occurred while checking the username:', err);
    }
  }

  const reportUser = async (user_id: string | null, category: string) => {
    try {
      const { error: profileError } = await supabase
        .from('Reports')
        .insert([
          {
            user_id: user_id,  // Make sure this maps to user_id in the DB
            recipe_id: null,
            comment_id: null,
            category: category,
            reporting_user: currentProfile && currentProfile.user_id ? currentProfile.user_id : null,
          },
        ]);
      if (profileError) {
        console.error('Error reporting user:', profileError.message);
        return;
      }
      setIsCategoryVisible(false)
      setIsModalVisible(false)
      Alert.alert('Report Confirmed', 'We have received your report and we will investigate the claim.')
    } catch(err) {
      console.error('An error occurred while creating an account:', err);
    }
  }

  const blockUser = async () => {
    try {
      const existingRelation = userFollowing.find(
        (relation) => relation.following === selectedProfile.user_id
      );
      if (existingRelation) {
        const { error: updateError } = await supabase
          .from('Relations')
          .update({ status: 'blocked', request: false })
          .eq('id', existingRelation.id);
        if (updateError) {
          console.error('Error updating relation status:', updateError.message);
          return;
        }
        Alert.alert('Blocked', 'This user has been blocked successfully.');
      } else {
        const { error: insertError } = await supabase
          .from('Relations')
          .insert([
            {
              follower: currentProfile.user_id, // Current user's ID
              following: selectedProfile.user_id, // Selected user's ID
              status: 'blocked',
              request: false,
            },
          ]);
        if (insertError) {
          console.error('Error creating relation:', insertError.message);
          return;
        }
        Alert.alert('Blocked', 'This user has been blocked successfully.');
      } -
      getUserFollowing(currentProfile.user_id)
    } catch (err) {
      console.error('Error blocking user:', err);
    } finally {
      setIsModalVisible(false);
    }
  };
  

  return (
    <View style={tailwind`flex-1`}>
      {
        loading
          ? <View style={tailwind`h-full w-full flex justify-center items-center`}>
              <ActivityIndicator size={'large'} color={'black'}/>
            </View>
          : <>
              <StandardHeader 
                header={'Profile'} 
                back={true} 
                more={true} 
                moreClick={() => setIsModalVisible(true)} // Show modal on "more" click
              />
              <ScrollView style={tailwind`flex-1 bg-white p-4`}>
                <NameAndImageProfileRelations 
                  profile={selectedProfile} 
                  following={userFollowing}
                />
                <Bio bio={selectedProfile.bio} />
                <Summary 
                  followers={selectedUserFollowers.length} 
                  following={selectedUserFollowing.length} 
                  recipes={selectedUserRecipes.length} 
                  lists={selectedUserLists.length}
                  onSelect={setCenterView} 
                />
                <View style={tailwind`h-1 w-full bg-stone-200 my-4`}></View>
        
                {/* Recipe Grid */}
                <View style={tailwind`flex flex-wrap flex-row`}>
                  {
                    centerView === 'Recipes'
                      ? <>
                          {
                            selectedUserRecipes.map((recipe, index) => (
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
                                selectedUserLists.map((list, index) => (
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
                          : null
                  }
                </View>
              </ScrollView>

              {/* Modal */}
              <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)} // Hide modal when back button is pressed
              >
                <BlurView
                  style={tailwind`absolute w-full h-full top-0 left-0 right-0 bottom-0 z-10`}
                  blurType="dark"
                  blurAmount={5}
                />
                  <TouchableOpacity onPress={() => {setIsModalVisible(false)}} style={tailwind`absolute z-10 top-0 left-0 right-0 bottom-0 flex justify-center items-center`}>
                    <View style={tailwind`w-1/2 bg-slate-950 rounded-3 p-3`}>
                      <Text style={tailwind`text-white text-lg font-bold`}>Options</Text>
                      <View style={tailwind`bg-slate-700 rounded-2 mt-5 mb-3`}>
                        <TouchableOpacity onPress={() => {setIsCategoryVisible(!isCateogryVisible)}} style={tailwind`flex flex-row items-center p-2 border-b-2 border-b-slate-950`}>
                          <Flag height={18} width={18} color={'white'}/>
                          <Text style={tailwind`text-white text-base font-white ml-2`}>Report User</Text>
                        </TouchableOpacity>
                        {
                          isCateogryVisible
                            ? <View>
                                <TouchableOpacity onPress={() => {reportUser(selectedProfile.user_id, 'Harassment')}} style={tailwind`flex flex-row items-center p-2 border-b-2 border-b-slate-950 pl-10`}>
                                  <Text style={tailwind`text-white text-base font-white ml-2`}>Harassment</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {reportUser(selectedProfile.user_id, 'Inappropriate')}} style={tailwind`flex flex-row items-center p-2 border-b-2 border-b-slate-950 pl-10`}>
                                  <Text style={tailwind`text-white text-base font-white ml-2`}>Inappropriate</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {reportUser(selectedProfile.user_id, 'Violence')}} style={tailwind`flex flex-row items-center p-2 border-b-2 border-b-slate-950 pl-10`}>
                                  <Text style={tailwind`text-white text-base font-white ml-2`}>Violence</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {reportUser(selectedProfile.user_id, 'Bullying')}} style={tailwind`flex flex-row items-center p-2 border-b-2 border-b-slate-950 pl-10`}>
                                  <Text style={tailwind`text-white text-base font-white ml-2`}>Bullying</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {reportUser(selectedProfile.user_id, 'Spam')}} style={tailwind`flex flex-row items-center p-2 border-b-2 border-b-slate-950 pl-10`}>
                                  <Text style={tailwind`text-white text-base font-white ml-2`}>Spam</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {reportUser(selectedProfile.user_id, 'False Information')}} style={tailwind`flex flex-row items-center p-2 border-b-2 border-b-slate-950 pl-10`}>
                                  <Text style={tailwind`text-white text-base font-white ml-2`}>False Information</Text>
                                </TouchableOpacity>
                              </View>
                            : null
                        }
                        <TouchableOpacity onPress={() => {blockUser()}} style={tailwind`flex flex-row items-center p-2`}>
                          <UserX height={18} width={18} color={'white'}/>
                          <Text style={tailwind`text-white text-base font-white ml-2`}>Block User</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
              </Modal>
            </>
      }
    </View>
  );
};

export default SelectedProfileScreen;

