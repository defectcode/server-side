import { IsString, IsOptional } from 'class-validator';

export class VideoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
