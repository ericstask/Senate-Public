import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProjectListService} from "../project-list.service";

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.css']
})
export class ProjectListItemComponent {
  @Input() projectTitle!: string;
  @Input() projectDescription!: string;
  @Input() projectID!: string;
  @Input() createdDate!: Date;

  constructor(private http: HttpClient,
              private projectListService: ProjectListService) { }

  deleteProject() {
    this.http.delete('http://localhost:8080/api/v1/development/' + this.projectID)
      .subscribe(responseData => {
        this.projectListService.fetchProjectList();
      })
  }
}
