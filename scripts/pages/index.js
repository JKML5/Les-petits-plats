class App {
    constructor() {
        this.recipes = recipes
    }

    async main() {
        console.log(this.recipes)
    }

}

const app = new App()
app.main()

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
                console.log(recipe.name)
            }

            // Recherche dans la description de la recette
            if (recipe.description.indexOf(inputSearchbar.value) > 0) {
                console.log(recipe.description)
            }

            // Recherche dans la liste des ingrédients
            for (let ingredient of recipe.ingredients) {
                if (ingredient.ingredient.indexOf(inputSearchbar.value) > 0) {
                    console.log(ingredient.ingredient)
                }
            }
        }
    }
});