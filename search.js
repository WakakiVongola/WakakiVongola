import { normalizeString } from './utils.js';

export function filterRecipes(recipes, input, selectedFilters) {
  if (!Array.isArray(recipes)) {
    console.error("Expected 'recipes' to be an array but got:", recipes);
    return [];
  }
  
  const normalizedInput = normalizeString(input);

  return recipes.filter(recipe => {
    const matchesInput = recipe.name.toLowerCase().includes(normalizedInput);
    const matchesFilters = selectedFilters.every(filter =>
      recipe.ingredients.some(ingredient => normalizeString(ingredient.ingredient).includes(filter)) ||
      (recipe.appliance && normalizeString(recipe.appliance).includes(filter)) ||
      (recipe.ustensils && recipe.ustensils.some(ustensil => normalizeString(ustensil).includes(filter)))
    );
    return matchesInput && matchesFilters;
  });
}
