import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../global-constans';
import { Autor } from '../autor-table/autor-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autor-form',
  styleUrl: './autor-form.component.css',
  templateUrl: './autor-form.component.html',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})
export class AutorFormComponent {

  formGroup: FormGroup;
  row: Autor;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    this.row = history.state;
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'id': [this.row?.id],
      'imie': [this.row?.imie, Validators.required],
      'nazwisko': [this.row?.nazwisko, Validators.required],
    });
  }

  onSubmit() {
    console.log(this.formGroup.value);
    const href = `${GlobalConstants.restURL}/autor`;
    this.httpClient.post(href, this.formGroup.value).subscribe(
      (val) => {
        console.log("POST call successful value returned in body", val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
      this.router.navigateByUrl("autortable");
  }
}
