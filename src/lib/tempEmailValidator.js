import dns from "dns";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadPatterns = (fileName) => {
  const filePath = path.join(__dirname, "patterns", fileName);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

const temporaryEmailDomains = new Set(loadPatterns("temporaryEmailDomains.json"));
const knownTemporaryMxPatterns = loadPatterns("temporaryMxPatterns.json");
const knownTemporaryNsPatterns = loadPatterns("temporaryNsPatterns.json");

export const getMxRecords = (domain) => {
  return new Promise((resolve) => {
    dns.resolveMx(domain, (err, addresses) => {
      resolve(err ? [] : addresses.map(record => record.exchange));
    });
  });
};

export const getNsRecords = (domain) => {
  return new Promise((resolve) => {
    dns.resolveNs(domain, (err, addresses) => {
      resolve(err ? [] : addresses);
    });
  });
};

export async function isTemporaryEmail(email) {
  const domain = email.split("@")[1];

  if (temporaryEmailDomains.has(domain)) return true;

  const mxRecords = await getMxRecords(domain);
  const mxTemporary = mxRecords.some(mx => knownTemporaryMxPatterns.some(tempMx => mx.includes(tempMx)));

  const nsRecords = await getNsRecords(domain);
  const nsTemporary = nsRecords.some(ns => knownTemporaryNsPatterns.some(tempNs => ns.includes(tempNs)));

  return mxTemporary || nsTemporary;
}
