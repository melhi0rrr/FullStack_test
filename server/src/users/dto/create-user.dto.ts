import { 
  IsString, 
  IsInt, 
  Min, 
  IsNotEmpty, 
  IsOptional, 
  IsUrl,
  IsIn
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Имя обязательно' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Фамилия обязательна' })
  lastName: string;

  @IsInt()
  @Min(1, { message: 'Рост должен быть положительным числом' })
  height: number;

  @IsInt()
  @Min(1, { message: 'Вес должен быть положительным числом' })
  weight: number;

  @IsString()
  @IsIn(['male', 'female', 'other'], { message: 'Пол должен быть male, female или other' })
  gender: string;

  @IsString()
  @IsNotEmpty({ message: 'Адрес обязателен' })
  address: string;

  @IsUrl({}, { message: 'Неверный формат URL для фото' })
  @IsOptional()
  photo?: string;
}