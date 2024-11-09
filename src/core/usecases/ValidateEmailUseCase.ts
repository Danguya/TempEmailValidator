import { IEmailRepository } from "../interfaces/IEmailRepository";

export class ValidateEmailUseCase {
    constructor(private emailRepository: IEmailRepository) { }

    async execute(email: string): Promise<boolean> {
        return this.emailRepository.isTemporaryEmail(email);
    }
}
