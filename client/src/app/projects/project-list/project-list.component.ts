import {Component, OnInit} from '@angular/core';
import {ProjectListService} from "./project-list.service";
import {ProjectListItem} from "./project-list.model";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects!: ProjectListItem[];
  currentPage: number = 1;
  limit: number = 10;
  totalPages: number = 1;
  maxButtons: number = 14;
  pages: number[] = [];
  searchQuery: string = '';

  constructor(private projectListService: ProjectListService,
              private http: HttpClient) { }

  ngOnInit() {
    this.projectListService.listUpdateEmitter
      .subscribe((projects: ProjectListItem[]) => {
        this.projects = projects;
      });

    this.projectListService.paginationEmitter
      .subscribe((paginationData: { currentPage: number, totalPages: number }) => {
        this.totalPages = paginationData.totalPages;
        this.currentPage = paginationData.currentPage;
        this.updatePageLinks();
      });

    const options: {params: HttpParams} = {
      params: new HttpParams()
        .set('page', this.currentPage.toString())
        .set('limit', this.limit.toString())
    };

    this.projectListService.fetchProjectList(options);
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;

    const options: {params: HttpParams} = {
      params: new HttpParams()
        .set('page', this.currentPage.toString())
        .set('limit', this.limit.toString())
    };

    this.projectListService.fetchProjectList(options);
  }

  updatePageLinks () {
    // Populate the pages array with the current page and surrounding pages
    this.pages = [];
    this.pages.push(this.currentPage);
    let i = 1;
    while (this.pages.length < this.maxButtons && i < this.totalPages) {
      if (this.currentPage - i >= 1) {
        this.pages.unshift(this.currentPage - i);
      }
      if (this.currentPage + i <= this.totalPages) {
        this.pages.push(this.currentPage + i);
      }
      i++;
    }
  }

  sortList(event: Event): void {
    // logic to sort the list according to the selected option
    const value = (event.target as HTMLSelectElement)?.value;
    if (value) {
      switch (value) {
        case 'name-asc':
          this.projects.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'name-desc':
          this.projects.sort((a, b) => {
            if (a.title < b.title) {
              return 1;
            } else if (a.title > b.title) {
              return -1;
            } else {
              return 0;
            }
          });
          break;
        case 'date-asc':
          this.projects.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateA.getTime() - dateB.getTime();
          });
          break;
        case 'date-desc':
          this.projects.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          break;
      }
    }
  }

  search() {
    const options: {params: HttpParams} = {
      params: new HttpParams()
        .set('search', this.searchQuery)
    };

    this.projectListService.fetchProjectList(options);
  }

  clearSearch() {
    this.searchQuery = '';
    this.currentPage = 1;

    const options: {params: HttpParams} = {
      params: new HttpParams()
        .set('page', this.currentPage.toString())
        .set('limit', this.limit.toString())
    };

    this.projectListService.fetchProjectList(options);
  }
}
