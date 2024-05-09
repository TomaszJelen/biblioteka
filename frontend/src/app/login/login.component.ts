import { HTTP_INTERCEPTORS, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {  
  formGroup: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: AccountService) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  login() {
    this.service.authenticate(this.formGroup.value, () => {
        this.router.navigateByUrl('/');
    });
    return false;
  }

  authenticated() { return this.service.authenticated; }
}
