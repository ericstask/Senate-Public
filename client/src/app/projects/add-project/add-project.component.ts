import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AddProjectService} from "./add-project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private addProjectService: AddProjectService,
              private router: Router) { }

  ngOnInit() {
    const savedProjectData = this.addProjectService.getProject();

    this.projectForm = new FormGroup({
      'title': new FormControl(savedProjectData.title, Validators.required),
      'description': new FormControl(savedProjectData.description, Validators.required),
      'content': new FormControl(savedProjectData.content),
    });
  }

  submitForm() {
    const { title, description, content } = this.projectForm.value;
    console.log(this.projectForm.value)
    this.addProjectService.setProject(title, description, '', content);
    this.addProjectService.saveProject();
    this.router.navigate(['/development/list-projects'])
  }
}
