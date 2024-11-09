import { ValidateEmailUseCase } from "../src/core/usecases/ValidateEmailUseCase";
import { IEmailRepository } from "../src/core/interfaces/IEmailRepository";

class MockEmailRepository implements IEmailRepository {
    private temporaryEmails = new Set(["tempmail.com", "10minutemail.com"]);

    async isTemporaryEmail(email: string): Promise<boolean> {
        const domain = email.split("@")[1];
        return this.temporaryEmails.has(domain);
    }
}

describe("ValidateEmailUseCase", () => {
    
    it("should return true for a temporary email", async () => {
        const repository = new MockEmailRepository();
        const useCase = new ValidateEmailUseCase(repository);
        const result = await useCase.execute("test@tempmail.com");
        expect(result).toBe(true);
    });

    it("should return false for a non-temporary email", async () => {
        const repository = new MockEmailRepository();
        const useCase = new ValidateEmailUseCase(repository);
        const result = await useCase.execute("test@gmail.com");
        expect(result).toBe(false);
    });
});
