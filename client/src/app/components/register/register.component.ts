import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
   selector: 'register',
   templateUrl: './register.component.html',
   providers: [UserService]
})
export class RegisterComponent implements OnInit{
   public title:string;

   constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService
   ){
      this.title = 'Registro';
   }

   ngOnInit(){
      console.log('RegisterComponent loaded');
   }
}
