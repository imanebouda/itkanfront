import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckListService {
  private apiUrl = `${environment.API_BASE_URL_GENERAL}ChecklistAudit`;
  private typeChecklistUrl = `${environment.API_BASE_URL_GENERAL}TypeCheckListAudit`;

  constructor(private http: HttpClient) {}

  getCheckListList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  addCheckList(newCheckList: any): Observable<any> {
    const typeCheckListAuditId = newCheckList.typechecklist_id ? newCheckList.typechecklist_id : null;
    const typeCheckListAuditType = newCheckList.typeCheckListAudit ? newCheckList.typeCheckListAudit.type : null;

    // Créer un objet avec les données mises à jour, y compris typeCheckListAudit
    const addData = {
      name: newCheckList.name,
      niveau: newCheckList.niveau,
      code: newCheckList.code,
      description: newCheckList.description,
      typechecklist_id: typeCheckListAuditId,
      typeCheckListAudit: { // Ajouter les données du typeCheckListAudit
        id: typeCheckListAuditId,
        type: "string"
      }
    };

    // Envoyer la requête PUT avec les données mises à jour
    return this.http.post<any>(`${this.apiUrl}`, addData, this.httpOptions).pipe(
      catchError(this.handleError)
    );
    //-------------------
    /*return this.http.post<any>(this.apiUrl, newCheckList, this.httpOptions).pipe(
      catchError(this.handleError)
    );*/
  }

  deleteCheckList(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  editCheckList(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateCheckList(id: number, updatedCheckList: any): Observable<any> {
    // Extraire l'ID et le type du typeCheckListAudit du formulaire mis à jour
    const typeCheckListAuditId = updatedCheckList.typechecklist_id ? updatedCheckList.typechecklist_id : null;
    const typeCheckListAuditType = updatedCheckList.typeCheckListAudit ? updatedCheckList.typeCheckListAudit.type : null;

    // Créer un objet avec les données mises à jour, y compris typeCheckListAudit
    const updatedData = {
      id: updatedCheckList.id,
      name: updatedCheckList.name,
      niveau: updatedCheckList.niveau,
      code: updatedCheckList.code,
      description: updatedCheckList.description,
      typechecklist_id: typeCheckListAuditId,
      typeCheckListAudit: { // Ajouter les données du typeCheckListAudit
        id: typeCheckListAuditId,
        type: "string"
      }
    };

    // Envoyer la requête PUT avec les données mises à jour
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedData, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }



  getTypeCheckLists(): Observable<any[]> {
    return this.http.get<any[]>(this.typeChecklistUrl).pipe(
      catchError(this.handleError)
    );
  }

  searchCheckListsByType(typeChecklistId: number): Observable<any[]> {
    const params = new HttpParams().set('typeChecklistId', typeChecklistId.toString());
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  private get httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
    saveUserChoice(checkListId: number, option: string): Observable<any> {
        const data = {
            Choice: option,
            CheckListAuditId: checkListId
        };

        return this.http.post<any>('https://localhost:44305/Dropdown/userchoices', data).pipe(
            catchError(this.handleError)
        );
    }
}
