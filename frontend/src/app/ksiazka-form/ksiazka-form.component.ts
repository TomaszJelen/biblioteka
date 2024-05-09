import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GlobalConstants } from '../global-constans';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { Autor } from '../autor-table/autor-table.component';
import { Observable, of } from 'rxjs';
import { startWith, debounceTime, switchMap} from 'rxjs/operators';
import { MatTableModule } from '@angular/material/table';
import { Ksiazka } from '../ksiazka-table/ksiazka-table.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ksiazka-form',
  standalone: true,
  imports: [ FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
     MatAutocompleteModule, CommonModule, MatTableModule, ScrollingModule, MatSelectModule],
  templateUrl: './ksiazka-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './ksiazka-form.component.css'
})
export class KsiazkaFormComponent {

  formGroup: FormGroup;
  filteredOptions: Observable<Autor[]> | undefined;
  row: Ksiazka;

  displayedColumns: string[] = ['id', 'imie', 'nazwisko'];

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    this.row = history.state;
    this.createForm();

    this.filteredOptions = this.formGroup.get('autorzy')!.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      switchMap(value => {
        if (value !== '') {
          if(typeof value === 'object') {
            // if no value is pressent, return null
            return of(null);
          }
          // lookup from backend
          return this.getData(value);
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
      'nazwa': [this.row?.nazwa, Validators.required],
      'autorzy': [[], [Validators.required, forbiddenNameValidator()]],
      'state': [[], []],
    });
  }

  onSubmit() {
    console.log("Submit::");
    console.log(this.formGroup.value);
    const newKsiazka = Object.assign({}, this.formGroup.value);
    newKsiazka.autorzy = this.row.autorzy;
    console.log("newKsiazka::");
    console.log(newKsiazka);
    const href = `${GlobalConstants.restURL}/ksiazka`;
    this.httpClient.post(href, newKsiazka).subscribe(
      (val) => {
        console.log("POST call successful value returned in body", val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
      this.router.navigateByUrl("ksiazkatable");
  }



  getData(imie: String) {
    return this.httpClient.get<any>(`http://localhost:8080/restapi/autor/find?q=${imie}`);
  }

  getOptionText(option: any) {
    console.log(option);
    if (typeof option === 'object' && option !== null && !Array.isArray(option)) {
      return option.imie + " " + option.nazwisko;
    } else {
      return option;  
    }
  }

  selectedOption(event: { option: { value: any; }; }) {
    const selectedValue = event.option.value;
    if(this.row.autorzy === undefined) { this.row.autorzy = [] } //inicjalizacja
    this.row.autorzy?.push(selectedValue);
  }

  onUsun() {
    const selectedValue = this.formGroup.value.state;
    console.log("Usun::");
    console.log(selectedValue);
    this.row.autorzy?.splice(this.row.autorzy?.indexOf(selectedValue),1);
  }
}

export function forbiddenNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = typeof control.value !== 'object';
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}