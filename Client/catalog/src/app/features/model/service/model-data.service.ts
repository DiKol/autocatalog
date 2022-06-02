import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Model } from 'src/app/core/model/model';
import { api, DataServiceError, fakeDelays } from './config';


@Injectable()
export class ModelDataService {
  constructor(private http: HttpClient) { }

  addModel(model: Model): Observable<Model> {
    model.id =parseInt("0");
    return this.http.post<Model>(`${api}/models`, model).pipe(
      delay(fakeDelays.save),
      catchError(this.handleError(model))
    );
  }

  deleteModel(id: string): Observable<Model> {
    var model: Model;
    return this.http.delete(`${api}/models/${id}`).pipe(
      delay(fakeDelays.save),
      map(() => model),
      catchError(this.handleError())
    );
  }

  getModels(): Observable<Model[]> {
    return this.http.get<Array<Model>>(`${api}/models`).pipe(
      delay(fakeDelays.select),
      catchError(this.handleError())
    );
  }

  getModelsByBrand(id:number): Observable<Model[]> {
      return this.http.get<Array<Model>>(`${api}/models/getmodelsbybrand/${id}`).pipe(
      delay(fakeDelays.select),
      catchError(this.handleError())
    );
  }

  updateModel(model: Model): Observable<Model> {
    return this.http.put<Model>(`${api}/models/${model.id}`, model).pipe(
      delay(fakeDelays.save),
      map(() => model),
      catchError(this.handleError(model))
    );
  }

  private handleError<T>(requestData?: T) {
    return (res: HttpErrorResponse) => {
      const error = new DataServiceError(res.error, requestData);
      console.error(error);
      return throwError(error);
    };
  }
}
