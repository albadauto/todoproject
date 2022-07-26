import { Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { IUser } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';
import { UserDialogComponent } from 'src/app/shared/user-dialog/user-dialog.component';


@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})

export class UserDashComponent implements OnInit {
  @ViewChild(MatTable)
  allUsers: IUser[] = [];
  displayedColumns: string[] = ['Nome', 'CPF', 'Endereço', 'Telefone', 'Actions'];
  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((item) => this.allUsers = item);
   }

  openDialog(user: IUser | null){
    this.dialog.open(UserDialogComponent, {
      width: '250px',
      data: user === null ? {
        position: null,
        name: '',
        weight: null,
        symbol: ''
      }: user
    })
  }

  deleteUser(id: string){
    if(confirm("Tem certeza que quer deletar este registro?")){
      this.userService.deleteOneUser(id).subscribe(() => {
        this.allUsers.filter((value) => value._id !== id);
        location.reload()
    })

    }
  }

  editUser(user: IUser){
      this.openDialog(user);
  }

}
