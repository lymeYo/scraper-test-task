"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToCSV = void 0;
const convertToCSV = (data) => {
    if (!data)
        return '';
    const header = Object.keys(data[0]);
    const headerString = header.join(',');
    const replacer = (key, value) => value !== null && value !== void 0 ? value : '';
    const rowItems = data.map((row) => header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(','));
    const csv = [headerString, ...rowItems].join('\r\n');
    return csv;
};
exports.convertToCSV = convertToCSV;
//# sourceMappingURL=convertToCSV.js.map