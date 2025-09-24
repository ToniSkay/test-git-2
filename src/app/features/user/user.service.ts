import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([
    { id: 1, name: 'Иван Петров', email: 'ivan@example.com', role: 'Администратор' },
    { id: 2, name: 'Мария Сидорова', email: 'maria@example.com', role: 'Пользователь' },
    { id: 3, name: 'Алексей Козлов', email: 'alex@example.com', role: 'Модератор' }
  ]);

  users$ = this.usersSubject.asObservable();

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  addUser(user: Omit<User, 'id'>): void {
    const currentUsers = this.usersSubject.value;
    const newUser: User = {
      ...user,
      id: Math.max(...currentUsers.map(u => u.id)) + 1
    };
    this.usersSubject.next([...currentUsers, newUser]);
  }

  deleteUser(id: number): void {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next(currentUsers.filter(user => user.id !== id));
  }
}
