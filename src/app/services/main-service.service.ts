import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { Project } from '../models/project';
import { Todo } from '../models/todo';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}) 
};

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  private REST_API_SERVER = "https://todororapi.herokuapp.com/";
  //private REST_API_SERVER = "http://127.0.0.1:3000/"


  
  constructor(private http: HttpClient) { }


  public async getProjects(){

    return new Promise((resolve, reject) => {
      this.http.get(this.REST_API_SERVER + 'projects').subscribe( data =>{
        resolve(plainToClass(Project, data));
      });
    })
      
  }
  
  public async sendTodoChecked(project_id: number, todo_id:number){

    const body = {project_id: project_id, id: todo_id};
    return new Promise((resolve, reject) => {
      this.http.patch(`${this.REST_API_SERVER}projects/${project_id}/todos/${todo_id}`, body).subscribe( data =>{
        resolve(plainToClass(Todo, data));
      });
    })
  }


  public async sendTodoAdd(data: any){
     
    return new Promise((resolve, reject) => {
      this.http.post(`${this.REST_API_SERVER}todos`, data).subscribe( data =>{
        resolve(plainToClass(Todo, data));
      });
    })
  }

  public async sendProjectAdd(data: any){
    
    return new Promise((resolve, reject) => {
      this.http.post(`${this.REST_API_SERVER}todos`, data).subscribe( data =>{
        resolve(plainToClass(Project, data));
      });
    })
  }

  
}
