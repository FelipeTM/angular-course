import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  public isAuthenticated = false;

  constructor(private dsService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      (user) => {
        this.isAuthenticated = !!user;
      }
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  public onSaveData() {
    this.dsService.storeRecipes().subscribe(
      (response) => { }
    );
  }

  public onFetchData() {
    this.dsService.getRecipes().subscribe();
  }

  public onLogout() {
    this.authService.logout();
  }

}
