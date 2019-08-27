import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Array<Recipe> = [
    //     new Recipe("Manteiga",
    //     "É manteiga, cara",
    //     "https://receitanatureba.com/wp-content/uploads/2017/12/66-5.jpg",
    //     [new Ingredient('Leite', 1), new Ingredient('Sal', 1)]),
    //     new Recipe("Manteiga",
    //     "Manteiga, porra",
    //     "https://receitanatureba.com/wp-content/uploads/2017/12/66-5.jpg",
    //     [new Ingredient('Leite', 1), new Ingredient('Sal', 1)])
    // ];
    private recipes: Array<Recipe> = [];

    constructor(private slService: ShoppingListService) {}

    public getRecipe(id: number) {
        return this.recipes[id];
    }

    public getRecipes() {
        return this.recipes.slice();
    }

    public setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    public addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    public addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    public updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    public deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}
