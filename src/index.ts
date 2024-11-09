import { TemporaryEmailRepository } from "./data/repositories/TemporaryEmailRepository";
import { ValidateEmailUseCase } from "./core/usecases/ValidateEmailUseCase";

const repository = new TemporaryEmailRepository();
const useCase = new ValidateEmailUseCase(repository);

export async function validateEmail(email: string): Promise<boolean> {
    return useCase.execute(email);
}
