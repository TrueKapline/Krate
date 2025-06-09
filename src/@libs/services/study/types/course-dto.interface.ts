export interface ProgressDTO {
  course?: Course;
  projects?: Project[];
  progress?: Progress;
}

interface Course {
  name: string;
  description: string;
}

interface Project {
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Progress {
  currentProject: Project;
  lessons: Lessons[];
  completedLessons: Lessons[];
}

interface Lessons {
  title: string,
  order: number,
}
