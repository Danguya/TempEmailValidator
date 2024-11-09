import { IEmailRepository } from "../interfaces/IEmailRepository";

export class ValidateEmailUseCase {
    private repository: IEmailRepository;

    constructor(repository: IEmailRepository) {
        this.repository = repository;
    }

    async execute(email: string): Promise<boolean> {
        return await this.repository.isTemporaryEmail(email);
    }
}
