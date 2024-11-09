import { IEmailRepository } from "../../core/interfaces/IEmailRepository";
import fs from "fs";
import path from "path";
export class TemporaryEmailRepository implements IEmailRepository {
    private temporaryEmailDomains: string[];

    constructor() { 
        this.temporaryEmailDomains = [];
        this.loadTemporaryEmailDomains();
    }

    private loadTemporaryEmailDomains() {
        const filePath = path.join(__dirname, "../", "temporaryEmailDomains.json");
        const rawData = fs.readFileSync(filePath, "utf-8");
        this.temporaryEmailDomains = JSON.parse(rawData);
    }

    async isTemporaryEmail(email: string): Promise<boolean> {
        const domain = email.split("@")[1];
        return this.temporaryEmailDomains.includes(domain);
    }
}
