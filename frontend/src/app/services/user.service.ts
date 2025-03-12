import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUser } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'http://localhost:3000/users';
  private usersList: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>(
    []
  );

  constructor(private httpClient: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.getAllUsers().subscribe((users) => {
      this.usersList.next(users);
    });
  }

  public getAllUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.baseUrl);
  }

  get getUsersList(): Observable<IUser[]> {
    return this.usersList.asObservable();
  }

  public getUserById(id: number): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.baseUrl}/${id}`);
  }

  public saveUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.baseUrl, user).pipe(
      tap(() => {
        this.loadInitialData();
      })
    );
  }

  public updateUser(idUser: number, user: IUser): Observable<IUser> {
    return this.httpClient.patch<IUser>(`${this.baseUrl}/${idUser}`, user).pipe(
      tap(() => {
        this.loadInitialData();
      })
    );
  }

  public deleteUser(id: number): Observable<IUser> {
    return this.httpClient.delete<IUser>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.loadInitialData();
      })
    );
  }
}
