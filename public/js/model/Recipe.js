class Recipe {

    /**
     * Constructor
     * @param {*} data Recipe object from data imported
     */
    constructor(data) {
        this.id          = data.id
        this.name        = data.name
        this.servings    = data.servings
        this.ingredients = data.ingredients
        this.time        = data.time
        this.description = data.description
        this.appliance   = data.appliance
        this.ustensils   = data.ustensils
        this.searchKeys  = this.getSearchKeys()
    }

    createCard() {
        const recipeCard = new RecipeCard(this)
        return recipeCard.create()
    }

    /**
     * Returns the list of ingredients
     * returns array
     */
    getIngredients() {
        const resIngredients = []

        for (let ingredient of this.ingredients) {
            resIngredients.push(ingredient.ingredient)
        }

        return resIngredients
    }

    /**
     * Returns appliance
     * returns String
     */
    getAppliance() {
        return this.appliance
    }

    /**
     * Returns the list of ustensils
     * returns array
     */
    getUstensils() {
        const resUstensils = []

        for (let ustensil of this.ustensils) {
            resUstensils.push(ustensil)
        }

        return resUstensils
    }

    /**
     * Get all terms for search
     * @returns array
     */
    getSearchKeys() {
        let searchKeys = []

        searchKeys.push(this.name)
        searchKeys.push(this.description)

        for (let ingredient of this.ingredients) {
            searchKeys.push(ingredient.ingredient)
        }

        return searchKeys
    }
}