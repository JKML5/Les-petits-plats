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
    }
}