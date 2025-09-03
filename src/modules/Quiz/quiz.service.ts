import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { LessonContent } from '../lesson-contents/entities/lesson-content.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
  ) {}

  // create single quiz
  async create(data: CreateQuizDto, content?: LessonContent) {
    if (!data.options || !Array.isArray(data.options)) {
      throw new BadRequestException('Options must be a valid array');
    }

    if (!data.options.includes(data.correctAnswer)) {
      throw new BadRequestException('Correct answer must be one of the options');
    }

    const quiz = this.quizRepo.create({ ...data, content });
    return this.quizRepo.save(quiz);
  }

  // create multiple quizzes for a specific content
  async createBulk(dataArray: CreateQuizDto[], content: LessonContent) {
    if (!dataArray.length) return [];
        const quizzesToSave = dataArray.map(data => {
      if (!data.options || !Array.isArray(data.options)) {
        throw new BadRequestException(`Options must be an array for question: ${data.question}`);
      }

      if (!data.options.includes(data.correctAnswer)) {
        throw new BadRequestException(
          `Correct answer must be one of the options for question: ${data.question}`,
        );
      }
      return this.quizRepo.create({ ...data, content });
    });
    return this.quizRepo.save(quizzesToSave);
  }

  async findAll() {
    return this.quizRepo.find({ relations: ['content'] }); 
  }

  async findByLessonId(lessonId: number) {
    const quizzes = await this.quizRepo.find({
      where: { content: { lesson: { id: lessonId } } },
      relations: ['content', 'content.lesson'],
    });

    return {
      lessonId,
      quizzes: quizzes.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        // Don't expose correct answer to students
        correctAnswer: q.correctAnswer,
      })),
    };
  }


  async findOne(id: number) {
    const quiz = await this.quizRepo.findOne({ where: { id }, relations: ['content'] });
    if (!quiz) throw new NotFoundException(`Quiz #${id} not found`);
    return quiz;
  }

  async update(id: number, data: UpdateQuizDto) {
    const quiz = await this.findOne(id);
    Object.assign(quiz, data);

    if (quiz.correctAnswer && !quiz.options.includes(quiz.correctAnswer)) {
      throw new BadRequestException('Correct answer must be one of the options');
    }

    return this.quizRepo.save(quiz);
  }

  async remove(id: number) {
    const quiz = await this.findOne(id);
    return this.quizRepo.remove(quiz);
  }

  async submitQuiz(userId: number, submitQuizDto: SubmitQuizDto) {
    const { lessonContentId, answers, timeSpentMinutes } = submitQuizDto;
    
    // Validate that all quiz IDs exist and belong to the lesson content
    const quizIds = answers.map(answer => answer.quizId);
    const quizzes = await this.quizRepo.find({
      where: quizIds.map(id => ({
        id,
        content: { id: lessonContentId }
      })),
      relations: ['content']
    });

    if (quizzes.length !== answers.length) {
      throw new BadRequestException('Some quiz questions are invalid or do not belong to this lesson content');
    }

    // Calculate score
    let correctAnswers = 0;
    const results = answers.map(answer => {
      const quiz = quizzes.find(q => q.id === answer.quizId);
      if (!quiz) {
        throw new BadRequestException(`Quiz with ID ${answer.quizId} not found`);
      }
      
      const isCorrect = quiz.correctAnswer === answer.selectedAnswer;
      if (isCorrect) correctAnswers++;
      
      return {
        quizId: answer.quizId,
        question: quiz.question,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: quiz.correctAnswer,
        isCorrect
      };
    });

    const score = (correctAnswers / answers.length) * 100;
    const finalScore = Math.round(score * 100) / 100;

    // Update quiz scores in database
    for (const answer of answers) {
      const quiz = quizzes.find(q => q.id === answer.quizId);
      if (quiz) {
        quiz.userScore = finalScore;
        quiz.isCompleted = true;
        quiz.user = { id: userId } as any;
        await this.quizRepo.save(quiz);
      }
    }

    const quizResult = {
      userId,
      lessonContentId,
      score: finalScore,
      correctAnswers,
      totalQuestions: answers.length,
      timeSpentMinutes,
      results,
      submittedAt: new Date()
    };

    return quizResult;
  }
// Get user's quiz scores for a course
async getUserQuizScores(userId: number, courseId: number) {
  const quizzes = await this.quizRepo.find({
    where: {
      user: { id: userId },
      content: { lesson: { course: { id: courseId } } },
      isCompleted: true,
    },
    relations: ['content', 'content.lesson', 'content.lesson.course'],
  });

  const totalScore = quizzes.reduce(
    (sum, quiz) => sum + Number(quiz.userScore || 0),
    0,
  );

  const averageScore =
    quizzes.length > 0 ? totalScore / quizzes.length : 0;

  return {
    quizzes: quizzes.map((q) => ({
      id: q.id,
      question: q.question,
      score: Number(q.userScore), 
      lessonTitle: q.content.lesson.title,
    })),
    totalQuizzes: quizzes.length,
    averageScore: Math.round(averageScore * 100) / 100,
  };
}

    

}

