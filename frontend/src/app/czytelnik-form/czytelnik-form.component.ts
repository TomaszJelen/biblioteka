import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GlobalConstants } from '../global-constans';
import { Czytelnik } from '../czytelnik-table/czytelnik-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-czytelnik-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './czytelnik-form.component.html',
  styleUrl: './czytelnik-form.component.css'
})
export class CzytelnikFormComponent {

  formGroup: FormGroup;
  row: Czytelnik;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    this.row = history.state;
    console.log("Tekst pierwszy: " + this.row);
    this.createForm();
  }

  createForm() {
    console.log("Tekst drugi: " + this.row);
    this.formGroup = this.formBuilder.group({
      'id': [this.row?.id],
      'imie': [this.row?.imie, Validators.required],
      'nazwisko': [this.row?.nazwisko, Validators.required],
    });
  }

  onSubmit() {
    console.log(this.formGroup.value);
    const href = `${GlobalConstants.restURL}/czytelnik`;
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
    this.router.navigateByUrl("czytelniktable");
  }
}
