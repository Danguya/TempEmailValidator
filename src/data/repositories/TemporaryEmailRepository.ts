import dns from "dns";
import fs from "fs";
import path from "path";
import { IEmailRepository } from "../../core/interfaces/IEmailRepository";

export class TemporaryEmailRepository implements IEmailRepository {
    private temporaryEmailDomains: Set<string>;
    private knownTemporaryMxPatterns: string[];
    private knownTemporaryNsPatterns: string[];

    constructor() {
        this.temporaryEmailDomains = new Set(this.loadPatterns("temporaryEmailDomains.json"));
        this.knownTemporaryMxPatterns = this.loadPatterns("temporaryMxPatterns.json");
        this.knownTemporaryNsPatterns = this.loadPatterns("temporaryNsPatterns.json");
    }

    private loadPatterns(fileName: string): string[] {
        const filePath = path.join(__dirname, "..", fileName);
        const rawData = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(rawData);
    }

    private async getMxRecords(domain: string): Promise<string[]> {
        return new Promise((resolve) => {
            dns.resolveMx(domain, (err, addresses) => {
                if (err) resolve([]);
                else resolve(addresses.map(record => record.exchange));
            });
        });
    }

    private async getNsRecords(domain: string): Promise<string[]> {
        return new Promise((resolve) => {
            dns.resolveNs(domain, (err, addresses) => {
                if (err) resolve([]);
                else resolve(addresses);
            });
        });
    }

    async isTemporaryEmail(email: string): Promise<boolean> {
        const domain = email.split("@")[1];

        if (this.temporaryEmailDomains.has(domain)) return true;

        const mxRecords = await this.getMxRecords(domain);
        if (mxRecords.some(mx => this.knownTemporaryMxPatterns.some(tempMx => mx.includes(tempMx)))) return true;

        const nsRecords = await this.getNsRecords(domain);
        return nsRecords.some(ns => this.knownTemporaryNsPatterns.some(tempNs => ns.includes(tempNs)));
    }
}
