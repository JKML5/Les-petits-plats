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
        this.addTagsSearchListener()

        const ingredientsListInput = document.querySelector('.searchkey--blue .searchkey__input')
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
                    if (recipe.name.toLowerCase().indexOf(inputSearchbar.value.toLowerCase()) != -1) {
                        results[recipe.id] = recipe
                    }

                    // Recipe description
                    if (recipe.description.toLowerCase().indexOf(inputSearchbar.value.toLowerCase()) != -1) {
                        results[recipe.id] = recipe
                    }

                    // Ingredients name
                    for (let ingredient of recipe.ingredients) {
                        if (ingredient.ingredient.toLowerCase().indexOf(inputSearchbar.value.toLowerCase()) != -1) {
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

    /**
     * Update ingredients, appliances & ustensils dropbox content according to recipes
     * @param array recipes 
     */
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

    addTagsSearchListener() {
        const ingredientsListInput = document.querySelector('.searchkey--blue .searchkey__input')
        const appliancesListInput  = document.querySelector('.searchkey--green .searchkey__input')
        const ustensilsListInput   = document.querySelector('.searchkey--red .searchkey__input')

        const NB_CHAR_MAX = 3;

        ingredientsListInput.addEventListener('click', () => {
            const searchDropdown = new bootstrap.Dropdown('#searchkey__btn--ingredients');
            searchDropdown.show();
            ingredientsListInput.focus()
        })

        appliancesListInput.addEventListener('click', () => {
            const searchDropdown = new bootstrap.Dropdown('#searchkey__btn--appliances');
            searchDropdown.show();
            appliancesListInput.focus()
        })

        ustensilsListInput.addEventListener('click', () => {
            const searchDropdown = new bootstrap.Dropdown('#searchkey__btn--ustensils');
            searchDropdown.show();
            ustensilsListInput.focus()
        })

        ingredientsListInput.addEventListener('keyup', () => {
            if (ingredientsListInput.value.length >= NB_CHAR_MAX) {
                let results = []

                for (let ingredient of this.ingredients) {
                    if (ingredient.toLowerCase().indexOf(ingredientsListInput.toLowerCase().value) != -1) {
                        results.push(ingredient)
                    }
                }

                this.ingredientsListSection.innerHTML = '';

                for (let ingredient of results) {
                    this.ingredientsListSection.appendChild(RecipeCard.createTagCard(ingredient))
                }
            }
        });

        appliancesListInput.addEventListener('keyup', () => {
            if (appliancesListInput.value.length >= NB_CHAR_MAX) {
                let results = []

                for (let appliance of this.appliances) {
                    if (appliance.toLowerCase().indexOf(appliancesListInput.value.toLowerCase()) != -1) {
                        results.push(appliance)
                    }
                }

                this.appliancesListSection.innerHTML = '';

                for (let appliance of results) {
                    this.appliancesListSection.appendChild(RecipeCard.createTagCard(appliance))
                }
            }
        });

        ustensilsListInput.addEventListener('keyup', () => {
            if (ustensilsListInput.value.length >= NB_CHAR_MAX) {
                let results = []

                for (let ustensil of this.ustensils) {
                    if (ustensil.toLowerCase().indexOf(ustensilsListInput.value.toLowerCase()) != -1) {
                        results.push(ustensil)
                    }
                }

                this.ustensilsListSection.innerHTML = '';

                for (let ustensil of results) {
                    this.ustensilsListSection.appendChild(RecipeCard.createTagCard(ustensil))
                }
            }
        });
    }
}

const app = new App()
app.main()