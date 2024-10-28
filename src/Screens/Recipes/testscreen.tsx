import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Plus, Camera } from 'react-native-feather';
import tailwind from 'twrnc';

const testscreen = () => {
  const navigation = useNavigation();

  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeYeild, setRecipeYeild] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [videoTutorial, setVideoTutorial] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [tip, setTip] = useState('');
  const [tags, setTags] = useState([]);

  // Function to handle selecting an image
  const selectImage = () => {
    // Implement image picker here
  };

  const addIngredient = () => {
    // Add an ingredient input field
  };

  const addInstruction = () => {
    // Add an instruction input field
  };

  return (
    <ScrollView style={tailwind`flex-1 bg-white p-4`}>
      <Text style={tailwind`text-2xl font-bold mb-4 text-black`}>Create New Recipe</Text>

      {/* Main Image */}
      <View style={tailwind`mb-5`}>
        <Text style={tailwind`text-lg font-semibold mb-2`}>Main Image</Text>
        <TouchableOpacity
          onPress={selectImage}
          style={styles.imagePicker}
        >
          {mainImage ? (
            <Image source={{ uri: mainImage }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Camera height={30} width={30} color={'gray'} />
              <Text style={tailwind`text-gray-500 mt-2`}>Select Image</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Recipe Title */}
      <TextInput
        style={styles.input}
        placeholder="Recipe Title"
        value={recipeTitle}
        onChangeText={setRecipeTitle}
        placeholderTextColor="grey"
      />

      {/* Recipe Description */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Recipe Description"
        value={recipeDescription}
        onChangeText={setRecipeDescription}
        placeholderTextColor="grey"
        multiline={true}
      />

      {/* Yield, Prep Time, Cook Time */}
      <View style={tailwind`flex-row justify-between`}>
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Yield"
          value={recipeYeild}
          onChangeText={setRecipeYeild}
          placeholderTextColor="grey"
        />
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Prep Time"
          value={prepTime}
          onChangeText={setPrepTime}
          placeholderTextColor="grey"
        />
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="Cook Time"
          value={cookTime}
          onChangeText={setCookTime}
          placeholderTextColor="grey"
        />
      </View>

      {/* Video Tutorial */}
      <View style={tailwind`mb-5`}>
        <Text style={tailwind`text-lg font-semibold mb-2`}>Video Tutorial (Optional)</Text>
        <TouchableOpacity
          onPress={() => {
            // Implement video picker here
          }}
          style={styles.imagePicker}
        >
          {videoTutorial ? (
            <Text>Video Selected</Text>
          ) : (
            <View style={styles.imagePlaceholder}>
              <Plus height={30} width={30} color={'gray'} />
              <Text style={tailwind`text-gray-500 mt-2`}>Select Video</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Ingredients */}
      <Text style={tailwind`text-lg font-semibold mb-2`}>Ingredients</Text>
      {ingredients.map((ingredient, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Ingredient ${index + 1}`}
          value={ingredient}
          onChangeText={(text) => {
            const newIngredients = [...ingredients];
            newIngredients[index] = text;
            setIngredients(newIngredients);
          }}
          placeholderTextColor="grey"
        />
      ))}
      <TouchableOpacity onPress={addIngredient} style={styles.addButton}>
        <Text style={tailwind`text-red-500 font-bold`}>+ Add Ingredient</Text>
      </TouchableOpacity>

      {/* Instructions */}
      <Text style={tailwind`text-lg font-semibold mb-2`}>Instructions</Text>
      {instructions.map((instruction, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Step ${index + 1}`}
          value={instruction}
          onChangeText={(text) => {
            const newInstructions = [...instructions];
            newInstructions[index] = text;
            setInstructions(newInstructions);
          }}
          placeholderTextColor="grey"
        />
      ))}
      <TouchableOpacity onPress={addInstruction} style={styles.addButton}>
        <Text style={tailwind`text-red-500 font-bold`}>+ Add Instruction</Text>
      </TouchableOpacity>

      {/* Tip or Recommendation */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Add a tip or recommendation (Optional)"
        value={tip}
        onChangeText={setTip}
        placeholderTextColor="grey"
        multiline={true}
      />

      {/* Tags / Categories */}
      <TextInput
        style={styles.input}
        placeholder="Tags (e.g., Italian, Dessert)"
        value={tags.join(', ')}
        onChangeText={(text) => setTags(text.split(', '))}
        placeholderTextColor="grey"
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={tailwind`text-white font-bold text-lg text-center`}>Submit Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: 'black',
  },
  textArea: {
    height: 80,
  },
  smallInput: {
    width: '30%',
  },
  imagePicker: {
    width: '100%',
    height: 200,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  addButton: {
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#D32F2F',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
});

export default testscreen;
