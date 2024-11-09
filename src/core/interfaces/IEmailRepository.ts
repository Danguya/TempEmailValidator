export interface IEmailRepository {
    isTemporaryEmail(email: string): Promise<boolean>;
}
