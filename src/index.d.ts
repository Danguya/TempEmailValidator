/**
 * Loads temporary email domain patterns, MX patterns, and NS patterns from a JSON file.
 * @param fileName The name of the file containing the patterns to load.
 * @returns A list of domain, MX, or NS patterns as an array of strings.
 */
declare function loadPatterns(fileName: string): string[];

/**
 * Gets the MX records for the specified domain.
 * @param domain The domain for which MX records should be resolved.
 * @returns A promise that resolves to a list of MX records for the domain.
 */
declare function getMxRecords(domain: string): Promise<string[]>;

/**
 * Gets the NS records for the specified domain.
 * @param domain The domain for which NS records should be resolved.
 * @returns A promise that resolves to a list of NS records for the domain.
 */
declare function getNsRecords(domain: string): Promise<string[]>;

/**
 * Checks if an email address belongs to a temporary provider.
 * This function uses known domains as well as MX and NS patterns.
 * @param email The email address to be checked.
 * @returns A promise that resolves to `true` if the email is temporary and `false` otherwise.
 */
export declare function isTemporaryEmail(email: string): Promise<boolean>;
