import { ValidateEmailUseCase } from "./core/usecases/ValidateEmailUseCase";
import { TemporaryEmailRepository } from "./data/repositories/TemporaryEmailRepository";

const repository = new TemporaryEmailRepository();
const useCase = new ValidateEmailUseCase(repository);

export async function validateEmail(email: string): Promise<boolean> {
    return useCase.execute(email);
}
