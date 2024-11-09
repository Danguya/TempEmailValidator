export class Email {
    constructor(public readonly value: string) { }

    isValid(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.value);
    }
}
