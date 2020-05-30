import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './Auth/sign-up/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({providedIn:"root"})
export class AuthService{

  private token:string;
  private name:string;
  private tennis:any;
  private table:any;
  private badminton:any;
  private squash:any;
  private rank:string;
  private roleId:string;
  private authStatusListener =  new Subject<boolean>();
  private isAuthenticated:boolean=false;
  private tokenTimer:any;

  constructor (private http:HttpClient, private router:Router) {}

  createUser(name: string, email: string, password:string, tennis:any, table:any, badminton:any, squash:any, rank:string){
    const authData: AuthData= { name: name, email: email, password: password, tennis:tennis, table:table, badminton:badminton, squash:squash, rank:rank };
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
      const authData: AuthData= { name: name, email: email, password: password, tennis:this.tennis, table:this.table, badminton:this.badminton, squash:this.squash, rank:this.rank};
      this.http.post<{token:string, expiresIn:number, name:string, roleId:string, rank:string}>("http://localhost:3000/api/user/Login", authData).subscribe(response =>{
        console.log(response);
        const token = response.token;
        const name=response.name;
        const roleId = response.roleId;
        const rank = response.rank;
        this.rank = response.rank;
        this.name = name;
        this.roleId = roleId;
        this.token = token;
        if(token){
          this.isAuthenticated=true;
          const expires = response.expiresIn;
          this.authStatusListener.next(true);
          this.setAuthTimer(expires);
          if(roleId==="User"){
            this.router.navigate(['/u_dashboard']);
          }
          else{
            this.router.navigate(['/c_dashboard']);
          }
          const now= new Date();
          const expiration = new Date(now.getTime()+ expires*1000);
          this.saveAuthData(token, expiration, name, roleId);
        }

      });
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

  private saveAuthData(token:string, expirationDate:Date, name:string, roleId:string){
    localStorage.setItem("token", token);
    localStorage.setItem("date", expirationDate.toISOString());
    localStorage.setItem("name", name);
    localStorage.setItem("roleId", roleId);
  }
  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("date");
    localStorage.removeItem("name");
    localStorage.removeItem("roleId");
  }
  private getAuthData(){
    const token = localStorage.getItem("token");
    const expiredate = localStorage.getItem("date");
    const name = localStorage.getItem("name");
    if(!token || !expiredate){
        return;
    }
    return {token:token, expiredate: new Date(expiredate), name:name};
  }

  getUsers(){
    const authInfo = this.getAuthData();
    this.name = authInfo.name;
    return this.name;
  }
  getRank(){
    return this.rank;
  }
}
