import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../Auth/sign-up/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  authenticatedUser:boolean=false;
  private authListenSubs:Subscription;
  constructor (private authService:AuthService) {};

  ngOnInit(): void {
    this.authenticatedUser = this.authService.getIsAuth();
    this.authListenSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.authenticatedUser = isAuthenticated;
    });

  }

  ngOnDestroy():void{
    this.authListenSubs.unsubscribe();
  }

  openSlide(){
    document.getElementById('side-menu').style.width='350px';
    document.getElementById('displayNone').style.display='contents';
    return false;
  }

  close(){
    document.getElementById('side-menu').style.width='0px';
    document.getElementById('displayNone').style.display='none';
    return false;
  }
  onLogout(){
    this.authService.logout();
  }


}
