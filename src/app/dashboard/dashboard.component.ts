import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: {name: string,pass:number};
  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.user={
      name:this.route.snapshot.paramMap.get('name'),
      pass:1
  }
    // this.route.params.subscribe(
    //   (params:Params)=>{
    //     this.user.name=params[]
    //   }
    // )
  }
}
