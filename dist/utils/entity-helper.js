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
exports.EntityHelper = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
class EntityHelper extends typeorm_1.BaseEntity {
    setEntityName() {
        this.__entity = this.constructor.name;
    }
    toJSON() {
        return (0, class_transformer_1.instanceToPlain)(this);
    }
}
exports.EntityHelper = EntityHelper;
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], EntityHelper.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], EntityHelper.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamp with time zone',
        nullable: true,
        name: 'deleted_at',
    }),
    __metadata("design:type", Date)
], EntityHelper.prototype, "deleted_at", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EntityHelper.prototype, "created_by", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EntityHelper.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EntityHelper.prototype, "setEntityName", null);
//# sourceMappingURL=entity-helper.js.map