import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/users.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  usuarios: IUser[] = [];
  isLoading: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsersList.subscribe((data) => {
      this.usuarios = data;
      this.isLoading = false;
    });
  }

  deteleUser(id: number): void {
    this.userService.deleteUser(id).subscribe((data) => {
      console.log(data);
      this.loadUsers();
    });
  }
}
