import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  authenticated = false;
  authorities : Array<string> = [];
  user : string = "";

  constructor(private http: HttpClient, private router: Router) {
  }

  authenticate(credentials: { username: string; password: string; }, callback: () => any) {

    const headers = new HttpHeaders(credentials ? {
        authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});


    const href = `http://localhost:8080/user`;
    this.http.get(href, {headers: headers}).subscribe(response => {
        if ("authorities" in response) {
          this.authenticated = true;
          this.authorities = (<Array<Authority>>response.authorities).map(a => a.authority);
          this.user = credentials.username;
        } else {
          this.authenticated = false;
          this.authorities = [];
          this.user = "";
        }
        return callback && callback();
    });
  }

  logout() {
    const href = `http://localhost:8080/logout`;
    this.http.post(href, {}).pipe(
    finalize(() => {
        this.authenticated = false;
        this.authorities = [];
        this.router.navigateByUrl('/home');
    })).subscribe();
  }

}

export interface Authority {
  authority: string;
}
