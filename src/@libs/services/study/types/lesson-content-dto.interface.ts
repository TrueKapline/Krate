export interface LessonContentDTO {
  title: string;
  content: string;
  exercises: Exercises[];
}

export interface Exercises {
  question: string;
  options: Options[];
  correctAnswer: string[];
  type: 'single' | 'multiple'
  completed: boolean;
}

export interface Options {
  value: string;
  userInput: string;
}
