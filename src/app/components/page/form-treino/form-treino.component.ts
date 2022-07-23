import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-form-treino',
  templateUrl: './form-treino.component.html',
  styleUrls: ['./form-treino.component.css']
})
export class FormTreinoComponent implements OnInit {
  todo!: FormGroup
  allTodos: Todo[] = []
  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.todo = new FormGroup({
      name: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required])

    })
    this.todoService.getAllTodo().subscribe((items) => this.allTodos = items);
  }

  public async submit(){
    return this.todoService.createNewTodo(this.todo.value).subscribe();
  }

  public async deleteTodo(_id: string){
    return this.todoService.deleteTodo(_id).subscribe();
  }
}
