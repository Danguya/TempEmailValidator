import { TemporaryEmailRepository } from "./data/repositories/TemporaryEmailRepository";
import { ValidateEmailUseCase } from "./core/usecases/ValidateEmailUseCase";

const apiUrl = "https://api.temporary-email-provider.com/domains";
const repository = new TemporaryEmailRepository(apiUrl);
const useCase = new ValidateEmailUseCase(repository);

export async function validateEmail(email: string): Promise<boolean> {
    await repository.fetchTemporaryDomains();
    return useCase.execute(email);
}
