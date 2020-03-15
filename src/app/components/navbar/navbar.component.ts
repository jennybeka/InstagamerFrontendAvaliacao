import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {
  // @Input () logincComp: LoginComponent; 
  page: number = 0;

  constructor(
    private navbar: AuthService
  ) { }

  ngOnInit() {
    this.verifyIsLoggedIn();

  }

  verifyIsLoggedIn(): boolean {
    return this.navbar.returnIsLoggedIn();
  }

  onLogout() {
    this.navbar.logout();
  }


}
