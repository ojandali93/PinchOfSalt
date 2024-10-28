import React, { useState } from 'react'
import { Alert, Dimensions, FlatList, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'
import StandardHeader from '../../Components/Headers/StandardHeader'
import SelectImageFromGallerySq from '../../Components/ImagesAndVideo/SelectImageFromGallerySq'
import RecipeInput from '../../Components/Inputs/Content/RecipeInput'
import SelectVideoFromGallerySq from '../../Components/ImagesAndVideo/SelectVideoFromGallerySq'
import IngredientsInput from '../../Components/Inputs/Content/MultipleInputs'
import CategortySelect from '../../Components/Inputs/Content/CategortySelect'
import RedButton from '../../Components/Buttons/Authentication/RedButton'
import MainButton from '../../Components/Buttons/Content/MainButton'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../Utils/firebaseConfig'
import supabase from '../../Utils/supabase'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useUser } from '../../Context/UserContext'
import { useNavigation } from '@react-navigation/native'
import InstructionsInput from '../../Components/Inputs/Content/InstructionsInput'
import NutritionalFacts from '../../Components/Inputs/Content/NutritionalFacts'
import { useRecipe } from '../../Context/RecipeContext'
import {typesOfCuisine, typesOfFood} from '../../Other/RecipesOptions'
import CategoriesSelect from '../../Components/Inputs/Content/CategoriesSelect'
import { Check, Minimize, Play } from 'react-native-feather'
import Video from 'react-native-video'
import CategoriesDetails from '../../Components/Info/CategoriesDetails';

