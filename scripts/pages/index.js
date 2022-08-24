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