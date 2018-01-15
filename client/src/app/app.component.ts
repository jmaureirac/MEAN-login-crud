import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit{
   public title:string;
   public url:string;

   constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService
   ){
      this.title = 'JORGEMC';
      this.url = GLOBAL.url;
   }

   ngOnInit(){
      console.log('App Component Started');
   }
}
