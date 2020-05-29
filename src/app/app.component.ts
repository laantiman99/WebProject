import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './Auth/sign-up/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PriSports';

  constructor(private http:HttpClient, private authService:AuthService){};

  ngOnInit():void{
    this.authService.AuthUser();
  }


  close(){
    document.getElementById('side-menu').style.width='0px';
    document.getElementById('displayNone').style.display='none';
  }

}

