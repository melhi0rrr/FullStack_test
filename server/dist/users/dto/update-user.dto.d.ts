import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    firstName?: string;
    lastName?: string;
    height?: number;
    weight?: number;
    gender?: string;
    address?: string;
    photo?: string;
}
export {};
