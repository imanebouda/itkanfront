import { Injectable } from '@angular/core';
import { CheckListModel } from 'src/app/models/check-list.model'; 
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  private typeChecklistUrl = 'https://localhost:44305/api/TypeCheckListAudit'; // API endpoint for types

  constructor(private http: HttpClient) {}

  CheckListList() {
      return this.http.get<CheckListModel[]>(this.apiUrl);
  }

  addCheckList(newCheckList: CheckListModel) {
      return this.http.post<CheckListModel>(this.apiUrl, newCheckList, httpOptions);
  }

  deleteCheckList(id: number) {
      return this.http.delete<any>(`${this.apiUrl}/${id}`, httpOptions)
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
      return this.http.put<any>(`${this.apiUrl}/${id}`, newCheckList, httpOptions);
  }

  getTypeCheckLists() {
      return this.http.get<any[]>(this.typeChecklistUrl);
  }

  searchCheckListsByType(typeChecklistId: number) {
      const params = new HttpParams().set('typeChecklistId', typeChecklistId.toString());
      return this.http.get<CheckListModel[]>(`${this.apiUrl}/search`, { params });
  }
}
