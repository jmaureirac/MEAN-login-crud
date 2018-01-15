import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
   selector: 'login',
   templateUrl: './login.component.html',
   providers: [UserService]
})
export class LoginComponent implements OnInit{
   public title:string;

   constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService
   ){
      this.title = 'Iniciar Sesión';
   }

   ngOnInit(){
      console.log('LoginComponent loaded');
   }
}
