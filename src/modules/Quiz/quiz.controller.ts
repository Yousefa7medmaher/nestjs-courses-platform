import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('quizzes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // Only instructors and admins can create quizzes (bulk)
  @Post('bulk/:lessonContentId')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  async createBulk(
    @Param('lessonContentId', ParseIntPipe) lessonContentId: number,
    @Body() createQuizDtoArray: CreateQuizDto[]
  ) {
    // Create a minimal LessonContent object - in a real app you'd fetch this from the database
    const content = { id: lessonContentId } as any;
    return this.quizService.createBulk(createQuizDtoArray, content);
  }

  // Only instructors and admins can create single quiz
  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  async create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  // Students, instructors, and admins can view quizzes
  @Get()
  @Roles(UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN)
  findAll() {
    return this.quizService.findAll();
  }

  // Students, instructors, and admins can view a specific quiz
  @Get(':id')
  @Roles(UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.findOne(id);
  }

  @Get('lesson/:lessonId')
  @Roles(UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN)
  async getByLessonId(@Param('lessonId', ParseIntPipe) lessonId: number) {
    return this.quizService.findByLessonId(lessonId);
  }

  // Only instructors and admins can update quizzes
  @Put(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuizDto: UpdateQuizDto
  ) {
    return this.quizService.update(id, updateQuizDto);
  }

  // Only admins can delete quizzes
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.remove(id);
  }

  // Students can submit quiz answers
  @Post('submit')
  @Roles(UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN)
  submitQuiz(@Body() submitQuizDto: SubmitQuizDto, @Req() req: any) {
    return this.quizService.submitQuiz(req.user.id, submitQuizDto);
  }

  // Get user's quiz scores for a course
  @Get('scores/course/:courseId')
  @Roles(UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN)
  getUserQuizScores(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Req() req: any
  ) {
    return this.quizService.getUserQuizScores(req.user.id, courseId);
  }


}
