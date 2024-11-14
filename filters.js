import { normalizeString } from './utils.js';
import { updateListOfRecipes } from './ui.js';
import { filterRecipes } from './search.js';

export function getSelectedFilters() {
  return Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
    .map(checkbox => normalizeString(checkbox.value));
}

export function createCheckboxes(set, container, name) {
  Array.from(set).sort().forEach(item => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = name;
    checkbox.value = item;

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(item));
    container.appendChild(label);
    container.appendChild(document.createElement("br"));

    checkbox.addEventListener("change", () => updateSelectedFilters(window.allRecipes));
  });
}

export function updateFilter(containerId, dataSet, filterName) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  createCheckboxes(dataSet, container, filterName);
}

export function updateFilterContent(recipes, searchTerm = "") {
  const appareilsSet = new Set();
  const ingredientsSet = new Set();
  const ustensilesSet = new Set();

  const filteredRecipes = filterRecipes(recipes, searchTerm, []);

  filteredRecipes.forEach(recipe => {
    if (recipe.appliance) appareilsSet.add(normalizeString(recipe.appliance));
    recipe.ingredients.forEach(ingredient => ingredientsSet.add(normalizeString(ingredient.ingredient)));
    recipe.ustensils.forEach(ustensil => ustensilesSet.add(normalizeString(ustensil)));
  });

  updateFilter("appareilsList", appareilsSet, "appareils");
  updateFilter("ingredientsList", ingredientsSet, "ingredients");
  updateFilter("ustensilesList", ustensilesSet, "ustensiles");
}

export function updateSelectedFilters(recipes) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const filterList = document.getElementById("filterList");
  filterList.innerHTML = "";

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const filterItem = document.createElement("button");
      filterItem.innerHTML = `<p>${checkbox.value}</p><i class="fa-regular fa-circle-xmark"></i>`;
      filterItem.onclick = () => toggleCheckbox(checkbox.name, checkbox.value, recipes);
      filterList.appendChild(filterItem);
    }
  });

  const searchInputValue = document.getElementById("big_search").value;
  updateListOfRecipes(recipes, searchInputValue);
}

export function toggleCheckbox(name, value, recipes) {
  const checkbox = document.querySelector(`input[name="${name}"][value="${value}"]`);
  if (checkbox) {
    checkbox.checked = false;
    updateSelectedFilters(recipes);
  }
}

export function updateFilteredRecipes(recipes) {
  const searchAppareilsValue = document.getElementById("searchappareils").value.toLowerCase();
  const searchIngredientsValue = document.getElementById("searchingredients").value.toLowerCase();
  const searchUstensilesValue = document.getElementById("searchustensiles").value.toLowerCase();

  const filteredAppareils = new Set();
  const filteredIngredients = new Set();
  const filteredUstensiles = new Set();

  recipes.forEach(recipe => {
    if (searchAppareilsValue === "" || (recipe.appliance && recipe.appliance.toLowerCase().includes(searchAppareilsValue))) {
      if (recipe.appliance) filteredAppareils.add(normalizeString(recipe.appliance));
    }

    recipe.ingredients.forEach(ingredient => {
      if (searchIngredientsValue === "" || ingredient.ingredient.toLowerCase().includes(searchIngredientsValue)) {
        filteredIngredients.add(normalizeString(ingredient.ingredient));
      }
    });

    recipe.ustensils.forEach(ustensil => {
      if (searchUstensilesValue === "" || ustensil.toLowerCase().includes(searchUstensilesValue)) {
        filteredUstensiles.add(normalizeString(ustensil));
      }
    });
  });

  updateFilter("appareilsList", filteredAppareils, "appareils");
  updateFilter("ingredientsList", filteredIngredients, "ingredients");
  updateFilter("ustensilesList", filteredUstensiles, "ustensiles");

  updateListOfRecipes(recipes);
}
