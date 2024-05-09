import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Observable, catchError, merge, startWith, switchMap, of as observableOf, map } from 'rxjs';
import { GlobalConstants } from '../global-constans';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-czytelnik-table',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe, MatIconModule],
  templateUrl: './czytelnik-table.component.html',
  styleUrl: './czytelnik-table.component.css',
  providers: [HttpClientModule]
})
export class CzytelnikTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'imie', 'nazwisko', 'edytuj'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: Czytelnik[] = [];

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

  editRow(row: Czytelnik) {
    this.router.navigateByUrl("czytelnikform", {state: row})
  }

  deleteRow(row: Czytelnik) {
    console.log(row);
    this.exampleDatabase?.deleteCzytelnik(row);
  }
}

export interface CzytelnikApi {
  content: Czytelnik[];
  totalElements: number;
}

export interface Czytelnik {
  id: number;
  imie: string;
  nazwisko: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: SortDirection, page: number): Observable<CzytelnikApi> {
    const href = `${GlobalConstants.restURL}/czytelnik`;
    const requestUrl = `${href}?page=${page}&size=3&sort=${sort},${order}`;

    return this._httpClient.get<CzytelnikApi>(requestUrl);
  }

  deleteCzytelnik(borrow: Czytelnik) {
    console.log("row::");
    console.log(borrow);
    const href = `${GlobalConstants.restURL}/czytelnik`;
    this._httpClient.delete(href, {body: borrow}).subscribe((s) => {
      console.log(s);
    });
  }

}
