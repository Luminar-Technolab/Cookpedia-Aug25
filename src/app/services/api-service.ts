import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RecipeModel } from '../admin/models/recipeModel';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  server_url = "https://cookpedia-server-aug25.onrender.com"
  http = inject(HttpClient)

  //getallrecipaes - home & recipes
  getAllRecipesAPI(){
    return this.http.get(`${this.server_url}/recipes`)
  }

  //register - called by register when register btn clicked
  registerAPI(user:any){
    return this.http.post(`${this.server_url}/register`,user)
  }

  //login - called by login when login btn clicked
  loginAPI(user:any){
    return this.http.post(`${this.server_url}/login`,user)
  }

  appendToken(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  //view recipes
  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.server_url}/recipes/${recipeId}`,this.appendToken())
  }
  //http://localhost:3000/recipes-related?cuisine=Asian - get from view rcipe compoenent when page loads
  getRelatedRecipesAPI(cuisine:string){
    return this.http.get(`${this.server_url}/recipes-related?cuisine=${cuisine}`,this.appendToken())
  }

  //http://localhost:3000/downloads/696f4fa9effaa0ed172ff928 : post by view recipe compoenent whwn download btn clicked
  downloadRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/downloads/${recipeId}`,reqBody,this.appendToken())
  }

  //http://localhost:3000/save-recipe/696f4fa9effaa0ed172ff928 : post by view recipe compoenent whwn save btn clicked
  saveRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/save-recipe/${recipeId}`,reqBody,this.appendToken())
  }
  //http://localhost:3000/save-recipes : get by save recipe when ppage loads
  getUserSavedRecipesAPI(){
    return this.http.get(`${this.server_url}/save-recipes`,this.appendToken())
  }

  ///save-recipes/:id : delete by save recipe when delelte btn clicked
  removeUserSavedRecipeItemAPI(id:string){
    return this.http.delete(`${this.server_url}/save-recipes/${id}`,this.appendToken())
  }

  //http://localhost:3000/feedbacks : post by contact when submit clicked
  addFeedbackAPI(reqBody:any){
    return this.http.post(`${this.server_url}/feedbacks`,reqBody)
  }

  //approve-feedbacks : get request by home component when page load
  getApproveFeedbacksAPI(){
    return this.http.get(`${this.server_url}/approve-feedbacks`)
  }

  //http://localhost:3000/users/6971e82f66fdc47147721f3c put reqst by profile compoenent when picture upload
  updateUserProfileAPI(id:string,reqBody:any){
    return this.http.put(`${this.server_url}/users/${id}`,reqBody,this.appendToken())
  }
  //http://localhost:3000/user-downloads get rqst by profile whwn page loads
  getUserDownloadAPI(){
    return this.http.get(`${this.server_url}/user-downloads`,this.appendToken())
  }
  //http://localhost:3000/downloads : get by admin download list 
  getAllDownloadAPI(){
    return this.http.get(`${this.server_url}/downloads`,this.appendToken())
  }

  //http://localhost:3000/users get rqst user compoenent
  getAllUsersAPI(){
    return this.http.get(`${this.server_url}/users`,this.appendToken())
  }
  //http://localhost:3000/feedbacks : get
  getAllFeedbacksAPI(){
    return this.http.get(`${this.server_url}/feedbacks`,this.appendToken())
  }
  //http://localhost:3000/feedbacks/697c706d55cd9b6d23acfeb5 : put
  updateFeedbackAPI(id:string,reqBody:any){
    return this.http.put(`${this.server_url}/feedbacks/${id}`,reqBody,this.appendToken())
  }

  //http://localhost:3000/recipes post
  addRecipeAPI(reqBody:RecipeModel){
    return this.http.post(`${this.server_url}/recipes`,reqBody,this.appendToken())
  }

  //http://localhost:3000/recipes/69830f142cf03bb23bfe4504 : put
  editRecipeAPI(recipeId:string,reqBody:RecipeModel){
    return this.http.put(`${this.server_url}/recipes/${recipeId}`,reqBody,this.appendToken())
  }
  //http://localhost:3000/recipes/69830f142cf03bb23bfe4504 : delete rqst by 
  deleteRecipeAPI(recipeId:string){
    return this.http.delete(`${this.server_url}/recipes/${recipeId}`,this.appendToken())
  }

  getChartData(){
    this.getAllDownloadAPI().subscribe((downloadListArray:any)=>{
      let output:any = {}
      downloadListArray.forEach((recipe:any)=>{
        let cuisine = recipe.cuisine
        let curCount = recipe.count
        if(cuisine in output){
          output[cuisine] += curCount
        }else{
          output[cuisine] = curCount
        }
      })
      const keys = Object.keys(output)
      localStorage.setItem("labels",JSON.stringify(keys))
      const data = Object.values(output)
      localStorage.setItem("data",JSON.stringify(data))
    })
  }

}
