import { Component, Inject, OnInit } from '@angular/core';
import { PeriodicElement } from 'src/app/components/page/form-treino/form-treino.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent implements OnInit {

  element!: PeriodicElement
  frmTodo!: FormGroup
  table!: MatTable<any>
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    private todoService: TodoService
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
    this.todoService.createNewTodo(this.frmTodo.value).subscribe();
  }

}
