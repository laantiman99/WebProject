import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router, NavigationStart } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PriSports';
  showMenu;
  constructor(private http:HttpClient, private authService:AuthService, public router:Router){
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
          this.showMenu = event.url != "/signup";
      }
    });
  };

  ngOnInit():void{
    this.authService.AuthUser();
  }


  close(){
    document.getElementById('side-menu').style.width='0px';
    document.getElementById('displayNone').style.display='none';
  }


}

