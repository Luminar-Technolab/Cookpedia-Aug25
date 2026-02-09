import { Routes } from '@angular/router';
import {Home} from './home/home'
import { Recipes } from './recipes/recipes';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Login } from './login/login';
import { Register } from './register/register';
import { Profile } from './profile/profile';
import { SaveRecipe } from './save-recipe/save-recipe';
import { ViewRecipe } from './view-recipe/view-recipe';
import { Pnf } from './pnf/pnf';
import { authGuard } from './gaurds/auth-guard';
import { adminAuthGuard } from './gaurds/admin-auth-guard';


export const routes: Routes = [
    //lazyloaded - http://localhost:4200/admin
    {
        path:'admin', canActivate:[adminAuthGuard], loadChildren:()=>import('./admin/admin-module').then(module=>module.AdminModule)
    },
    // home
    {
        path:'', component:Home, title:'Home'
    },
    {
        path:'recipes', component:Recipes, title:'All Recipes'
    },
    {
        path:'about', component:About, title:'About'
    },
    {
        path:'contact', component:Contact, title:'Contact'
    },
    {
        path:'login', component:Login, title:'Login'
    },
    {
        path:'register', component:Register, title:'Register'
    },
    {
        path:'profile',canActivate:[authGuard], component:Profile, title:'Profile'
    },
    {
        path:'recipe/save',canActivate:[authGuard], component:SaveRecipe, title:'Recipe Collection'
    },
    {
        path:'recipes/:id/view',canActivate:[authGuard], component:ViewRecipe, title:'View Recipe'
    },
    {
        path:'**', component:Pnf, title:'Page Not Found'
    }
];
