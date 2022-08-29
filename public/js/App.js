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
            this.recipes.push(new Recipe(recipeData))
            const recipeCard = new RecipeCard(recipeData)
            this.recipesSection.appendChild(recipeCard.create())        

        }
    }

    /**
     * Launch search when 3 keys entered
     */
    addSearchListener() {
        const inputSearchbar = document.getElementById('searchbarInput')

        // Ecouteur saisie sur la barre de recherche principale
        inputSearchbar.addEventListener('keyup', function () {
            const NB_CHAR_MAX = 3;

            if (inputSearchbar.value.length >= NB_CHAR_MAX) {
                console.log('Recherche : ' + inputSearchbar.value)

                let results = []

                for (let recipe of app.recipes) {
                    // Recherche dans le titre de la recette
                    if (recipe.name.indexOf(inputSearchbar.value) > 0) {
                        results[recipe.id] = recipe
                        console.log(recipe.name)
                    }

                    // Recherche dans la description de la recette
                    if (recipe.description.indexOf(inputSearchbar.value) > 0) {
                        results[recipe.id] = recipe
                        console.log(recipe.description)
                    }

                    // Recherche dans la liste des ingrédients
                    for (let ingredient of recipe.ingredients) {
                        if (ingredient.ingredient.indexOf(inputSearchbar.value) > 0) {
                            results[recipe.id] = recipe
                            console.log(ingredient.ingredient)
                        }
                    }
                }

                for (let result of results) {
                    console.log(result)
                }

            }
        });
    }
}

const app = new App()
app.main()