import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { Todo } from 'src/app/interfaces/Todo';

@Component({
  selector: 'app-form-treino',
  templateUrl: './form-treino.component.html',
  styleUrls: ['./form-treino.component.css']
})

export class FormTreinoComponent implements OnInit {
  
  todo!: FormGroup
  allTodos: Todo[] = []
  displayedColumns: string[] = ['name', 'user', 'actions'];
  table!: MatTable<any>
  constructor(private todoService: TodoService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.todo = new FormGroup({
      name: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required])

    })
    this.todoService.getAllTodo().subscribe((items) => this.allTodos = items); // Get All Todos
  }

 
  openDialog(todo: Todo | null){
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: todo === null ? {
        position: null,
        name: '',
      } : todo,
    });

    dialogRef.afterClosed().subscribe(() => {
      location.reload()
    });
  }

  deleteOneTodo(id: string){
    this.todoService.deleteTodo(id)
    .subscribe(() => {
      this.allTodos = this.allTodos.filter(p => p._id !== id)
    })
  }

  editTodo(todo: Todo){
    this.openDialog(todo);
  }
}
