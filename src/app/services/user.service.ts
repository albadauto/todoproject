import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private ApiUrl = environment.APIBASEURL
  private thisBaseUrl = `${this.ApiUrl}/user`;

  constructor(private http: HttpClient) { }

  public createNewUser(user: any): Observable<IUser>{
    return this.http.post<IUser>(this.thisBaseUrl, user);
  }
}
