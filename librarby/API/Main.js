"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dbdts_db_1 = __importDefault(require("dbdts.db"));
class ApplicationProgrammingInterface {
    constructor() {
        this.express = (0, express_1.default)();
        this.db = new dbdts_db_1.default.Database({ sanitize: true, path: '.sql' });
        this.express.use(body_parser_1.default.urlencoded({ limit: '1mb', extended: false }));
        this.express.use(body_parser_1.default.json());
        this.oauthInfo = this.db.createTable('discord_auth_info')
            .addColumns([]);
    }
}
