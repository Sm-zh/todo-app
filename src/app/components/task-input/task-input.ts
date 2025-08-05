import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-input',
  imports: [],
  templateUrl: './task-input.html',
  styleUrl: './task-input.css'
})
export class TaskInput {
  @Output() taskAdded = new EventEmitter<string>();

  addTask(taskTitle: string) {
    if (!taskTitle.trim()) return;
    this.taskAdded.emit(taskTitle.trim());
  }
}
