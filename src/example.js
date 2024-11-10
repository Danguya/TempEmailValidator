import { isTemporaryEmail } from './index.js';

(async () => {
    const testEmail = "shkzhobzhlcnvobbut@nbmbb.com";
    const isTemp = await isTemporaryEmail(testEmail);
    console.log(`Is "${testEmail}" temporary? ${isTemp}`);
})();