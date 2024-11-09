"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidateEmailUseCase_1 = require("../src/core/usecases/ValidateEmailUseCase");
class MockEmailRepository {
    constructor() {
        this.temporaryEmails = new Set(["tempmail.com", "10minutemail.com"]);
    }
    isTemporaryEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = email.split("@")[1];
            return this.temporaryEmails.has(domain);
        });
    }
}
describe("ValidateEmailUseCase", () => {
    it("should return true for a temporary email", () => __awaiter(void 0, void 0, void 0, function* () {
        const repository = new MockEmailRepository();
        const useCase = new ValidateEmailUseCase_1.ValidateEmailUseCase(repository);
        const result = yield useCase.execute("test@tempmail.com");
        expect(result).toBe(true);
    }));
    it("should return false for a non-temporary email", () => __awaiter(void 0, void 0, void 0, function* () {
        const repository = new MockEmailRepository();
        const useCase = new ValidateEmailUseCase_1.ValidateEmailUseCase(repository);
        const result = yield useCase.execute("test@gmail.com");
        expect(result).toBe(false);
    }));
});
