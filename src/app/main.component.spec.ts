/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppTopbarComponent } from './app.topbar.component';
import { AppInlineProfileComponent } from './app.profile.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { ScrollPanel } from 'primeng/primeng';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent,
        AppTopbarComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppInlineProfileComponent,
        ScrollPanel,
        MainComponent
      ],
      providers: []
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
