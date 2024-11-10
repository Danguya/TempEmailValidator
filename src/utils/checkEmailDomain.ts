import dns from "dns";
import fs from "fs";
import path from "path";
import { IEmailRepository } from "../core/interfaces/IEmailRepository";

export class TemporaryEmailRepository implements IEmailRepository {
    private temporaryEmailDomains: Set<string>;

    constructor() {
        this.temporaryEmailDomains = new Set();
        this.loadTemporaryEmailDomains();
    }

    private loadTemporaryEmailDomains() {
        const filePath = path.join(__dirname, "temporaryEmailDomains.json");
        const rawData = fs.readFileSync(filePath, "utf-8");
        const domains = JSON.parse(rawData) as string[];
        domains.forEach((domain) => this.temporaryEmailDomains.add(domain));
    }

    private async getMxRecords(domain: string): Promise<string[]> {
        return new Promise((resolve) => {
            dns.resolveMx(domain, (err, addresses) => {
                if (err) {
                    console.error(`Erro ao resolver MX para o domínio ${domain}:`, err.message);
                    resolve([]);
                } else if (addresses && addresses.length > 0) {
                    resolve(addresses.map((record) => record.exchange));
                } else {
                    console.warn(`Nenhum registro MX encontrado para o domínio ${domain}.`);
                    resolve([]);
                }
            });
        });
    }

    async isTemporaryEmail(email: string): Promise<boolean> {
        const domain = email.split("@")[1];
        console.log(`Verificando o domínio: ${domain}`);

        // Verifica se o domínio está na lista de domínios temporários
        if (this.temporaryEmailDomains.has(domain)) {
            return true;
        }

        // Tenta resolver os registros MX
        const mxRecords = await this.getMxRecords(domain);

        // Verifica se algum registro MX corresponde a um domínio temporário conhecido
        if (mxRecords.length > 0) {
            return mxRecords.some((mx) =>
                Array.from(this.temporaryEmailDomains).some((tempDomain) =>
                    mx.includes(tempDomain)
                )
            );
        } else {
            // Considera como temporário se não houver registros MX
            return true;
        }
    }
}
