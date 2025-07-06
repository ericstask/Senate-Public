import {Component, ElementRef, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Project} from "../project.model";
import {ProjectDetailService} from "./project-detail.service";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  @ViewChild('projectContent', { static: false }) projectContent!: ElementRef;
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  showModal = false;

  project!: Project;

  constructor(private route: ActivatedRoute,
              private projectDetailService: ProjectDetailService) { }

  ngOnInit() {
    console.log("ngOnInit Called")

    // fetch the project for component
    this.route.params.subscribe(params => {
      this.projectDetailService.fetchProject(params['id']);
    })
    // get new project when changes are made to it
    this.projectDetailService.getProject()
      .subscribe((newProject: Project): void => {
        this.project = newProject;
        this.enrichContent();
      });
  }

  enrichContent() {
    if (this.projectContent && this.project) {
      // set the innerHTML of projectContent element with project's content
      this.projectContent.nativeElement.innerHTML = this.project.content;
      // select all headings within projectContent element
      const headings = this.projectContent.nativeElement.querySelectorAll('h1, h2, h3, h4, h5, h6');

      headings.forEach((heading: Element) => {
        // create a sectionDiv for each heading
        const sectionDiv = document.createElement('div');
        sectionDiv.classList.add('project-detail-section');

        // add button to sectionDiv
        const button = document.createElement('button');
        button.innerHTML = 'Edit';
        button.style.display = 'none';
        button.classList.add('project-detail-section-button');
        sectionDiv.appendChild(button);

        let currentElement = heading;
        let nextElement = currentElement.nextElementSibling;

        // move all elements after the heading until the next heading into the sectionDiv
        while (nextElement && !/^h\d$/i.test(nextElement.tagName)) {
          sectionDiv.appendChild(nextElement);
          nextElement = currentElement.nextElementSibling;
        }

        // insert the sectionDiv after the current heading
        currentElement.insertAdjacentElement('afterend', sectionDiv);
        sectionDiv.insertAdjacentElement('afterbegin', currentElement);

        // add mouseover event listener to sectionDiv
        sectionDiv.addEventListener('mouseover', () => {
          button.style.display = 'block';
        });

        // add mouseout event listener to sectionDiv
        sectionDiv.addEventListener('mouseout', () => {
          button.style.display = 'none';
        });
      });
    }
  }

}