const CreateRecipeScreen = () => {

  const {currentProfile, userLists} = useUser()
  const {grabUserRecipes} = useRecipe()
  const navigation = useNavigation()

  const [recipeMainImage, setRecipeMainImage] = useState<any>(null)
  const [recipeMainVideo, setRecipeMainVidoe] = useState<any>(null)

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [yieldAmount, setYieldAmount] = useState<string>('')
  const [prepTime, setPrepTime] = useState<string>('')
  const [cookTime, setCookTime] = useState<string>('')
  const [tip, setTip] = useState<string>('')

  const [ingredients, setIngredients] = useState<any[]>([{ id: generateRandomCode(), amount: '', item: ''}])
  const [instructions, setInstructions] = useState<any[]>([{ id: generateRandomCode(), item: '' }])

  const [categories, setCategories] = useState<string[]>([]); 
  const [cuisine, setCuisine] = useState<string>('')

  const [creatingRecipe, setCreatingRecipe] = useState<boolean>(false)
  
  const [showCollections, setShowCollections] = useState<boolean>(false)
  const [addToLists, setAddToLists] = useState<number[]>([])

  const [maximizeVideo, setMaximizeVideo] = useState<boolean>(false)

  const toggleSelectList = (listId: number) => {
    if(addToLists.includes(listId)){

    } else {
      setAddToLists((prev) => [...prev, listId])
    }
  };

  const screenHeight = Dimensions.get('window').height; // Get screen height

  const [nutritionalFacts, setNutritionalFacts] = useState<any>({
    servingSize: '',
    calories: '',
    totalFats: '',
    saturatedFats: '',
    transFats: '',
    cholesterol: '',
    sodium: '',
    totalCarbohydrates: '',
    dietaryFiber: '',
    totalSugars: '',
    protein: '',
  });

  function generateRandomCode() {
    return Math.floor(10000 + Math.random() * 90000);
  }

  const addIngredientInput = () => {
    const newIngredient = { id: generateRandomCode(), amount: '', item: ''};
    setIngredients([...ingredients, newIngredient]);
  };

  const handleIngredientChange = (id: string, amount: string, item: string) => {
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.id === id ? {id: id, amount: amount, item: item} : ingredient
    );
    setIngredients(updatedIngredients);
  };

  const removeIngredientInput = (id: string) => {
    if(ingredients.length > 1){
      const updatedIngredients = ingredients.filter((ingredient) => ingredient.id !== id);
      setIngredients(updatedIngredients);
    }
  };

  const addInstruction = () => {
    const newInstruction = { id: generateRandomCode(), item: '' };
    setInstructions([...instructions, newInstruction]);
  };

  const handleUpdateInstruction = (id: string, item: string) => {
    const updateInstructions = instructions.map((instruction) =>
      instruction.id === id ? {id: id, item: item} : instruction
    );
    setInstructions(updateInstructions);
  };

  const removeInstruction = (id: string) => {
    if(instructions.length > 1){
      const uppdatedInstructions = instructions.filter((instruction) => instruction.id !== id);
      setInstructions(uppdatedInstructions);
    }
  };

  const handleNutritionalFactsChange = (key: string, value: string) => {
    setNutritionalFacts((prevFacts) => ({
      ...prevFacts,
      [key]: value,
    }));
  };

  const createRecipe = () => {
    if(
      title.length === 0 || 
      description.length === 0 ||
      yieldAmount.length === 0 ||
      prepTime.length === 0 ||
      cookTime.length === 0 ||
      recipeMainImage === null ||
      ingredients[0].amount.length === 0 ||
      ingredients[0].item.length === 0 ||
      instructions[0].item.length === 0 ||
      categories.length === 0 ||
      cuisine.length === 0
    ){
      Alert.alert('Required Fields', 'You are missing one or more required field. Please check and resubmit')
    } else {
      setCreatingRecipe(true)
      uploadMainImageToFirebase()
    }
  }

  const handleUpdateCategory = (data: string) => {
    if (categories.includes(data)) {
      const updatedCategories = categories.filter((category) => category !== data);
      setCategories(updatedCategories);
    } else {
      setCategories([...categories, data]);
    }
  };
  

  const uploadMainImageToFirebase = async () => {
    try {
      const folderName = 'Recipe_Pictures'; 
      const response = await fetch(recipeMainImage.uri!);
      const blob = await response.blob();  
      const storageRef = ref(storage, `${folderName}/${blob.data.name}`);
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      if(recipeMainVideo === null){
          addRecipeDetailsToDatabase(downloadURL, null)
        } else {
          setTimeout(() => {
            uploadVideoTutorialToFirebase(downloadURL)
          }, 500)
        }
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const uploadVideoTutorialToFirebase = async (imageUrl: string) => {
    try {
      const folderName = 'Recipe_Videos';
      const response = await fetch(recipeMainVideo.uri);
      const blob = await response.blob(); 
      const fileKey = `${folderName}/${blob.data.name}`;
      const storageRef = ref(storage, fileKey);
      const snapshot = await uploadBytesResumable(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      addRecipeDetailsToDatabase(imageUrl, downloadURL);
    } catch (error) {
      console.error('Error uploading video tutorial:', error);
      return null;
    }
  };

  const addRecipeDetailsToDatabase = async (imageUrl: string, videoUrl: string | null) => {
    try {
      const { data, error } = await supabase
        .from('Recipes')
        .insert([
          {
            title: title,
            description: description,
            yield: yieldAmount,  // Check for typos here
            prep_time: prepTime,
            cook_time: cookTime,
            featured: null,
            new: true,
            trending: false,
            main_video: videoUrl,
            main_image: imageUrl,
            user_id: currentProfile.user_id,
            tip: tip
          },
        ])
        .select();
      if (error) {
        console.error('Error inserting recipe:', error);
      } else {
        const recipeId = data[0].id; // Assuming 'id' is the primary key
         addIngredientsToDatabase(recipeId)
      }
    } catch (error) {
      console.error('Unexpected error while inserting recipe:', error);
    }
  };

  const addIngredientsToDatabase = async (recipe_id: number) => {
    for (let ingredient of ingredients) {
      try {
        const { data, error } = await supabase
          .from('Ingredients')
          .insert([
            {
              item: ingredient.item,
              amount: ingredient.amount,
              recipe_id: recipe_id,         
              optional: false,    
            }
          ]);
        if (error) {
          console.error('Error inserting ingredient:', error);
        } else {
        }
      } catch (error) {
        console.error('Unexpected error while inserting ingredient:', error);
      }
    }
    addInstructionsToDatabase(recipe_id)
  };

  const addInstructionsToDatabase = async (recipe_id: number) => {
    for (let instruction of instructions) {
      try {
        const { data, error } = await supabase
          .from('Instructions')  // Your table name
          .insert([
            {     // Maps to 'quantity'
              item: instruction.item,
              recipe_id: recipe_id,
              optional: false
            }
          ]);
        if (error) {
          console.error('Error inserting instruction:', error);
        } else {
        }
      } catch (error) {
        console.error('Unexpected error while inserting ingredient:', error);
      }
    }
    addNutritionToDatabase(recipe_id)
  };

  const addNutritionToDatabase = async (recipe_id: number) => {
    try {
      const { data, error } = await supabase
        .from('Nutrition')  // Your table name
        .insert([
          {     
            serving_size: nutritionalFacts.servingSize,
            calories: nutritionalFacts.calories,
            total_fats: nutritionalFacts.totalFats,
            saturated_fats: nutritionalFacts.saturatedFats,
            trans_fats: nutritionalFacts.transFats,
            cholesterol: nutritionalFacts.cholesterol,
            sodium: nutritionalFacts.sodium,
            total_carbs: nutritionalFacts.totalCarbohydrates,
            dietary_fiber: nutritionalFacts.dietaryFiber,
            total_sugar: nutritionalFacts.totalSugars,
            protein: nutritionalFacts.protein,
            recipe_id: recipe_id,
          }
        ]);
      if (error) {
        console.error('Error inserting instruction:', error);
      } else {
      }
    } catch (error) {
      console.error('Unexpected error while inserting ingredient:', error);
    }
    addTagsToRecipe(recipe_id)
  };

  const addTagsToRecipe = async (recipe_id: number) => {
    try {
      const { data, error } = await supabase
        .from('Cuisine')  // Your table name
        .insert([
          {   
            recipe_id: recipe_id, 
            cuisine: categories,
          }
        ]);
      if (error) {
        console.error('Error inserting instruction:', error);
      } else {
      }
    } catch (error) {
      console.error('Unexpected error while inserting ingredient:', error);
    }
    addCategoriesToRecipe(recipe_id)
  };

  const addCategoriesToRecipe = async (recipe_id: number) => {
    try {
      for (const category of categories) {
        const { data, error } = await supabase
          .from('Categories')  
          .insert([
            {   
              recipe_id: recipe_id, 
              category: category, 
            }
          ]);
        if (error) {
          console.error(`Error inserting category ${category}:`, error);
          return;
        } else {
        }
      }
    } catch (error) {
      console.error('Unexpected error while inserting categories:', error);
    }
    setTitle('');
    setDescription('');
    setYieldAmount('');
    setCookTime('');
    setPrepTime('');
    setRecipeMainImage(null);
    setRecipeMainVidoe(null);
    setIngredients([]);
    setInstructions([]);
    setTip('');
    setCategories([]);
    
    grabUserRecipes(currentProfile.user_id)

    setCreatingRecipe(false);
    navigation.navigate('AddRecipeToList', {recipe_id: recipe_id});
  };


  const limitStringSize = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  };
  
 
  return (
    <View style={tailwind`flex-1 bg-white`}>
      <StandardHeader 
        header='Add Recipe' 
        back={true}
      />
      <ScrollView style={tailwind`flex-1 bg-white p-2`}>
        <View style={tailwind`rounded-full`}>
          <Text style={tailwind`text-2xl font-bold`}>Details</Text>
          <View style={tailwind`w-full h-1 bg-stone-600`}></View>
        </View>
        <RecipeInput header='Title:' required={true} value={title} updateInput={setTitle} capitalize='none' multi={false} placeholder='recipe title...'/>
        <RecipeInput header='Description:' required={true} value={description} updateInput={setDescription} capitalize='none' multi={true} placeholder='recipe description...'/>
        <RecipeInput header='Yield:' required={true} value={yieldAmount} updateInput={setYieldAmount} capitalize='none' multi={false} placeholder='recipe yield...'/>
        <View style={tailwind`w-full flex flex-row`}>
          <View style={tailwind`w-1/2`}>
            <RecipeInput header='Prep Time:' required={true} value={prepTime} updateInput={setPrepTime} capitalize='none' multi={false} placeholder='recipe prep time...'/>
          </View>
          <View style={tailwind`w-1/2`}>
            <RecipeInput header='Cook Time:' required={true} value={cookTime} updateInput={setCookTime} capitalize='none' multi={false} placeholder='recipe cook time...'/>
          </View>
        </View>
        <View style={tailwind`mt-4 rounded-full`}>
          <Text style={tailwind`text-2xl font-bold`}>Media</Text>
          <View style={tailwind`w-full h-1 bg-stone-600`}></View>
        </View>
        <SelectImageFromGallerySq required={true} picture={recipeMainImage} updatePicture={setRecipeMainImage}/>
        <SelectVideoFromGallerySq video={recipeMainVideo} updateVideo={setRecipeMainVidoe} maximize={() => setMaximizeVideo(true)} />
        <View style={tailwind`mt-4 rounded-full`}>
          <Text style={tailwind`text-2xl font-bold`}>Ingredients</Text>
          <View style={tailwind`w-full h-1 bg-stone-600`}></View>
        </View>
        <IngredientsInput items={ingredients} updateItem={handleIngredientChange} removeItem={removeIngredientInput} addItem={addIngredientInput} title='Ingredients'/>
        <View style={tailwind`mt-4 rounded-full`}>
          <Text style={tailwind`text-2xl font-bold`}>Instructions</Text>
          <View style={tailwind`w-full h-1 bg-stone-600`}></View>
        </View>
        <InstructionsInput items={instructions} updateItem={handleUpdateInstruction} removeItem={removeInstruction} addItem={addInstruction} title='Instructions'/>
        <View style={tailwind`mt-4 rounded-full`}>
          <Text style={tailwind`text-2xl font-bold`}>Additional Info</Text>
          <View style={tailwind`w-full h-1 bg-stone-600`}></View>
        </View>
        <RecipeInput header='Tips:' required={false} value={tip} updateInput={setTip} capitalize='none' multi={true} placeholder='recipe tip and advice...'/>
        <View style={tailwind`mt-4 rounded-full`}>
          <Text style={tailwind`text-2xl font-bold`}>Nutritional Facts (Optional)</Text>
          <View style={tailwind`w-full h-1 bg-stone-600`}></View>
        </View>
        <NutritionalFacts nutritionalFacts={nutritionalFacts} updateNutritionalFact={handleNutritionalFactsChange}/>
        <View style={tailwind`mt-4 rounded-full`}>
          <Text style={tailwind`text-2xl font-bold`}>Categories</Text>
          <View style={tailwind`w-full h-1 bg-stone-600`}></View>
        </View>
        <CategoriesSelect categoriesArray={categories} cuisines={typesOfFood} updateCuisine={handleUpdateCategory} header='Categories'/>
        <CategortySelect categories={cuisine} cuisines={typesOfCuisine} updateCuisine={setCuisine} header='Cuisine'/>
        <View style={tailwind`mt-4`}>
          <MainButton header='Create Recipe' clickButton={() => {createRecipe()}} loading={creatingRecipe}/>
        </View>
        <View style={tailwind`h-4 w-full`}></View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={maximizeVideo}
        onRequestClose={() => setMaximizeVideo(false)} // Close the modal
      >
        <View style={tailwind`flex-1 justify-center items-center bg-black`}>
          {
            recipeMainVideo && (
              <Video
                source={{ uri: recipeMainVideo.uri }}
                style={[tailwind`w-full`, {height: screenHeight }]}
                resizeMode="contain"
                controls={true}
                paused={false}
                repeat={true}
              />
            )
          }
          {/* Minimize button */}
          <TouchableOpacity
            onPress={() => setMaximizeVideo(false)}
            style={tailwind`absolute top-19 left-4 h-10 w-10 bg-gray-700 rounded-full flex justify-center items-center`}
          >
            <Minimize height={20} width={20} color={'white'}/>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

export default CreateRecipeScreen
