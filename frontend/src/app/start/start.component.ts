import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  constructor(private service: AccountService) {}

  authenticated() { 
    console.log("Check made: ", this.service.authenticated)
    return this.service.authenticated; 
  }

}
