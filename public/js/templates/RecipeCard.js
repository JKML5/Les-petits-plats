class RecipeCard {
    constructor(recipe) {
        this._recipe = recipe
    }

    create() {
        const wrapper = document.createElement('div')
        wrapper.classList.add('card')
        wrapper.classList.add('recipe')
        wrapper.setAttribute('data-id', this._recipe.id)

        let recipeCard = `
            <img src="./public/assets/images/recipe-bg.png" class="card-img-top" alt="Photo ${this._recipe.name}">
            <div class="card-body">
                <div class="card-heading">
                    <h2 class="card-title">${this._recipe.name}</h2>
                    <div class="recipe-preparation-time">
                        <i class="fa-regular fa-clock"></i> ${this._recipe.time} min
                    </div>
                </div>
                <div class="card-text">
                    <p class="recipe-ingredients">
        `

        for (let ingredient of this._recipe.ingredients) {
            ingredient.unit = ingredient.unit === undefined ? '' : ingredient.unit;

            recipeCard += `<strong>${ingredient.ingredient} : </strong> ${ingredient.quantity} ${ingredient.unit}<br>`
        }

        recipeCard +=
        `
                    </p>
                    <p class="recipe-preparation">${this._recipe.description}</p>
                </div>
            </div>
        `

        wrapper.innerHTML = recipeCard
        return wrapper
    }

    /**
     * Return HTML element for tag list
     * @param {string} tag 
     * @returns 
     */
    static createTagCard(tag) {
        const wrapper = document.createElement('li')

        wrapper.innerHTML = `<a class="dropdown-item" href="#">${tag}</a>`

        return wrapper
    }

    /**
     * Return tag in HTML format
     * @param {string} tag 
     * @returns 
     */
         static createTagBadge(tag, type) {
            const wrapper = document.createElement('span')
            wrapper.classList.add('badge')
            wrapper.classList.add('badge--' + type)

            wrapper.innerHTML = `${tag} <a href="#" class="badge__link"><i class="fa-regular fa-circle-xmark close"></i></a>`
    
            return wrapper
        }
}
