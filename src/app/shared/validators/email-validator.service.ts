import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {
  validate(
    control: AbstractControl<any, any>
  ): Observable<ValidationErrors | null> {
    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>(
      (subscriber) => {
        console.log({ email });

        if (email === 'fernando@google.com') {
          subscriber.next({ emailTaken: true });
        } else {
          subscriber.next(null);
        }

        subscriber.complete();
        return;
      }
    ).pipe(delay(3000));

    return httpCallObservable;
  }

  /* validate(
    control: AbstractControl<any, any>
  ): Observable<ValidationErrors | null> {
    const email = control.value;

    return this.http.get<any>(`https://localhost:3000/users?q=${email}`).pipe(
    map((resp) => {
      return resp.length === 0 ? null : { emailTaken: true };
    })
  ); */

  /* validate(
    control: AbstractControl<any, any>
  ): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log({ email });

    return of({
      emailTaken: true,
    }).pipe(delay(2000));
  } */
}
