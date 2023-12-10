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
const fs_1 = __importDefault(require("fs"));
const cherio_1 = __importDefault(require("cherio"));
const chalk_1 = __importDefault(require("chalk"));
const puppeteer_1 = require("./helpers/puppeteer");
const convertToCSV_1 = require("./helpers/convertToCSV");
const URL_INITIAL = 'https://www.dns-shop.ru/catalog/17a8d26216404e77/vstraivaemye-xolodilniki?p=1';
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fridgeData = [];
        const pagesCount = 5;
        for (let page = 1; page <= pagesCount; page++) {
            // const URL = URL_INITIAL + page
            const URL = URL_INITIAL;
            const content = yield (0, puppeteer_1.getPageContent)(URL);
            const $ = cherio_1.default.load(content);
            $('.catalog-product').each((i, header) => {
                const title = $(header).find('.catalog-product__name').text();
                const price = $(header).find('.product-buy__price').text();
                fridgeData.push({ title, price });
            });
        }
        const csv = (0, convertToCSV_1.convertToCSV)(fridgeData);
        console.log(csv);
        fs_1.default.writeFile('result.csv', csv, err => { if (err)
            throw err; });
    }
    catch (e) {
        console.log(chalk_1.default.red('Something going wrong...'));
        console.error(e);
    }
});
main();
//# sourceMappingURL=index.js.map