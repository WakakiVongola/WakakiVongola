export async function fetchRecipeList() {
    try {
      const response = await fetch("https://gist.githubusercontent.com/baiello/0a974b9c1ec73d7d0ed7c8abc361fc8e/raw/e598efa6ef42d34cc8d7e35da5afab795941e53e/recipes.json");
      if (!response.ok) throw new Error('Erreur réseau');
      const recipes = await response.json();
      recipes.forEach(item => item.image = item.image.replace(".jpg", ".webp"));
      return recipes;
    } catch (error) {
      console.error("Erreur lors de la récupération des recettes :", error);
      alert("Erreur de chargement des recettes. Veuillez réessayer plus tard.");
      return [];
    }
  }
  