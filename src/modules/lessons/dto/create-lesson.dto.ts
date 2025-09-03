import { isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength, Min } from 'class-validator' ;

export class CreateLessonDto { 
    @IsNotEmpty()
    @IsString() 
    @MaxLength(155)
    title : string ;

    @IsNotEmpty()
    @IsString()
    @MaxLength(500) 
    description : string ; 

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    order: number  

    @IsOptional()
    @IsString()
    @IsUrl()
    coverImageURL : string ; 

    @IsNumber()
    @IsNotEmpty()
    courseId: number;
}
