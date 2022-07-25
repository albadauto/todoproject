import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/interfaces/Todo';
@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent implements OnInit {

  todo!: Todo
  frmTodo!: FormGroup
  table!: MatTable<any>
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    private todoService: TodoService,
  ) {}
  
  ngOnInit(): void {
    this.frmTodo = new FormGroup({
      name: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required])
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async submit(){
    return this.todoService.createNewTodo(this.frmTodo.value).subscribe(() => {
      location.reload();
    });
  }

}
