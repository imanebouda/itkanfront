import { Injectable } from '@angular/core';
import { ConstatModel } from '../../models/constat.model';
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
export class ConstatService {
    private apiUrl = 'https://localhost:44305/api/Constat';

    constructor(private http: HttpClient) {}

    constatList() {
        return this.http.get<ConstatModel[]>(this.apiUrl);
    }

    addConstat(newConstat: ConstatModel) {
        return this.http.post<ConstatModel>(this.apiUrl, newConstat, httpOptions);
    }

    deleteConstat(constatData: any) {
        return this.http.post<any>(`${this.apiUrl}/DeleteConstat`, constatData, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(error);
    }

    editConstat(id: number) {
        return this.http.get<ConstatModel>(`${this.apiUrl}/${id}`);
    }

    updateConstat(id: number, newConstat: ConstatModel) {
        return this.http.put<any>(`${this.apiUrl}/${id}`, newConstat);
    }
}
