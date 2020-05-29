import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({providedIn:"root"})
export class AuthService{
  private token:string;
  private authStatusListener =  new Subject<boolean>();
  private isAuthenticated:boolean=false;
  private tokenTimer:any;
  constructor (private http:HttpClient, private router:Router) {}
  createUser(name: string, email: string, password:string){
    const authData: AuthData= { name: name, email: email, password: password};
    this.http.post("http://localhost:3000/api/user/Signup", authData).subscribe(response =>{
      console.log(response);
    });
  }

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  login(email: string, password: string){
      const authData: AuthData= { name: name, email: email, password: password};
      this.http.post<{token:string, expiresIn:number}>("http://localhost:3000/api/user/Login", authData).subscribe(response =>{
        console.log(response);
        const token = response.token;
        this.token = token;
        if(token){
          this.isAuthenticated=true;
          const expires = response.expiresIn;
          this.authStatusListener.next(true);
          this.setAuthTimer(expires);
          this.router.navigate(['/dashboard', authData.name]);
          const now= new Date();
          const expiration = new Date(now.getTime()+ expires*1000);
          this.saveAuthData(token, expiration);
        }

      });
  }
  getInfo(){
    
    return this.http.get("http://localhost:3000/api/user/Login");
  }
  AuthUser(){
    const authInfo = this.getAuthData();
    if(!authInfo){
      return;
    }
    const now = new Date();
    const isInFuture= authInfo.expiredate.getTime() - now.getTime();
    if(isInFuture>0){
      this.token=authInfo.token;
      this.isAuthenticated=true;
      this.setAuthTimer(isInFuture/1000)
      this.authStatusListener.next(true);
    }
  }


  logout(){
    this.token=null;
    this.isAuthenticated=false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/home']);
    clearTimeout(this.tokenTimer);
  }

  private setAuthTimer(duration :number, ){
    this.tokenTimer = setTimeout(()=>{
      this.logout();
    }, duration*1000);
  }

  private saveAuthData(token:string, expirationDate:Date){
    localStorage.setItem("token", token);
    localStorage.setItem("date", expirationDate.toISOString());
  }
  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("date");
  }
  private getAuthData(){
    const token = localStorage.getItem("token");
    const expiredate = localStorage.getItem("date");
    if(!token || !expiredate){
        return;
    }
    return {token:token, expiredate: new Date(expiredate)};
  }
  getName(){

  }
}
