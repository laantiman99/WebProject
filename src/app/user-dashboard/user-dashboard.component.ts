import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(public authService: AuthService) { }
  name:String="";
  rank:String="";

  ngOnInit(): void {
     this.name = this.authService.getUsers();
     this.rank = this.authService.getRank();
  }


}
