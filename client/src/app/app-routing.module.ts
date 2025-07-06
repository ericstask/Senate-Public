import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProjectsComponent} from "./projects/projects.component";
import {ProjectListComponent} from "./projects/project-list/project-list.component";
import {AddProjectComponent} from "./projects/add-project/add-project.component";
import {ProjectDetailComponent} from "./projects/project-detail/project-detail.component";
import {SectionDetailComponent} from "./projects/project-detail/section-detail/section-detail.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/development', pathMatch: 'full' },
  { path: 'development', component: ProjectsComponent, children: [
      { path: '', component: ProjectListComponent, pathMatch: 'full' },
      { path: 'list-projects', component: ProjectListComponent },
      { path: 'add-project', component: AddProjectComponent },
      { path: 'section-detail/:sectionid', component: SectionDetailComponent },
      { path: 'project-detail/:id', component: ProjectDetailComponent },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
