import { Component, OnInit  } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskList } from '../task-list/task-list';
import { TaskInput } from '../task-input/task-input';


@Component({
  selector: 'app-task-manager',
  imports: [TaskList, TaskInput],
  templateUrl: './task-manager.html',
  styleUrl: './task-manager.css'
})
export class TaskManager implements OnInit {
  tasks: Task[] = [];

  ngOnInit() {
    const stored = localStorage.getItem('tasks');
    this.tasks = stored ? JSON.parse(stored) : [];
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTask(title: string) {
    this.tasks.push({ id: Date.now(), title, completed: false });
    this.saveTasks();
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
  }

  toggleComplete(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    this.saveTasks();
  }

  editTask(updateIfo: [number, string]) {
    const task = this.tasks.find(t => t.id === updateIfo[0]);
    if (task) task.title = updateIfo[1];
    this.saveTasks();
  }
}
