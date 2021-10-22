"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = require("http");
class Dashboard {
    constructor() {
        this.express = (0, express_1.default)();
        this.server = http.createServer(this.express);
        this.express.set('view engine', 'ejs');
        this.express.set('json spaces', 2);
        this.express.set('views', __dirname + '/views');
        this.express.use(express_1.default.static(__dirname + '/static'));
        this.express.get('/home', (req, res) => {
            res.status(200).render('index.ejs', { message: 'message' });
        });
        this.express.get('/', (req, res) => {
            if (req.query?.password)
                res.status(200).redirect('/sfl');
            else
                res.status(200).render('login.ejs');
        });
        this.express.get('/workspace', (req, res) => {
            res.status(200).render('workspace.ejs');
        });
        this.express.get('/sfl', (req, res) => {
            res.status(200).render('_dev-ignorethis.ejs');
        });
    }
    listen(port = 3000, cb) {
        this.server.listen(port, cb);
    }
}
exports.default = Dashboard;
