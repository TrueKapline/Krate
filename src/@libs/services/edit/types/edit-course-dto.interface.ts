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
  task?: string;
  test?: string;
}

export interface LessonsDTO {
  title: string;
  order: number;
}

export interface LessonContentDTO {
  title: string;
  content: string;
}

export interface ExerciseDTO {
  id: string;
  type: 'single' | 'multiple';
  question: string;
  options: OptionsDTO[];
  selectedOption?: string;
}

export interface OptionsDTO {
  value: string;
  userInput: string;
  isChecked: boolean;
}

export interface ProjectLessonsDTO {
  lessons: {
    title: string;
    order: number;
  }[],
  selectedLessons: {
    title: string;
    order: number;
  }[]
}
