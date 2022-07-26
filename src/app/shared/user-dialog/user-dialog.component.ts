import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  frmUser!: FormGroup
  edit!: boolean

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IUser, private userService: UserService) { }

  ngOnInit(): void {
    this.frmUser = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
      address: new FormControl(''),
      cpf: new FormControl('')
    })

    if (this.data.name !== ""){
      this.edit = true
    }else{
      this.edit = false
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }

  submit(){
    return this.userService.createNewUser(this.frmUser.value).subscribe(() => location.reload())
  }

  updateNewUser(){
    return this.userService.updateUser(this.data._id, this.data).subscribe(() => console.log("Editado"))
  }



}
