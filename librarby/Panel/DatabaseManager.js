"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const dbdts_db_1 = __importDefault(require("dbdts.db"));
const parseAsync = (data) => {
    return Promise.resolve(data).then(JSON.parse);
};
const stringifyAsync = (data) => {
    return Promise.resolve(data).then(JSON.stringify);
};
class DatabaseManager {
    constructor(database) {
        if (!(database instanceof dbdts_db_1.default.Database))
            throw new TypeError('Requires instanceof Database');
        this.db = database;
        this.table = this.db.createTable('panel_history').addColumns([
            {
                name: 'id',
                notNull: true,
                primary: true,
                type: 'TEXT'
            },
            {
                name: 'history',
                notNull: true,
                type: 'TEXT'
            }
        ]);
    }
    createHistory(key) {
        try {
            this.table.set({
                id: key,
                history: '[]'
            }, {
                where: {
                    column: 'id',
                    equals: key
                }
            });
        }
        catch (err) {
            return err;
        }
    }
    async saveUserHistory(data) {
        this.table.set({
            id: data.id,
            history: await stringifyAsync(data.history)
        }, {
            where: {
                column: 'id',
                equals: data.id
            }
        });
    }
    async getUserHistory(key) {
        let data = this.table.get({
            where: {
                column: 'id',
                equals: key
            }
        });
        if (!data) {
            this.createHistory(key);
            data = {
                id: key,
                history: []
            };
        }
        else {
            data.history = await parseAsync(data.history);
        }
        return data;
    }
    async newHistory(key, app_url) {
        const data = await this.getUserHistory(key);
        data.history.push(app_url);
    }
    async randomToken(size = /* 69 */ 8) {
        return await new Promise((res, rej) => {
            (0, crypto_1.randomBytes)(size, (err, buf) => {
                if (err)
                    return rej(err);
                res(buf.toString('hex'));
            });
        });
    }
}
exports.default = DatabaseManager;
