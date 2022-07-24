import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { Todo } from 'src/app/Todo';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



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
    console.log(this.allTodos)
  }

  public async submit(){
    return this.todoService.createNewTodo(this.todo.value).subscribe(); // Create a submit
  }

  

  public async deleteTodo(_id: string){
    return this.todoService.deleteTodo(_id).subscribe(); // Delete a todo by ID
  }

  openDialog(todo: Todo | null){
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: todo === null ? {
        position: null,
        name: '',
      } : todo,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.allTodos.push(result)
        this.table.renderRows()
      }
    });
  }
}
