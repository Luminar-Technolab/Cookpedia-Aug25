import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  let router = inject(Router)
  const user:any = JSON.parse(sessionStorage.getItem("user") || "")
  console.log(user);
  
  if(user.role=="user"){
    return true;
  }else{
    alert("Unauthorised access...")
    router.navigateByUrl('/login')
    return false;
  }
  
};
