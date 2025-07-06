import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProjectsComponent } from './projects/projects.component';
import { AppRoutingModule } from "./app-routing.module";
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectListItemComponent } from './projects/project-list/project-list-item/project-list-item.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { SectionDetailComponent } from './projects/project-detail/section-detail/section-detail.component';
import { EditorModule } from "@tinymce/tinymce-angular";
import { NgxTinymceModule } from "ngx-tinymce";
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProjectsComponent,
    ProjectListComponent,
    ProjectListItemComponent,
    AddProjectComponent,
    ProjectDetailComponent,
    SectionDetailComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    EditorModule,
    NgxTinymceModule.forRoot({
      baseURL: '/assets/tinymce/',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
