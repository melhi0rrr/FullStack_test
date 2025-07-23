import { 
  IsInt, 
  Min, 
  IsOptional, 
  IsUrl,
  IsString,
  IsIn
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types'; // <-- Правильный импорт
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  height?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  weight?: number;

  @IsString()
  @IsIn(['male', 'female', 'other'])
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsUrl()
  @IsOptional()
  photo?: string;
}