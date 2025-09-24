import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([
    { 
      id: 1, 
      title: 'Изучить Angular', 
      description: 'Изучить основы Angular framework', 
      completed: false, 
      priority: 'high',
      createdAt: new Date('2024-01-15')
    },
    { 
      id: 2, 
      title: 'Написать тесты', 
      description: 'Написать unit тесты для компонентов', 
      completed: true, 
      priority: 'medium',
      createdAt: new Date('2024-01-14')
    },
    { 
      id: 3, 
      title: 'Оптимизировать производительность', 
      description: 'Оптимизировать загрузку приложения', 
      completed: false, 
      priority: 'low',
      createdAt: new Date('2024-01-13')
    }
  ]);

  tasks$ = this.tasksSubject.asObservable();

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): void {
    const currentTasks = this.tasksSubject.value;
    const newTask: Task = {
      ...task,
      id: Math.max(...currentTasks.map(t => t.id), 0) + 1,
      createdAt: new Date()
    };
    this.tasksSubject.next([...currentTasks, newTask]);
  }

  toggleTask(id: number): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(updatedTasks);
  }

  deleteTask(id: number): void {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next(currentTasks.filter(task => task.id !== id));
  }
}
