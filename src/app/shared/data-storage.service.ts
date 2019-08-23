import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

    constructor(
        private http: HttpClient, 
        private recipeService: RecipeService) { }

    public storeRecipes() {
        return this.http.put(`https://udemy-ng-recipe-book-77bde.firebaseio.com/recipes.json`, 
        this.recipeService.getRecipes());
    }

    public getRecipes() {
        return this.http.get<Array<Recipe>>(`https://udemy-ng-recipe-book-77bde.firebaseio.com/recipes.json`)
        .pipe(map((response) => { 
            return response.map(recipe => {
                return {
                    ...recipe, 
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            });
        }),
        tap((recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);
        }));
    }

}