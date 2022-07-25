import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';
import { UserDialogComponent } from 'src/app/shared/user-dialog/user-dialog.component';


@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})

export class UserDashComponent implements OnInit {

  allUsers: IUser[] = [];
  displayedColumns: string[] = ['Nome', 'CPF', 'Endereço', 'Telefone', 'Actions'];
  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((item) => this.allUsers = item);
   }

  openDialog(){
    this.dialog.open(UserDialogComponent, {
      width: '250px',
    })
  }

}
