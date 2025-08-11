import { Component, Input, output, ViewChild, ElementRef, input } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList {
  tasks = input<Task[]>();

  delete = output<number>();
  toggle = output<number>();
  edit = output<[number, string]>();

  isEditingId: number | null = null;

  editTask(task: Task) {
    this.isEditingId = task.id;
  }

  confirmEdit(task: Task, newTask: string) {
    if (!newTask) {
      alert("No Task is Provided");
      return;
    }
    this.edit.emit([task.id, newTask]);
    this.isEditingId = null;
  }
}
