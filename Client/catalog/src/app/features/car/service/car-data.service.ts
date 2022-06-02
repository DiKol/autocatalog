import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Car } from 'src/app/core/model/car';
import { api, DataServiceError, fakeDelays } from './config';


@Injectable()
export class CarDataService {
  constructor(private http: HttpClient) { }

  addCar(car: Car): Observable<Car> {
    car.id =parseInt("0");
    return this.http.post<Car>(`${api}/cars`, car).pipe(
      delay(fakeDelays.save),
      catchError(this.handleError(car))
    );
  }

  deleteCar(id: string): Observable<Car> {
    var car: Car;
    return this.http.delete(`${api}/cars/${id}`).pipe(
      delay(fakeDelays.save),
      map(() => car),
      catchError(this.handleError())
    );
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Array<Car>>(`${api}/cars`).pipe(
      delay(fakeDelays.select),
      catchError(this.handleError())
    );
  }

  updateCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${api}/models/${car.id}`, car).pipe(
      delay(fakeDelays.save),
      map(() => car),
      catchError(this.handleError(car))
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
