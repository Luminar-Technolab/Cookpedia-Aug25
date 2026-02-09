import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  const user:any = JSON.parse(sessionStorage.getItem("user") || "")
  console.log(user);
  
  if(user.role=="admin"){
    return true;
  }else{
    alert("Unauthorised access...")
    router.navigateByUrl('/login')
    return false;
  }
};
