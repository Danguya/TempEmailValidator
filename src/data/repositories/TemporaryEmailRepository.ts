import { IEmailRepository } from "../../core/interfaces/IEmailRepository";
import axios from "axios";

export class TemporaryEmailRepository implements IEmailRepository {
    private temporaryDomains: Set<string> = new Set();

    constructor(private apiUrl: string) { }

    async fetchTemporaryDomains(): Promise<void> {
        const response = await axios.get(this.apiUrl);
        this.temporaryDomains = new Set(response.data);
    }

    async isTemporaryEmail(email: string): Promise<boolean> {
        const domain = email.split("@")[1];
        return this.temporaryDomains.has(domain);
    }
}
