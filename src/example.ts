import { validateEmail } from "./index";

async function runExample() {
    const testEmails = [
        "test@tempmail.com",
        "user@10minutemail.com",
        "test@gmail.com",
        "hello@yahoo.com"
    ];

    for (const email of testEmails) {
        try {
            const result = await validateEmail(email);
            console.log(`Email: ${email} - Is Temporary: ${result}`);
        } catch (error) {
            console.error(`Error validating email ${email}: ${error}`);
        }
    }
}

runExample();
