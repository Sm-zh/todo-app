import { Component, OnInit, signal  } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskList } from '../task-list/task-list';
import { TaskInput } from '../task-input/task-input';


@Component({
  selector: 'app-task-manager',
  imports: [TaskList, TaskInput],
  templateUrl: './task-manager.html',
  styleUrl: './task-manager.scss'
})
export class TaskManager implements OnInit {
  tasks = signal<Task[]>([]);

  ngOnInit() {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      this.tasks.set(JSON.parse(stored));
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  addTask(title: string) {
    const newTask: Task = {
      id: this.generateId(),
      title: title,
      completed: false
    };
    console.log(this.tasks);
    this.tasks.update(tasks => [...tasks, newTask]);
    this.saveTasks();
  }

  deleteTask(id: number) {
    this.tasks.update(tasks => tasks.filter(t => t.id !== id));
    this.saveTasks();
  }

  toggleComplete(id: number) {
    this.tasks.update(tasks => tasks.map(t => {
      if (t.id === id) t.completed = !t.completed;
      return t;
    }));
    this.saveTasks();
  }

  editTask(updateIfo: [number, string]) {
   this.tasks.update(tasks => tasks.map(t => {
      if (t.id === updateIfo[0]) t.title = updateIfo[1];
      return t;
    }));
    this.saveTasks();
  }

  private generateId(): number {
    return Date.now();
  }
}
