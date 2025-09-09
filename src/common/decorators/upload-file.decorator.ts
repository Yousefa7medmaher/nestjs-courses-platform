import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter, videoFileFilter, pdfFileFilter, audioFileFilter, textFileFilter } from '../utils/file-upload.helper';

interface UploadFileOptions {
  fieldName: string;           
  destination: string;         
  fileType?: 'image' | 'video' | 'pdf' | 'audio' | 'txt'; 
}

export function UploadFile({ fieldName, destination, fileType = 'image' }: UploadFileOptions) {
  const fileFilters: Record<string, any> = {
    image: imageFileFilter,
    video: videoFileFilter,
    pdf: pdfFileFilter,
    audio: audioFileFilter,
    txt: textFileFilter,
  };

  const fileFilter = fileFilters[fileType] || imageFileFilter;
 
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: diskStorage({
          destination,
          filename: editFileName,
        }),
        fileFilter,
      }),
    ),
  );
}
