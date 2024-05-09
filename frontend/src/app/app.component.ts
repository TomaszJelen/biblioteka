import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AutorTableComponent } from './autor-table/autor-table.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    console.log("INTERCEPTED!!!!!!!!!!!!")
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest'),
      withCredentials: true
    });
    return next.handle(xhr);
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AutorTableComponent, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
})
export class AppComponent {
  title = 'biblioteka-app';

  
}
