import React, { useState } from 'react'
import { FlatList, Image, Switch, Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'
import StandardHeader from '../../Components/Headers/StandardHeader'
import CollectionInput from '../../Components/Inputs/Content/CollectionInput';
import { Check } from 'react-native-feather';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../Utils/firebaseConfig';
import supabase from '../../Utils/supabase';
import { useUser } from '../../Context/UserContext';
import { useRecipe } from '../../Context/RecipeContext';
import SelectSmallImage from '../../Components/ImagesAndVideo/SelectSmallImage';
import RedButton from '../../Components/Buttons/Authentication/RedButton';
import MainButton from '../../Components/Buttons/Content/MainButton';
import { useNavigation } from '@react-navigation/native';

const CreateListScreen = () => {
  const { userRecipes } = useRecipe()
  const { currentProfile } = useUser()
  const navigation = useNavigation()

  const [collectionMainImage, setCollectionMainImage] = useState<any>(null)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([])

  const [creatingCollection, setCreatingCollection] = useState<boolean>(false)

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const toggleSelectedRecipes = (recipe_id: number) => {
    if (selectedRecipes.includes(recipe_id)) {
      const updatedSelectedRecipes = selectedRecipes.filter((id) => id !== recipe_id);
      setSelectedRecipes(updatedSelectedRecipes);
    } else {
      setSelectedRecipes([...selectedRecipes, recipe_id]);
    }
  }

  const createCollection = async () => {
    setCreatingCollection(true)
    try {
      if (collectionMainImage) {
        const downloadUrl = await uploadImageToDatabase();
        completeCreatingCollection(downloadUrl);
      } else {
        completeCreatingCollection(null);  // Handle case if there's no image
      }
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  }

  const uploadImageToDatabase = async () => {
    try {
      const folderName = 'CollectionImages';
      const response = await fetch(collectionMainImage.uri!);
      const blob = await response.blob();
      const fileKey = `${folderName}/${blob.data.name}`;
      const storageRef = ref(storage, fileKey);
      const snapshot = await uploadBytes(storageRef, blob);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error('Error uploading image:', error);
      return '';
    }
  }

  const completeCreatingCollection = async (downloadUrl: string | null) => {
    try {
      const { data, error } = await supabase
        .from('Collections')
        .insert([
          {
            title: title,
            description: description,
            main_image: downloadUrl,         
            is_public: isEnabled,  
            user_id: currentProfile.user_id  
          }
        ])
        .select();
      if (error) {
        console.error('Error inserting collection:', error);
      } else {
        const newCollection = data[0];  // Get the created collection record
        addRecipesToCollections(newCollection.id);  // Pass the collection_id to add recipes
      }
    } catch (error) {
      console.error('Unexpected error while inserting collection:', error);
    }
  }

  const addRecipesToCollections = async (collectionId: number) => {
    try {
      const recipeEntries = selectedRecipes.map(recipeId => ({
        recipe_id: recipeId,
        collection_id: collectionId
      }));

      const { data, error } = await supabase
        .from('CollectionPlaces')
        .insert(recipeEntries)
        .select();
      if (error) {
        console.error('Error inserting recipes into collection:', error);
      } else {
        setCreatingCollection(false)
        navigation.navigate('ListsScreen')
      }
    } catch (error) {
      console.error('Unexpected error while inserting recipes into collection:', error);
    }
  }

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StandardHeader header='Create Collection' back={true} />
      <View style={tailwind`w-full flex flex-row items-center`}>
        <View style={tailwind`p-2`}>
          <SelectSmallImage picture={collectionMainImage} updatePicture={setCollectionMainImage} />
        </View>
        <CollectionInput
          value={title}
          updateInput={setTitle}
          header='Title:'
          multi={false}
          placeholder='Collection Title...'
          capitalize={'sentences'}
        />
      </View>
      <CollectionInput
        value={description}
        updateInput={setDescription}
        header='Description:'
        multi={true}
        placeholder='Collection Description...'
        capitalize={'sentences'}
      />
      <View style={tailwind`w-full p-2 mt-3 flex flex-row items-center justify-between`}>
        <Text style={tailwind`text-lg font-bold`}>Public:</Text>
        <Switch
          trackColor={{ false: "#b5b5b5", true: "#c72828" }}
          thumbColor={isEnabled ? "white" : "white"}
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}  // Scaling the switch down to half size
        />
      </View>
      <View style={tailwind`flex-1 p-2`}>
        <Text style={tailwind`text-xl font-bold`}>Add Posts To Collection:</Text>
        <FlatList
          data={userRecipes}
          keyExtractor={(item) => item.id.toString()}  // Use item.id for a unique key
          numColumns={3}  // Display in a grid with 3 columns
          style={tailwind`flex-1 mt-4`}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => toggleSelectedRecipes(item.id)}
                style={tailwind`w-1/3 h-34 p-1`}
              >
                <Image style={tailwind`flex-1 rounded-2`} source={{ uri: item.main_image }} />
                {
                  selectedRecipes.includes(item.id) && (
                    <View style={tailwind`absolute inset-0`}>
                      <View style={tailwind`absolute inset-0 bg-black opacity-50 rounded-2 p-1`} />
                      <View style={tailwind`absolute inset-0 flex justify-center items-center p-1`}>
                        <Check height={28} width={28} color={'white'} />
                      </View>
                    </View>
                  )
                }
              </TouchableOpacity>
            )
          }}
        />
      </View>
      <View style={tailwind`p-2`}>
        <MainButton header='Create Collection' clickButton={createCollection} loading={creatingCollection}/>
      </View>
    </View>
  )
}

export default CreateListScreen;
