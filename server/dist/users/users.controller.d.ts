import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(page?: number, limit?: number, search?: string): Promise<{
        data: import("./entities/user.entity").User[];
        total: number;
        totalPages: number;
        currentPage: number;
    }>;
    findOne(id: number): Promise<import("./entities/user.entity").User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
