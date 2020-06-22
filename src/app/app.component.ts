import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private roles: string[];
  isLoggedIn : boolean ;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string; 

  title = 'angularJWT';

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit() {
  
  }

  
}
