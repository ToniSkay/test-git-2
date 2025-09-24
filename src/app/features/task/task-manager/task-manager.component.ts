import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss'
})
export class TaskManagerComponent implements OnInit {
  tasks: Task[] = [];
  newTask = { title: '', description: '', priority: 'medium' as 'low' | 'medium' | 'high' };
  filterCompleted = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    if (this.newTask.title.trim()) {
      this.taskService.addTask(this.newTask);
      this.newTask = { title: '', description: '', priority: 'medium' };
    }
  }

  toggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  get filteredTasks(): Task[] {
    if (this.filterCompleted) {
      return this.tasks.filter(task => task.completed);
    }
    return this.tasks;
  }

  get completedCount(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get totalCount(): number {
    return this.tasks.length;
  }
}
