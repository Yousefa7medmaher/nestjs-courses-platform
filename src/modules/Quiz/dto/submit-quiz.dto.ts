import { IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class QuizAnswerDto {
  @IsNumber()
  @IsNotEmpty()
  quizId: number;

  @IsString()
  @IsNotEmpty()
  selectedAnswer: string;
}

export class SubmitQuizDto {
  @IsNumber()
  @IsNotEmpty()
  lessonContentId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizAnswerDto)
  answers: QuizAnswerDto[];

  @IsNumber()
  @IsNotEmpty()
  timeSpentMinutes: number;
}
