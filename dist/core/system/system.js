"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
const file_1 = require("../io/file");
const path_1 = __importDefault(require("path"));
class System {
    constructor() {
        this.file = new file_1.File();
    }
    getParameters() {
        const params = process.argv;
        const paramsOut = [];
        if (params.length > 2) {
            params.forEach((param, index) => {
                if (index > 1) {
                    paramsOut.push(param);
                }
            });
        }
        return paramsOut;
    }
    getProjectType() {
        try {
            const packageJSON = JSON.parse(this.file.readFile('package.json'));
            if (packageJSON.urxnium) {
                return packageJSON.urxnium;
            }
        }
        catch (e) {
            return 'default';
        }
        return 'default';
    }
    getPackageJSON() {
        const packageJSON = path_1.default.resolve(__dirname, '../../../package.json');
        const data = this.file.readFile(packageJSON);
        return JSON.parse(data);
    }
}
exports.System = System;
