import { validateEmail } from "./index";

async function runExample() {
    const testEmails = [
        "test@tempmail.com",
        "user@10minutemail.com",
        "test@gmail.com",
        "hello@yahoo.com",
        "neporiy127@inikale.com",
        "kzrrchhjkdptagzwdd@hthlm.com",
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
