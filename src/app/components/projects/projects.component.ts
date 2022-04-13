import { Component, OnInit, Output } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import { Project } from '../../models/project';
import { Todo } from '../../models/todo';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TodosComponent } from '../todos/todos.component';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../../app.component.css']
})
export class ProjectsComponent implements OnInit {
  
  projects: Project[] = new Array<Project>();
  dialogConfig: MatDialogConfig<any> =  new MatDialogConfig();


  constructor(private svc: MainServiceService, public dialog: MatDialog){ }

  ngOnInit() {
    this.getProjects();
    
  }

  async getProjects(){
    let projects = await this.svc.getProjects();
    this.projects = projects as Project[];
    this.projects.forEach(project => project.todos.sort(function(a, b) {
      return a.id - b.id;
    }));
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    dialogConfig.panelClass = 'dialog';
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = {
      projects: this.projects,
    };
    this.dialogConfig = dialogConfig;
  }

  async updateTodo(project_id: number,todo_id: number ) {
    
    let todo = await this.svc.sendTodoChecked(project_id, todo_id);
    let project_index = this.projects.findIndex(project  => project.id == project_id);
    let todo_index = this.projects[project_index].todos.findIndex(todo => todo.id == todo_id);
    this.projects[project_index].todos[todo_index] = todo as Todo;
    
  }

  public openDialog( projects: Array<Project>) {
    const dialogRef =  this.dialog.open(TodosComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(
      data =>{
        if(data.project_id > 0){
          this.addTodo(data);

        }else if(data.project_id < 0){
          this.addProject(data);
        }
      }
    );  
  }

  async addTodo(data: any) {
    let todo = await this.svc.sendTodoAdd(data);
    let project_index = this.projects.findIndex(project  => project.id == data.project_id);
    this.projects[project_index].todos.push(todo as Todo);

  }
  async addProject(data: any) {
    let project = await this.svc.sendProjectAdd(data);
    this.projects.push(project as Project);
  }

}
