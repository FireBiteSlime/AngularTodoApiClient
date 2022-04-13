import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

//../../app.component.css
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todoForm!: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<TodosComponent>, @Inject(MAT_DIALOG_DATA) public data: {projects: Array<Project>}) { 
    
  }


  
  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.todoForm = this.fb.group({
      project_id: ['', [Validators.required]] ,
      title: ['', [Validators.required]],
      text: ['', [Validators.required]]
    });
  }

  onSubmitForm() {
    this.dialogRef.close(this.todoForm.value);
  }

  closeDialog() {
    this.dialogRef.close(this.todoForm.value);
  }

}
