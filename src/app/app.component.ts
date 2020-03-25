import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AppState } from './store/app.reducer';
import { Store } from '@ngrx/store';
import { AutoLogin } from './auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>,
              @Inject(PLATFORM_ID) private platformId) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(PLATFORM_ID)) {
      this.store.dispatch(new AutoLogin());
    }
  }
}
