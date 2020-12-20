import { Component } from '@angular/core';
import { UserAuthentication } from './_models/userauthentication';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser!: UserAuthentication;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,)
  {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}