import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router,RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AfterloginGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url: string = state.url;  
    return this.verifyLogin(url);
   
   
}
verifyLogin(url:string) : any{
    if(!this.isLoggedIn()){
      this.router.navigate([localStorage.getItem("address")]);

      // this.router.navigate(['/']);
        return false;
    }
    else if(this.isLoggedIn()){
  
      return true;
    }
    
        
}
public isLoggedIn(): boolean{
    let status = false;
    if( localStorage.getItem('isLoggedIn') == "true"){
      
      status = true;
    }
    else{
      status = false;
    }
    return status;
}
 
  
}
