import { filterRecipes } from './search.js';
import { getSelectedFilters } from './filters.js';
import { normalizeString } from './utils.js';

export function updateListOfRecipes(recipes, input = "") {
  console.log("Updating list of recipes. Received recipes:", recipes);

  if (!Array.isArray(recipes)) {
    console.error("Expected 'recipes' to be an array but got:", recipes);
    return;
  }

  const recipesContainer = document.getElementById("recipesListContainer");
  recipesContainer.innerHTML = "";

  const selectedFilters = getSelectedFilters();
  const filteredRecipes = filterRecipes(recipes, input, selectedFilters);

  const numberOfRecipesElement = document.getElementById("numberOfRecipes");
  numberOfRecipesElement.textContent = `${filteredRecipes.length} ${filteredRecipes.length > 1 ? "recettes" : "recette"}`;

  if (filteredRecipes.length === 0) {
    recipesContainer.innerHTML = "<p>Aucune recette trouvée</p>";
    return;
  }

  filteredRecipes.forEach(recipe => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("list_recettes_div");

    recipeDiv.innerHTML = `
      <img src="./images/${recipe.image}" alt="Image de la recette">
      <div>
        <h2>${recipe.name}</h2>
        <p>${recipe.description}</p>
        <h3>Ingrédients</h3>
        <div class="list_ingredients">
          ${recipe.ingredients.map(ingredient => `
            <div>
              <p>${normalizeString(ingredient.ingredient)}</p>
              <label>${ingredient.quantity || ""} ${ingredient.unit || ""}</label>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    recipesContainer.appendChild(recipeDiv);
  });
}
