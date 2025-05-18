export interface EditedCourseDTO {
  name: string;
  description: string;
  projects: null | {
    name: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  lessons: null | {
    title: string;
    order: number;
  };
}
