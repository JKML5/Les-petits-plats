class App {
    constructor() { 
        this.recipesSection         = document.querySelector('.recipes')
        this.ingredientsListSection = document.querySelector('.dropdown-menu--ingredients')
        this.appliancesListSection  = document.querySelector('.dropdown-menu--appliances')
        this.ustensilsListSection   = document.querySelector('.dropdown-menu--ustensils')

        this.recipes     = [] // Recettes
        this.ingredients = [] // Ingrédients
        this.appliances  = [] // Appareils
        this.ustensils   = [] // Ustensils
    }

    async main() {
        this.loadRecipes()
        this.addSearchListener()
    }

    /**
     * Load recipes from Array and convert into instance of class
     */
    loadRecipes() {
        for (let recipe of recipes) {
            this.recipes.push(new Recipe(recipe))
        }

        this.updateTagList(this.recipes);
    }

    /**
     * Launch search when 3 keys entered
     */
    addSearchListener() {
        const inputSearchbar = document.getElementById('searchbarInput')

        inputSearchbar.addEventListener('keyup', () => {
            const NB_CHAR_MAX = 3;

            if (inputSearchbar.value.length >= NB_CHAR_MAX) {
                let results = []

                for (let recipe of this.recipes) {
                    // Recipe title
                    if (recipe.name.indexOf(inputSearchbar.value) > 0) {
                        results[recipe.id] = recipe
                    }

                    // Recipe description
                    if (recipe.description.indexOf(inputSearchbar.value) > 0) {
                        results[recipe.id] = recipe
                    }

                    // Ingredients name
                    for (let ingredient of recipe.ingredients) {
                        if (ingredient.ingredient.indexOf(inputSearchbar.value) > 0) {
                            results[recipe.id] = recipe
                        }
                    }
                }

                // Update tags lists
                this.updateTagList(results)

                // Show search results
                if (results.length === 0) {
                    this.recipesSection.innerHTML = 'Aucun résultat'
                } else {
                    this.recipesSection.innerHTML = ''

                    results.forEach(result => {
                        this.recipesSection.appendChild(result.createCard())
                    });
                }
            }
        });
    }

    updateTagList(recipes) {
        // Clear old elements
        this.ingredients = []
        this.appliances  = []
        this.ustensils   = []

        this.ingredientsListSection.innerHTML = '';
        this.appliancesListSection.innerHTML  = '';
        this.ustensilsListSection.innerHTML   = '';

        // Add new elements
        recipes.forEach(recipe => {
            this.ingredients.push(...recipe.getIngredients())
            this.appliances.push(recipe.getAppliance())
            this.ustensils.push(...recipe.getUstensils())
        });

        // Remove duplicates
        this.ingredients = [...new Set(this.ingredients)]
        this.appliances  = [...new Set(this.appliances)]
        this.ustensils   = [...new Set(this.ustensils)]

        // Show
        for (let ingredient of this.ingredients) {
            this.ingredientsListSection.appendChild(RecipeCard.createTagCard(ingredient))
        }

        for (let appliance of this.appliances) {
            this.appliancesListSection.appendChild(RecipeCard.createTagCard(appliance))
        }

        for (let ustensil of this.ustensils) {
            this.ustensilsListSection.appendChild(RecipeCard.createTagCard(ustensil))
        }
    }
}

const app = new App()
app.main()