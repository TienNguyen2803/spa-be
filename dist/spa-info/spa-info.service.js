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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaInfoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const spa_info_entity_1 = require("./entities/spa-info.entity");
let SpaInfoService = exports.SpaInfoService = class SpaInfoService {
    constructor(spaInfoRepository) {
        this.spaInfoRepository = spaInfoRepository;
    }
    async create(createSpaInfoDto) {
        const { banners, workingHours } = createSpaInfoDto, spaInfoData = __rest(createSpaInfoDto, ["banners", "workingHours"]);
        const spaInfo = this.spaInfoRepository.create(Object.assign(Object.assign({}, spaInfoData), { banners: banners === null || banners === void 0 ? void 0 : banners.map(banner => ({
                image_url: banner.image_url,
                title: banner.title,
                subtitle: banner.subtitle,
                order: banner.order,
                is_active: banner.is_active,
                type: banner.type
            })), workingHours: workingHours === null || workingHours === void 0 ? void 0 : workingHours.map(wh => ({
                day_of_week: wh.day,
                opening_time: wh.open_time,
                closing_time: wh.close_time,
                is_closed: false
            })) }));
        await this.spaInfoRepository.save(spaInfo);
        return this.spaInfoRepository.findOneOrFail({
            where: { id: spaInfo.id },
            relations: ['banners', 'workingHours']
        });
    }
    findManyWithPagination({ page, limit, offset }) {
        return this.spaInfoRepository.find({
            skip: offset,
            take: limit,
            order: {
                id: 'DESC',
            },
            relations: ['banners', 'workingHours'],
        });
    }
    standardCount() {
        return this.spaInfoRepository.count();
    }
    findOne(id) {
        return this.spaInfoRepository.findOneOrFail({
            where: { id },
            relations: ['banners', 'workingHours'],
        });
    }
    async softDelete(id) {
        await this.spaInfoRepository.softDelete(id);
    }
};
exports.SpaInfoService = SpaInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(spa_info_entity_1.SpaInfo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SpaInfoService);
//# sourceMappingURL=spa-info.service.js.map