import {Component} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AccountService } from '../account.service';
import { CommonModule } from '@angular/common';

/**
 * @title Basic menu
 */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, RouterModule, CommonModule],
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private service: AccountService) {}

  authenticated() { return this.service.authenticated; }
  isAdmin() { return this.service.authorities.includes('ROLE_ADMIN'); }
}
