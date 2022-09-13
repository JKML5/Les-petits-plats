class App {
    constructor() { 
        // DOM elements
        this.inputSearchbar         = document.getElementById('searchbarInput')
        this.recipesSection         = document.querySelector('.recipes')
        this.ingredientsListSection = document.querySelector('.dropdown-menu--ingredients')
        this.appliancesListSection  = document.querySelector('.dropdown-menu--appliances')
        this.ustensilsListSection   = document.querySelector('.dropdown-menu--ustensils')
        this.tagsTextInputs         = document.querySelectorAll('.searchkey__input')
        this.tags                   = document.querySelector('.badges')

        this.searchValue = ''; // Search textbox
        this.NB_CHAR_MAX = 3;
        this.TYPES       = ['ingredients', 'appliances', 'ustensils']
        this.recipes     = [] // Recettes
        this.ingredients = this.ingredientsTags = [] // Ingrédients
        this.appliances  = this.appliancesTags  = [] // Appareils
        this.ustensils   = this.ustensilsTags   = [] // Ustensils
    }

    /**
     * Start
     */
    async main() {
        this.loadRecipes()
        this.addSearchListener()
        this.search()
    }

    /**
     * Load recipes from Array and convert into instances of class
     */
    loadRecipes() {
        for (let recipe of recipes) {
            this.recipes.push(new Recipe(recipe))
        }
    }

    /**
     * Launch search when 3 keys entered
     */
    addSearchListener() {
        this.inputSearchbar.addEventListener('keyup', () => {
            this.searchValue = (this.inputSearchbar.value.length >= this.NB_CHAR_MAX) ? this.inputSearchbar.value : ''
            this.search()
        });
    }

    /**
     * Update ingredients, appliances & ustensils dropdown content according to recipes
     * @param array recipes 
     */
    updateTagList(recipes) {
        for (let type of this.TYPES) {
            // Clear old items
            this[type] = []
            this[type + 'ListSection'].innerHTML = '';
        }

        // Add new elements
        recipes.forEach(recipe => {
            this.ingredients.push(...recipe.getIngredients())
            this.appliances.push(recipe.getAppliance())
            this.ustensils.push(...recipe.getUstensils())
        });

        for (let type of this.TYPES) {
            // Remove duplicates
            this[type] = [...new Set(this[type])]

            //Show
            for (let tagName of this[type]) {
                this[type + 'ListSection'].appendChild(RecipeCard.createTagCard(tagName))
            }
        }
    }

    /**
     * Listeners on tags input elements
     */
    addTagsSearchListener() {
        this.tagsTextInputs.forEach(tagTextInput => {
            // Click on tag text box
            tagTextInput.addEventListener('click', () => {
                const searchDropdown = new bootstrap.Dropdown('#searchkey__btn--' + tagTextInput.dataset.type);
                searchDropdown.show();
                tagTextInput.focus()
            })

            // Type text
            tagTextInput.addEventListener('keyup', () => {
                if (tagTextInput.value.length >= app.NB_CHAR_MAX) {
                    this[tagTextInput.dataset.type + 'ListSection'].innerHTML = '';

                    for (let tagValue of this[tagTextInput.dataset.type]) {
                        if (this.searchOK(tagValue, tagTextInput.value)) {
                            const badgeElement = RecipeCard.createTagCard(tagValue)

                            badgeElement.querySelector('.dropdown-item').addEventListener('click', () => {
                                this.tagAdd(tagValue, tagTextInput.dataset.type)
                            })

                            this[tagTextInput.dataset.type + 'ListSection'].appendChild(badgeElement)
                        }
                    }
                }
            })
        });

        /**
         * Click on dropdown items
         */
        document.querySelectorAll('.dropdown-item').forEach(tagElt => {
            tagElt.addEventListener('click', () => {
                this.tagAdd(tagElt.text, tagElt.parentNode.parentNode.dataset.type)
            })
        })
    }

    /**
     * Searching
     * @param {String} extract text to search
     * @param {String} fulltext 
     * @returns 
     */
    searchOK(extract, fulltext) {
        return (extract.toLowerCase().indexOf(fulltext.toLowerCase()) != -1) 
    }

    search() {
        let searchResults = []

        for (let recipe of this.recipes) {
            // Recipe title
            if (this.searchOK(recipe.name, this.searchValue)) {
                searchResults[recipe.id] = recipe
            }

            // Recipe description
            if (this.searchOK(recipe.description, this.searchValue)) {
                searchResults[recipe.id] = recipe
            }

            // Ingredients name
            for (let ingredient of recipe.ingredients) {
                if (this.searchOK(ingredient.ingredient, this.searchValue)) {
                    searchResults[recipe.id] = recipe
                }
            }
        }

        // Filter by selected tags
        searchResults = this.filterByTag(searchResults)

        // Update tags lists
        this.updateTagList(searchResults)

        // Show search results
        if (searchResults.length === 0) {
            this.recipesSection.innerHTML = 'Aucun résultat'
        } else {
            this.recipesSection.innerHTML = ''

            searchResults.forEach(result => {
                this.recipesSection.appendChild(result.createCard())
            });
        }

        this.addTagsSearchListener()
    }

    /**
     * Add a new tag and update search
     * @param {String} tagName
     * @param {String} type ingredients / appliances / ustensils
     */
    tagAdd(tagName, type) {
        this[type + 'Tags'].push(tagName)
        this.tagShow()
        this.search()
    }

    /**
     * Remove tag and update search
     * @param {String} tagName 
     * @param {String} type 
     */
    tagRemove(tagName, type) {
        // Remove tag from the list
        for(let i = 0; i < this[type + 'Tags'].length; i++){ 
            if ( this[type + 'Tags'][i] === tagName) { 
                this[type + 'Tags'].splice(i, 1); 
                i--; 
            }
        }

        this.tagShow()
        this.search()
    }

    tagShow() {
        this.tags.innerHTML = ''

        for (let type of this.TYPES) {
            if (this[type + 'Tags'].length > 0) {
                for (let tagName of this[type + 'Tags']) {
                    const badgeElement = RecipeCard.createTagBadge(tagName, type)

                    badgeElement.querySelector('.badge__link').addEventListener('click', () => {
                        this.tagRemove(tagName, type)
                    })

                    this.tags.appendChild(badgeElement)
                }
            }
        }
    }

    filterByTag(recipes) {
        const that = this
        let ok
        let filteredRecipes = []

        // On parcourt chaque recette
        recipes.forEach(function(recipe) {
            ok = true
            let i = 0

            // Filter by ingredients tag
            if (that.ingredientsTags.length > 0) {
                while (ok && i < that.ingredientsTags.length) {
                    ok = recipe.getIngredients().includes(that.ingredientsTags[i])
                    i++
                }
            }

            // Filter by appliances tag
            if (that.appliancesTags.length > 0) {
                while (ok && i < that.appliancesTags.length) {
                    ok = recipe.appliance === that.appliancesTags[i]
                    i++
                }
            }

            // Filter by ustensils tag
            if (that.ustensilsTags.length > 0) {
                while (ok && i < that.ustensilsTags.length) {
                    ok = recipe.ustensils.includes(that.ustensilsTags[i])
                    i++
                }
            }

            if (ok) {
                filteredRecipes.push(recipe)
            }
        });

        return filteredRecipes
    }
}

const app = new App()
app.main()