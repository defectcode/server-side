import { IsString, IsInt, Min, MaxLength } from 'class-validator';

export class RewardsDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @MaxLength(500)
  description: string;

  @IsInt()
  @Min(1)
  price: number;
}
