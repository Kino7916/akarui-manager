import db from 'dbdts.db';
interface DataResolvable {
    id: string;
    history: string[];
}
export default class DatabaseManager {
    db: db.Database;
    table: db.Table;
    constructor(database: db.Database);
    createHistory(key: string): null | Error;
    saveUserHistory(data: DataResolvable): Promise<void>;
    getUserHistory(key: string): Promise<DataResolvable>;
    newHistory(key: string, app_url: string): Promise<void>;
    randomToken(size?: number): Promise<unknown>;
}
export {};
