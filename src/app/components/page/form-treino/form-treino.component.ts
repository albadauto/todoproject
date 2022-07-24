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

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-form-treino',
  templateUrl: './form-treino.component.html',
  styleUrls: ['./form-treino.component.css']
})

export class FormTreinoComponent implements OnInit {
  
  todo!: FormGroup
  allTodos: Todo[] = []
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = ELEMENT_DATA;
  table!: MatTable<any>
  constructor(private todoService: TodoService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.todo = new FormGroup({
      name: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required])

    })
    this.todoService.getAllTodo().subscribe((items) => this.allTodos = items); // Get All Todos
  }

  public async submit(){
    return this.todoService.createNewTodo(this.todo.value).subscribe(); // Create a submit
  }

  

  public async deleteTodo(_id: string){
    return this.todoService.deleteTodo(_id).subscribe(); // Delete a todo by ID
  }

  openDialog(element: PeriodicElement | null){
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        position: null,
        name: '',
      } : element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.dataSource.push(result)
        this.table.renderRows()
      }
    });
  }
}
