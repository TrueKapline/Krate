import { Component, OnInit } from '@angular/core';
import { KrateCourseComponent } from '../../../@libs/components/krate-ui/krate-course/krate-course.component';
import { CourseService } from '../../../@libs/services/course/course.service';
import { GetCoursesDTO } from '../../../@libs/services/course/types/get-courses-dto.interface';

@Component({
  selector: 'app-courses',
  imports: [
    KrateCourseComponent,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  protected courses: GetCoursesDTO[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe({
      next: (response) => {
        this.courses = response;
      }
    })
  }
}
