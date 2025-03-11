import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { CoursesComponent } from './courses/courses.component';
import { StudyPlanComponent } from './study-plan/study-plan.component';
import { DefaultComponent } from './default/default.component';
import { EmptyLayoutComponent } from '../@libs/layouts/empty-layout/empty-layout.component';
import { MainLayoutComponent } from '../@libs/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      { path: '', component: DefaultComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'study-plan', component: StudyPlanComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
