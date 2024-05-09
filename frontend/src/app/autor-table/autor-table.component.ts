import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf, catchError, map, startWith, switchMap} from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DatePipe} from '@angular/common';
import { GlobalConstants } from '../global-constans';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Ksiazka } from '../ksiazka-table/ksiazka-table.component';
import { KsiazkiPipe} from '../ksiazki.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccountService } from '../account.service';


/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-table',
  styleUrl: './autor-table.component.css',
  templateUrl: './autor-table.component.html',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe, MatIconModule, KsiazkiPipe, MatTooltipModule],
  providers: [ HttpClientModule]
})
export class AutorTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'imie', 'nazwisko', 'edytuj'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: Autor[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _httpClient: HttpClient, private router: Router, private service: AccountService) {
    if(!this.isAdmin()) {
      this.displayedColumns.splice(3,1); // usuwanie kolumny 'edytuj'
    }
  }

  isAdmin() { return this.service.authorities.includes('ROLE_ADMIN'); }

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.totalElements;
          return data.content;
        }),
      )
      .subscribe(data => (this.data = data));
  }

  editRow(row: Autor) {
    this.router.navigateByUrl("autorform", {state: row});
  }

  deleteRow(row: Autor) {
    this.exampleDatabase?.deleteAutor(row);
  }
}

export interface AutorApi {
  content: Autor[];
  totalElements: number;
}

export interface Autor {
  id: number;
  imie: string;
  nazwisko: string;
  ksiazki: Ksiazka[];
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: SortDirection, page: number): Observable<AutorApi> {
    const href = `${GlobalConstants.restURL}/autor`;
    const requestUrl = `${href}?page=${page}&size=5&sort=${sort},${order}`;

    return this._httpClient.get<AutorApi>(requestUrl);
  }

  deleteAutor(autor: Autor) {
    if (autor.ksiazki.length == 0) {
      const href = `${GlobalConstants.restURL}/autor`;
      this._httpClient.delete(href, {body: autor}).subscribe((s) => {
        console.log(s);
      });
      console.log("Wysłano");
    }
    else {
      console.log("Nie wysłano: istnieją książki");
    }
  }
}