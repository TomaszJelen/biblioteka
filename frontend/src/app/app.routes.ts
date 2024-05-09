import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { StartComponent } from './start/start.component';
import { AutorTableComponent } from './autor-table/autor-table.component';
import { AutorFormComponent } from './autor-form/autor-form.component';
import { CzytelnikFormComponent } from './czytelnik-form/czytelnik-form.component';
import { KsiazkaTableComponent } from './ksiazka-table/ksiazka-table.component';
import { KsiazkaFormComponent } from './ksiazka-form/ksiazka-form.component';
import { CzytelnikTableComponent } from './czytelnik-table/czytelnik-table.component';
import { BorrowTableComponent } from './borrow-table/borrow-table.component';
import { BorrowFormComponent } from './borrow-form/borrow-form.component';
import { LoginComponent } from './login/login.component';
import { AccountService } from './account.service';
import { inject } from '@angular/core';

export const authenticationGuardAdmin : CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {return inject(AccountService).authorities.includes('ROLE_ADMIN');};

export const authenticationGuardAuthorized : CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {return inject(AccountService).authenticated;};

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: StartComponent },
    { path: 'table', component: AutorTableComponent },
    { path: 'autortable', component: AutorTableComponent },
    { path: 'ksiazkatable', component: KsiazkaTableComponent },
    { path: 'czytelniktable', component: CzytelnikTableComponent, canActivate: [authenticationGuardAuthorized] },
    { path: 'borrowtable', component: BorrowTableComponent, canActivate: [authenticationGuardAuthorized] },
    { path: 'autorform', component: AutorFormComponent, canActivate: [authenticationGuardAdmin]  },
    { path: 'czytelnikform', component: CzytelnikFormComponent, canActivate: [authenticationGuardAdmin]   },
    { path: 'ksiazkaform', component: KsiazkaFormComponent, canActivate: [authenticationGuardAdmin]   },
    { path: 'borrowform', component: BorrowFormComponent, canActivate: [authenticationGuardAuthorized] },
    { path: 'autorupdate', component: KsiazkaFormComponent, canActivate: [authenticationGuardAdmin]   },
    { path: 'login', component: LoginComponent },
];
