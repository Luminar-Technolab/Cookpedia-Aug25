import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-view-recipe',
  imports: [],
  templateUrl: './view-recipe.html',
  styleUrl: './view-recipe.css',
})
export class ViewRecipe {

  recipe:any = signal({})
  api = inject(ApiService)
  route = inject(ActivatedRoute)
  recipeId:string = this.route.snapshot.params['id']

  ngOnInit(){
    this.getViewRecipe()
  }

  getViewRecipe(){
    this.api.viewRecipeAPI(this.recipeId).subscribe((res:any)=>{
      this.recipe.set(res)
      console.log(this.recipe());
      
    })
  }

}
