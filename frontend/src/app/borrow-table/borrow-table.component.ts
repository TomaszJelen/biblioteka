import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { Observable, catchError, map, merge, of as observableOf, startWith, switchMap } from 'rxjs';
import { GlobalConstants } from '../global-constans';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Czytelnik } from '../czytelnik-table/czytelnik-table.component';
import { Ksiazka } from '../ksiazka-table/ksiazka-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-borrow-table',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe, MatIconModule, MatTooltipModule],
  templateUrl: './borrow-table.component.html',
  styleUrl: './borrow-table.component.css'
})
export class BorrowTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'czytelnik', 'ksiazka', 'fromDate',
    'toDate', 'returnDate', 'execute', 'edytuj'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: Borrow[] = [];
  
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _httpClient: HttpClient, private router: Router) {}

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

  editRow(row: Borrow) {
    this.router.navigateByUrl("borrowform", {state: {row: row, edit: true}});
  }

  deleteRow(row: Borrow) {
    this.exampleDatabase?.deleteBorrow(row);
    this.router.navigateByUrl("borrowtable");
  }

  finishRow(row: Borrow) {
    row.returnDate = new Date();
    this.exampleDatabase?.updateBorrow(row);
    this.router.navigateByUrl("borrowtable");
  }

  prolongRow(row: Borrow) {
    const toDate = new Date(row.toDate);
    row.toDate = new Date(toDate.setDate(toDate.getDate() + GlobalConstants.prolongTime));
    this.exampleDatabase?.updateBorrow(row);
    this.router.navigateByUrl("borrowtable");
  }
}

export interface BorrowApi {
  content: Borrow[];
  totalElements: number;
}

export interface Borrow {
  id: number;
  czytelnik: Czytelnik;
  ksiazka: Ksiazka;
  fromDate: Date;
  toDate: Date;
  returnDate: Date;
}

export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: SortDirection, page: number): Observable<BorrowApi> {
    const href = `${GlobalConstants.restURL}/wypozyczenie`;
    const requestUrl = `${href}?page=${page}&size=5&sort=${sort},${order}`;

    return this._httpClient.get<BorrowApi>(requestUrl);
  }

  deleteBorrow(borrow: Borrow) {
    const href = `${GlobalConstants.restURL}/wypozyczenie`;
    this._httpClient.delete(href, {body: borrow}).subscribe((s) => {
      console.log(s);
    });
  }

  updateBorrow(borrow: Borrow) {
    const href = `${GlobalConstants.restURL}/wypozyczenie`;
    this._httpClient.post(href, borrow).subscribe(
      (val) => {
        console.log("POST call successful value returned in body", val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }
}
