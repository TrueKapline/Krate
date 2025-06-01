import { Routes } from '@angular/router';
import { LoginComponent } from '../@libs/components/auth/login/login.component';
import { RegistrationComponent } from '../@libs/components/auth/registration/registration.component';
import { PageNotFoundComponent } from '../@libs/components/navigation/page-not-found/page-not-found.component';
import { ProfileComponent } from '../@libs/components/auth/profile/profile.component';
import { CoursesComponent } from './components/courses/courses.component';
import { StudyPlanComponent } from './components/study-plan/study-plan.component';
import { DefaultComponent } from './components/default/default.component';
import { EmptyLayoutComponent } from '../@libs/layouts/empty-layout/empty-layout.component';
import { MainLayoutComponent } from '../@libs/layouts/main-layout/main-layout.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from '../@libs/services/auth/model/auth.guard';
import { GuestGuard } from '../@libs/services/auth/model/guest.guard';
import { AdminGuard } from '../@libs/services/auth/model/admin.guard';
import { EditCourseComponent } from '../@libs/components/edit/edit-course/edit-course.component';
import { EditComponent } from './components/edit/edit.component';
import { EditLessonComponent } from '../@libs/components/edit/edit-lesson/edit-lesson.component';
import { EditProjectComponent } from '../@libs/components/edit/edit-project/edit-project.component';

export const routes: Routes = [
  {
    path: '',
    component: EmptyLayoutComponent,
    canActivate: [GuestGuard],
    children: [
      { path: '', component: DefaultComponent },
      {
        path: 'auth',
        component: AuthComponent,
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'registration', component: RegistrationComponent },
          { path: '', redirectTo: 'login', pathMatch: 'full' },
        ]
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'study-plan', component: StudyPlanComponent },
      {
        path: 'edit',
        component: EditComponent,
        canActivate: [AdminGuard],
        children: [
          { path: 'course/:courseName', component: EditCourseComponent },
          { path: 'course/:courseName/lesson/:lessonName', component: EditLessonComponent },
          { path: 'course/:courseName/project/:projectName', component: EditProjectComponent },
        ]
      },
      { path: '', redirectTo: 'courses', pathMatch: 'full' },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
