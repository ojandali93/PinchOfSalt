const { default: supabase } = require("../Utils/supabase");

const userId = 'b29c9fab-d3a1-4468-aa6a-bf0fb9f35f04';

// Function to generate a random recipe
const generateRandomRecipe = (index) => {
  return {
    title: `Recipe ${index}`,
    description: `This is a fake description for recipe ${index}. It's a delicious dish.`,
    yield: `${Math.floor(Math.random() * 5) + 1} servings`,
    prep_time: `${Math.floor(Math.random() * 30) + 10} minutes`,
    cook_time: `${Math.floor(Math.random() * 60) + 10} minutes`,
    user_id: userId,
    tip: `Some random tip for recipe ${index}.`,
    main_image: `https://via.placeholder.com/300x300?text=Recipe+${index}`, // Placeholder image
    main_video: null, // Add video URL if necessary, or keep null
    featured: Math.random() < 0.5 ? true : false, // Randomly feature the recipe
    new: true,
    trending: false,
  };
};

// Function to load 15 recipes into the database
const loadRecipes = async () => {
  const recipes = [];
  
  for (let i = 1; i <= 15; i++) {
    recipes.push(generateRandomRecipe(i));
  }

  try {
    const { data, error } = await supabase
      .from('Recipes') // Make sure your table name is 'Recipes'
      .insert(recipes);

    if (error) {
      console.error('Error inserting recipes:', error);
    } else {
    }
  } catch (error) {
    console.error('An error occurred while inserting recipes:', error);
  }
};

module.exports = (loadRecipes)
