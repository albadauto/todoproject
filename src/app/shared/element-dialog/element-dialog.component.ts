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
  isUpdated!: boolean
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    private todoService: TodoService,
  ) {}
  
  ngOnInit(): void {
    this.frmTodo = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required])
    })
    if(this.data.name !== ""){
      this.isUpdated = true;
    }else{
      this.isUpdated = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async submit(){
    return this.todoService.createNewTodo(this.frmTodo.value).subscribe(() => {
      location.reload();
    });
  }

  updateTodo(){
    return this.todoService.updateTodo(this.data._id, this.data).subscribe(() => console.log("Atualizado"))
  }

}
