/// <reference types="node" />
import express from 'express';
import http = require('http');
declare function noop(): void;
declare class Dashboard {
    express: express.Express;
    server: http.Server;
    constructor();
    listen(port?: number, cb?: typeof noop): void;
}
export default Dashboard;
