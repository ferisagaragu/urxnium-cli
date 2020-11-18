"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const path_1 = __importDefault(require("path"));
const file_1 = require("../io/file");
require("colors");
class Print {
    constructor() {
        this.file = new file_1.File();
    }
    title(version, subTitle) {
        const logoPath = path_1.default.resolve(__dirname, '../../assets/graphic/logo.txt');
        const logo = this.file.readFile(logoPath);
        console.log(logo.magenta);
        console.log(`version ${version}`.green.bold, `[${subTitle}]`.blue.bold);
    }
    success(text) {
        console.log('✓ '.green.bold +
            text);
    }
    warning(text) {
        console.log('⚠ '.yellow.bold +
            text);
    }
    error(text) {
        console.log('✘ '.red.bold +
            text);
    }
    information(text) {
        console.log('i '.cyan.bold +
            text);
    }
}
exports.Print = Print;
