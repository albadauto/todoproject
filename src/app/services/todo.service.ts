import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../interfaces/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = environment.APIBASEURL
  private todoURL = `${this.apiUrl}/task`
  constructor(private http: HttpClient) { }


  public createNewTodo(todo: any): Observable<Todo>{
    return this.http.post<Todo>(this.todoURL, todo);
  }

  public getAllTodo(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.todoURL)
  }

  public deleteTodo(id: string): Observable<Todo>{
    return this.http.delete<Todo>(`${this.todoURL}/${id}`);
  }

  public updateTodo(id: string, todo: any): Observable<Todo>{
    return this.http.patch<Todo>(`${this.todoURL}/${id}`, todo);
  }
}
