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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporaryEmailRepository = void 0;
const dns_1 = __importDefault(require("dns"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class TemporaryEmailRepository {
    constructor() {
        this.temporaryEmailDomains = new Set();
        this.loadTemporaryEmailDomains();
    }
    loadTemporaryEmailDomains() {
        const filePath = path_1.default.join(__dirname, "temporaryEmailDomains.json");
        const rawData = fs_1.default.readFileSync(filePath, "utf-8");
        const domains = JSON.parse(rawData);
        domains.forEach((domain) => this.temporaryEmailDomains.add(domain));
    }
    getMxRecords(domain) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                dns_1.default.resolveMx(domain, (err, addresses) => {
                    if (err) {
                        resolve([]);
                    }
                    else {
                        resolve(addresses.map(record => record.exchange));
                    }
                });
            });
        });
    }
    isTemporaryEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const domain = email.split("@")[1];
            if (this.temporaryEmailDomains.has(domain)) {
                return true;
            }
            const mxRecords = yield this.getMxRecords(domain);
            return mxRecords.some((mx) => Array.from(this.temporaryEmailDomains).some((tempDomain) => mx.includes(tempDomain)));
        });
    }
}
exports.TemporaryEmailRepository = TemporaryEmailRepository;
