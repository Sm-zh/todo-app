import { Component, output } from '@angular/core';

@Component({
  selector: 'app-task-input',
  imports: [],
  templateUrl: './task-input.html',
  styleUrl: './task-input.scss'
})
export class TaskInput {
   taskAdded = output<string>();

  addTask(taskTitle: string) {
    if (!taskTitle.trim()) return;
    this.taskAdded.emit(taskTitle.trim());
  }
}
