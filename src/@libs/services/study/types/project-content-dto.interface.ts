export interface ProjectContentDTO {
  title: string;
  content: string;
  userSolution?: string;
}

export interface TestResultDTO {
  result: 'correct' | 'incorrect';
  errors?: string[];
}
