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
exports.PageOptionsDto = exports.SortDto = exports.Order = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var Order;
(function (Order) {
    Order["ASC"] = "ASC";
    Order["DESC"] = "DESC";
})(Order || (exports.Order = Order = {}));
class SortDto {
}
exports.SortDto = SortDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Field to sort by', example: 'name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SortDto.prototype, "field", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: Order,
        description: 'Sort direction',
        example: Order.ASC
    }),
    (0, class_validator_1.IsEnum)(Order),
    __metadata("design:type", String)
], SortDto.prototype, "order", void 0);
class PageOptionsDto {
    constructor() {
        this.page = 1;
        this.offset = 0;
        this.limit = 10;
    }
}
exports.PageOptionsDto = PageOptionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Advanced search query in JSON format',
        example: '{"$and":[{"q":{"$contL":"3"}}]}'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "s", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Page number (starts from 1)',
        minimum: 1,
        default: 1,
        example: 1
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PageOptionsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of records to skip',
        minimum: 0,
        default: 0,
        example: 0
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PageOptionsDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of records per page',
        minimum: 1,
        default: 10,
        example: 10
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PageOptionsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sorting criteria',
        example: [{ field: 'name', order: 'ASC' }],
        type: [SortDto]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SortDto),
    __metadata("design:type", Array)
], PageOptionsDto.prototype, "sort", void 0);
//# sourceMappingURL=page-options.dto.js.map