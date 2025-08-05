import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  @Input() tasks: Task[] = [];
  @Output() delete = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<number>();
  @Output() edit = new EventEmitter<[number, string]>();

  @ViewChild('newTask') textarea!: ElementRef<HTMLTextAreaElement>;

  wantToEdit: boolean = false;
  taskId: number = -1;
  editTask(task: Task) {
    this.wantToEdit = !this.wantToEdit;
    this.taskId = task.id;

    setTimeout(() => {
      const element = this.textarea?.nativeElement;
      if (element) {
        element.style.height = element.scrollHeight + "px";
      }
    });
  }

  confirmEdit(task: Task, newTask: string) {
    if (!newTask) {
      alert("No Task is Provided")
      return;
    }
    this.edit.emit([task.id, newTask]);
    this.wantToEdit = !this.wantToEdit;
  }

  autoGrow(element: HTMLTextAreaElement) {
    element.style.height = element.scrollHeight + "px";
  }
}
