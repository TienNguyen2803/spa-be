"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleSeedModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const article_entity_1 = require("../../../articles/entities/article.entity");
const article_seed_service_1 = require("./article-seed.service");
let ArticleSeedModule = exports.ArticleSeedModule = class ArticleSeedModule {
};
exports.ArticleSeedModule = ArticleSeedModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([article_entity_1.Article])],
        providers: [article_seed_service_1.ArticleSeedService],
        exports: [article_seed_service_1.ArticleSeedService],
    })
], ArticleSeedModule);
//# sourceMappingURL=article-seed.module.js.map