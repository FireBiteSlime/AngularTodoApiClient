import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MainServiceService } from './services/main-service.service';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ToDoApiClient';
  
  constructor(private svc: MainServiceService){ }
  ngOnInit() {
  }

}

  
  

