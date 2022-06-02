import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Brand } from 'src/app/core/model/brand';
import { api, DataServiceError, fakeDelays } from './config';


@Injectable()
export class BrandDataService {
  constructor(private http: HttpClient) { }

  addBrand(brand: Brand): Observable<Brand> {
    brand.id =parseInt("0");
    return this.http.post<Brand>(`${api}/brands`, brand).pipe(
      delay(fakeDelays.save),
      catchError(this.handleError(brand))
    );
  }

  deleteBrand(id: string): Observable<Brand> {
    var brand: Brand;
    return this.http.delete(`${api}/brands/${id}`).pipe(
      delay(fakeDelays.save),
      map(() => brand),
      catchError(this.handleError())
    );
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Array<Brand>>(`${api}/brands`).pipe(
      delay(fakeDelays.select),
      catchError(this.handleError())
    );
  }

  updateBrand(brand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${api}/brands/${brand.id}`, brand).pipe(
      delay(fakeDelays.save),
      map(() => brand),
      catchError(this.handleError(brand))
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
