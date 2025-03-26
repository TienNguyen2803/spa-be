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
exports.CreateSpaInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSpaInfoDto {
}
exports.CreateSpaInfoDto = CreateSpaInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Spa Name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'http://example.com/logo.png' }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "logo_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Spa Street' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+1234567890' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'contact@spa.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Description of the spa' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SEO Title' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "seo_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SEO Description' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "seo_description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://facebook.com/spa' }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "facebook_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://instagram.com/spa' }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSpaInfoDto.prototype, "instagram_url", void 0);
//# sourceMappingURL=create-spa-info.dto.js.map