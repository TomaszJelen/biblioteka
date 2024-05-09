import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Czytelnik } from '../czytelnik-table/czytelnik-table.component';
import { Observable, of } from 'rxjs';
import { startWith, debounceTime, switchMap} from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Borrow } from '../borrow-table/borrow-table.component';
import { Ksiazka } from '../ksiazka-table/ksiazka-table.component';
import { GlobalConstants } from '../global-constans';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-borrow-form',
  standalone: true,
  imports: [ FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatAutocompleteModule, CommonModule, MatTableModule, ScrollingModule, MatSelectModule,
    MatDatepickerModule],
  templateUrl: './borrow-form.component.html',
  styleUrl: './borrow-form.component.css',
  providers: [provideNativeDateAdapter(), {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'}],
})
export class BorrowFormComponent {
  formGroup: FormGroup;
  filteredOptionsCzytelnik: Observable<Czytelnik[]> | undefined;
  filteredOptionsKsiazka: Observable<Ksiazka[]> | undefined;
  row: Borrow;
  edit: boolean;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    this.row = history.state.row;
    this.edit = history.state.edit ?? false;
    console.log("Edit::");
    console.log(this.edit);
    this.createForm();
    this.addDate();

    this.filteredOptionsKsiazka = this.formGroup.get('ksiazka')!.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      switchMap(value => {
        if (value !== '') {
          if(typeof value === 'object') {
            // if no value is pressent, return null
            console.log(value);
            return of(null);
          }
          // lookup from backend
          return this.getDataKsiazka(value);
        } else {
          // if no value is pressent, return null
          return of(null);
        }
      }) 
    )

    this.filteredOptionsCzytelnik = this.formGroup.get('czytelnik')!.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      switchMap(value => {
        if (value !== '') {
          if(typeof value === 'object') {
            // if no value is pressent, return null
            console.log(value);
            return of(null);
          }
          // lookup from backend
          return this.getDataCzytelnik(value);
        } else {
          // if no value is pressent, return null
          return of(null);
        }
      }) 
    )

    
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'id': [this.row?.id],
      'czytelnik': [this.row?.czytelnik, [Validators.required, forbiddenNameValidator()]],
      'ksiazka': [this.row?.ksiazka, [Validators.required, forbiddenNameValidator()]],
      'fromDate': [this.row?.fromDate],
      'toDate': [this.row?.toDate],
      'returnDate': [this.row?.returnDate],
      'state': [[], []],
    });
  }

  addDate() {
    console.log("data::")
    console.log(this.formGroup.get('fromDate')?.value);
    if (this.formGroup.get('fromDate')?.value == null) {
      this.formGroup.patchValue({fromDate: new Date()})
    }
    let dataa: Date = new Date(this.formGroup.get('fromDate')?.value);
    if (this.formGroup.get('toDate')?.value == null) {
      this.formGroup.patchValue({toDate: new Date(dataa.setDate(dataa.getDate() + GlobalConstants.borrowTime))});
    }
  }

  onSubmit() {
    const newBorrow = Object.assign({}, this.formGroup.value);
    const href = `${GlobalConstants.restURL}/wypozyczenie`;
    this.httpClient.post(href, newBorrow).subscribe(
      (val) => {
        console.log("POST call successful value returned in body", val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
      this.router.navigateByUrl("borrowtable");
  }


  getDataCzytelnik(imie: String) {
    return this.httpClient.get<any>(`http://localhost:8080/restapi/czytelnik/find?q=${imie}`);
  }

  getDataKsiazka(tytul: String) {
    return this.httpClient.get<any>(`http://localhost:8080/restapi/ksiazka/find?q=${tytul}`);
  }

  getOptionTextCzytelnik(option: any) {
    if (typeof option === 'object' && option !== null && !Array.isArray(option)) {
      return option.imie + " " + option.nazwisko;
    } else {
      return option;  
    }
  }

  getOptionTextKsiazka(option: any) {
    if (typeof option === 'object' && option !== null && !Array.isArray(option)) {
      return option.nazwa;
    } else {
      return option;  
    }
  }
}

export function forbiddenNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = typeof control.value !== 'object';
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
