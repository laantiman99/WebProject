import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  onSignup(form:NgForm){
    console.log(form.value);
    if(form.invalid){
      return;
    }
    this.authService.createUser(form.value.name, form.value.email, form.value.password);

  }

  close(){
    document.getElementById('side-menu').style.width='0px';
    document.getElementById('displayNone').style.display='none';
  }
}
