import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class ProjectServiceService {
  constructor(private http: HttpClient) {}

  getProjects() {
    
  }
}