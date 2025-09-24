import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  newUser = { name: '', email: '', role: '' };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  addUser(): void {
    if (this.newUser.name && this.newUser.email && this.newUser.role) {
      this.userService.addUser(this.newUser);
      this.newUser = { name: '', email: '', role: '' };
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
  }
}
