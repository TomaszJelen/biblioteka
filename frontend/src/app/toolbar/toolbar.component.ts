import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MenuComponent } from '../menu/menu.component';
import { RouterModule } from '@angular/router';
import { AccountService } from '../account.service';
import { CommonModule } from '@angular/common';

/**
 * @title Basic toolbar
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MenuComponent, RouterModule, CommonModule],
})
export class ToolbarComponent {
  constructor(private service: AccountService) {}

  logout() {
    this.service.logout();
  }

  authenticated() { 
    return this.service.authenticated; 
  }

  user() { 
    return this.service.user; 
  }
}
