"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
class CreateUserDto {
    firstName;
    lastName;
    height;
    weight;
    gender;
    address;
    photo;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Имя обязательно' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Фамилия обязательна' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: 'Рост должен быть положительным числом' }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "height", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: 'Вес должен быть положительным числом' }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['male', 'female', 'other'], { message: 'Пол должен быть male, female или other' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Адрес обязателен' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsUrl)({}, { message: 'Неверный формат URL для фото' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "photo", void 0);
//# sourceMappingURL=create-user.dto.js.map