import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // imports: [MatButtonModule, MatMenuModule, MatIconModule]
})
export class HeaderComponent implements  OnInit {
  constructor(private authService: AuthService) {
  }

  loggedState: boolean = false;

  ngOnInit() {
    this.authService.isLogged$.subscribe((isLoggedIn:boolean)=> {
      this.loggedState = isLoggedIn;
      console.log('State changed ' + isLoggedIn);
    })
  }

  login() {
    this.authService.logIn();
  }
  logout() {
    this.authService.logOut();
  }

}
