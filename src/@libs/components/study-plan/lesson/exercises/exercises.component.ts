import { Component, inject, Input, OnInit } from '@angular/core';
import { Exercises } from '../../../../services/study/types/lesson-content-dto.interface';
import { ListComponent } from '../../../krate-ui/list/list.component';
import { CardComponent } from '../../../krate-ui/card/card.component';
import { KrateButtonComponent } from '../../../krate-ui/krate-button/krate-button.component';
import { StudyService } from '../../../../services/study/study.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'exercises',
  imports: [
    ListComponent,
    CardComponent,
    KrateButtonComponent
  ],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent implements OnInit {
  @Input() exercises: Exercises[] = [];
  @Input() lessonName: string = '';

  optionsLists: string[][] = [];
  correctList: (string | string[])[] = [];
  selectedAnswers: string[] = [];
  answerStatuses: ('correct' | 'wrong' | null)[] = [];

  private studyService = inject(StudyService);
  private authService = inject(AuthService);

  private email = this.authService.userEmail();

  ngOnInit() {
    this.optionsLists = this.exercises.map(ex => ex.options.map(o => o.userInput));
    this.correctList = this.exercises.map(ex => {
      const userInputArray = ex.correctAnswer.map(id => {
        const matchingOption = ex.options.find(option => option.value === id);
        return matchingOption ? matchingOption.userInput : '';
      });

      return userInputArray.length === 1 ? userInputArray[0] : userInputArray;
    });
    this.answerStatuses = this.exercises.map(() => null);
  }

  onSelect(event: any, index: number): void {
    const exerciseType = this.exercises[index].type;
    this.selectedAnswers = exerciseType === 'single' ? [event.selectedItem] : event.selectedItems;
  }

  checkAnswer(index: number): void {
    const question = this.exercises[index].question;
    const selected = this.selectedAnswers;

    this.studyService.checkAnswer(this.email!, this.lessonName, question, selected).subscribe({
      next: (response) => {
        this.answerStatuses[index] = response.result;
      }
    })
  }
}
