import { Routes } from '@angular/router';
import { LoginComponent } from '../@libs/components/login/login.component';
import { RegistrationComponent } from '../@libs/components/registration/registration.component';
import { PageNotFoundComponent } from '../@libs/components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CoursesComponent } from './components/courses/courses.component';
import { StudyPlanComponent } from './components/study-plan/study-plan.component';
import { DefaultComponent } from './components/default/default.component';
import { EmptyLayoutComponent } from '../@libs/layouts/empty-layout/empty-layout.component';
import { MainLayoutComponent } from '../@libs/layouts/main-layout/main-layout.component';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: EmptyLayoutComponent,
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
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'study-plan', component: StudyPlanComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
