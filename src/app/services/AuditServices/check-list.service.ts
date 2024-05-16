import { Injectable } from '@angular/core';
import { CheckListModel } from 'src/app/models/check-list.model'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class CheckListService {
  private apiUrl = 'https://localhost:44305/api/ChecklistAudit';

  constructor(private http: HttpClient) {}

  CheckListList() {
      return this.http.get<CheckListModel[]>(this.apiUrl);
  }

  addCheckList(newCheckList: CheckListModel) {
      return this.http.post<CheckListModel>(this.apiUrl, newCheckList, httpOptions);
  }

  deleteCheckList(id: number, CheckListData: any) {
      return this.http.delete<any>(`${this.apiUrl}/${id}`, CheckListData)
          .pipe(
              catchError(this.handleError)
          );
  }

  private handleError(error: any) {
      console.error('An error occurred:', error);
      return throwError(error);
  }

  editCheckList(id: number) {
      return this.http.get<CheckListModel>(`${this.apiUrl}/${id}`);
  }

  updateCheckList(id: number, newCheckList: CheckListModel) {
      return this.http.put<any>(`${this.apiUrl}/${id}`, newCheckList);
  }}
