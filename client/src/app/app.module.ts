import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { MomentModule } from 'angular2-moment';

//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


//servicios
import { UserService } from './services/user.service';


@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      routing,
      FormsModule,
      HttpClientModule,
      MomentModule

   ],
   providers: [
      appRoutingProviders,
      UserService
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
