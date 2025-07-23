import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search: string = ''
  ): Promise<{ 
    data: User[]; 
    total: number; 
    totalPages: number; 
    currentPage: number 
  }> {
    const [result, total] = await this.usersRepository.findAndCount({
      where: [
        { firstName: Like(`%${search}%`) },
        { lastName: Like(`%${search}%`) },
        { address: Like(`%${search}%`) }
      ],
      order: { id: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }
    return { message: `Пользователь с ID ${id} успешно удален` };
  }
}