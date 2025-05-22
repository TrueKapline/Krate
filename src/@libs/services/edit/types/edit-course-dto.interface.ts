export interface EditedCourseDTO {
  name: string;
  description: string;
  projects: ProjectsDTO[] | null;
  lessons: LessonsDTO[] | null;
}

export interface ProjectsDTO {
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LessonsDTO {
  title: string;
  order: number;
}
