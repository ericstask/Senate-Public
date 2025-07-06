import {Injectable} from "@angular/core";
import {Project} from "../project.model";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {LogicalProjectStrategy} from "@angular/compiler-cli/src/ngtsc/imports";

@Injectable({ providedIn: 'root' })
export class ProjectDetailService {
  selectedProjectEmitter: Subject<Project> = new Subject<Project>();

  constructor(private http: HttpClient) { }

  // pushes new value to project Subject
  pushProject(project: Project): void {
    this.selectedProjectEmitter.next(project);
  }

  // subscribes to receive new value from Subject
  getProject(): Observable<Project> {
    return this.selectedProjectEmitter.asObservable();
  }

  fetchProject(ID: string) {
    this.http.get('http://localhost:8080/api/v1/development/' + ID)
      .subscribe((responseData: any) => {
        this.pushProject(responseData.data.data);
      })
  }
}
