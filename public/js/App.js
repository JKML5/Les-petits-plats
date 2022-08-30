class App {
    constructor() { 
        this.recipesSection  = document.querySelector('.recipes')
        this.recipes = []
    }

    async main() {
        this.loadRecipes()
        this.addSearchListener()
    }

    /**
     * Load recipes from Array into instance of class
     */
    loadRecipes() {
        for (let recipeData of recipes) {
            const recipe = new Recipe(recipeData)
            this.recipes.push(recipe)
        }
    }

    /**
     * Launch search when 3 keys entered
     */
    addSearchListener() {
        const that = this
        const inputSearchbar = document.getElementById('searchbarInput')

        // Ecouteur saisie sur la barre de recherche principale
        inputSearchbar.addEventListener('keyup', function () {
            const NB_CHAR_MAX = 3;

            if (inputSearchbar.value.length >= NB_CHAR_MAX) {
                let results = []

                for (let recipe of that.recipes) {
                    // Recherche dans le titre de la recette
                    if (recipe.name.indexOf(inputSearchbar.value) > 0) {
                        results[recipe.id] = recipe
                    }

                    // Recherche dans la description de la recette
                    if (recipe.description.indexOf(inputSearchbar.value) > 0) {
                        results[recipe.id] = recipe
                    }

                    // Recherche dans la liste des ingrédients
                    for (let ingredient of recipe.ingredients) {
                        if (ingredient.ingredient.indexOf(inputSearchbar.value) > 0) {
                            results[recipe.id] = recipe
                        }
                    }
                }

                // Show search results
                if (results.length === 0) {
                    that.recipesSection.innerHTML = 'Aucun résultat'
                } else {
                    that.recipesSection.innerHTML = ''

                    results.forEach(function(result){
                        that.recipesSection.appendChild(result.createCard())
                    });
                }
            }
        });
    }
}

const app = new App()
app.main()