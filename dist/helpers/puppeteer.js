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
exports.getPageContent = exports.PAGE_PUPPETEER_OPTS = exports.LAUNCH_PUPPETEER_OPTS = void 0;
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const random_useragent_1 = __importDefault(require("random-useragent"));
puppeteer_extra_1.default.use((0, puppeteer_extra_plugin_stealth_1.default)());
exports.LAUNCH_PUPPETEER_OPTS = {
    headless: false,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080'
    ]
};
exports.PAGE_PUPPETEER_OPTS = {
    networkIdle2Timeout: 5000,
    waitUntil: 'networkidle2',
    timeout: 3000000
};
const getPageContent = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const browser = yield puppeteer_extra_1.default.launch(exports.LAUNCH_PUPPETEER_OPTS);
        const page = yield browser.newPage();
        yield page.setUserAgent(random_useragent_1.default.getRandom());
        yield page.goto(url, { waitUntil: 'networkidle2' });
        const content = yield page.content();
        browser.close();
        return content;
    }
    catch (err) {
        throw err;
    }
});
exports.getPageContent = getPageContent;
//# sourceMappingURL=puppeteer.js.map