import { IsString, IsInt, Min, MaxLength, IsOptional } from 'class-validator';

export class DonationDto {
  @IsString()
  @MaxLength(500)
  description: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  amountGoal?: number;
}
