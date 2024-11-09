import { IEmailRepository } from "../../core/interfaces/IEmailRepository";
import dns from "dns";
import fs from "fs";
import path from "path";

export class TemporaryEmailRepository implements IEmailRepository {
    private temporaryEmailDomains: Set<string>;

    constructor() {
        this.temporaryEmailDomains = new Set();
        this.loadTemporaryEmailDomains();
    }

    private loadTemporaryEmailDomains() {
        const filePath = path.join(__dirname,"../", "temporaryEmailDomains.json");
        const rawData = fs.readFileSync(filePath, "utf-8");
        const domains = JSON.parse(rawData) as string[];
        domains.forEach((domain) => this.temporaryEmailDomains.add(domain));
    }

    private async getMxRecords(domain: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            dns.resolveMx(domain, (err, addresses) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(addresses.map(record => record.exchange));
                }
            });
        });
    }

    async isTemporaryEmail(email: string): Promise<boolean> {
        const domain = email.split("@")[1];
        
        // Primeiro verifica se o domínio está na lista diretamente
        if (this.temporaryEmailDomains.has(domain)) {
            return true;
        }
        
        // Se não estiver, verifica os registros MX
        const mxRecords = await this.getMxRecords(domain);
        return mxRecords.some((mx) =>
            Array.from(this.temporaryEmailDomains).some((tempDomain) =>
                mx.includes(tempDomain)
            )
        );
    }
}
