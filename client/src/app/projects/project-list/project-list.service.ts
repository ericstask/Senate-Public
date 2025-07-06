import {Injectable} from "@angular/core";
import {ProjectListItem} from "./project-list.model";
import {map, Observable, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ProjectListService {
  constructor(private http: HttpClient) { }

  listUpdateEmitter: Subject<ProjectListItem[]> = new Subject<ProjectListItem[]>();
  paginationEmitter: Subject<{ currentPage: number, totalPages: number }> = new Subject<{ currentPage: number, totalPages: number }>();

  pushProjectList(projects: ProjectListItem[]): void {
    this.listUpdateEmitter.next(projects);
  }
  pushPaginationData(paginationData: { currentPage: number, totalPages: number }): void {
    this.paginationEmitter.next(paginationData);
  }

  fetchProjectList(options?: {params: HttpParams}): void {
    let params: HttpParams = new HttpParams();

    if (options !== undefined) {
      params = options.params;
    }

    this.http.get('http://localhost:8080/api/v1/development', { params: params } )
      .subscribe((responseData: any) => {
        this.pushProjectList(responseData.data.projects);
        this.pushPaginationData({ currentPage: responseData.data.currentPage, totalPages: responseData.data.totalPages });

        console.log(responseData.data)
      })
  }
}
