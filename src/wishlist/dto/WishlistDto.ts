import { IsString, IsOptional, MaxLength, IsArray, ArrayNotEmpty } from 'class-validator';

export class WishlistDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsArray() // ✅ Ensures images is an array
  @IsString({ each: true }) // ✅ Ensures each element in the array is a string
  images?: string[];
}
