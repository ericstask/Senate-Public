// This service is used to allow the data in the add project form to persist if a user accidentally navigates away or
// reloads the page
import {Project} from "../project.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AddProjectService {
  constructor(private http: HttpClient) { }

  private newProject = new Project('', '', '', '');

  getProject(): Project {
    return this.newProject;
  }

  setProject(title: string, description: string, id: string, sections: any) {
    this.newProject = new Project(title, description, id, sections);
  }

  // send request to server to save new project
  saveProject() {
    // we have to remove the id field when sending the post data because we want to use the one mongoose creates
    let tempProject = { ...this.newProject };
    delete tempProject._id;

    this.http.post('http://localhost:8080/api/v1/development', tempProject)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
}
