"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonInterpret = void 0;
const file_1 = require("../io/file");
const print_1 = require("../log/print");
const child_process_1 = require("child_process");
const chokidar_1 = __importDefault(require("chokidar"));
class JsonInterpret {
    constructor() {
        this.file = new file_1.File();
        this.print = new print_1.Print();
    }
    convert() {
        child_process_1.exec('cd C:\\.urxdoc && http-server --port=1000');
        child_process_1.exec(`cd "C:\\" && powershell Expand-Archive .urxdoc.zip`);
        chokidar_1.default.watch('.urxdoc').on('change', (path) => {
            this.file.writeFile('C:\\.urxdoc\\assets\\data\\doc.json', this.createJsonOut());
            this.print.success('was compiled success');
            this.print.information(`use shift + F5 your to reload explorer`);
        }).on('add', () => {
            this.file.writeFile('C:\\.urxdoc\\assets\\data\\doc.json', this.createJsonOut());
        }).on('unlink', () => {
            this.file.writeFile('C:\\.urxdoc\\assets\\data\\doc.json', this.createJsonOut());
            this.print.success('was compiled success');
            this.print.information(`use shift + F5 your to reload explorer`);
        });
        this.print.success('was compiled success');
        this.print.information('urxm-t doc is run on http://localhost:1000');
        this.print.information(`use shift + F5 your to reload explorer`);
    }
    createJsonOut() {
        const json = this.readJson('.urxdoc/urxm-t.doc.json');
        const srcRest = [];
        if (this.isFilePath(json === null || json === void 0 ? void 0 : json.rest.credentials)) {
            json.rest.credentials = this.readJson(json.rest.credentials);
        }
        json === null || json === void 0 ? void 0 : json.rest.src.forEach((item) => {
            if (this.isFilePath(item)) {
                const srcElement = this.readJson(item);
                srcRest.push(Object.assign(Object.assign({}, srcElement), { elements: srcElement.elements.map((doc) => {
                        if (this.isFilePath(doc)) {
                            return this.readJson(doc);
                        }
                        else {
                            return undefined;
                        }
                    }) }));
            }
        });
        json.rest.src = srcRest;
        return JSON.stringify(json, null, 2);
    }
    readJson(jsonPath) {
        try {
            return JSON.parse(this.file.readFile(jsonPath));
        }
        catch (e) {
            this.print.error('file not fount');
            this.print.information('please run command -> urxm-t doc init');
        }
        return null;
    }
    isFilePath(path) {
        try {
            this.file.readFile(path);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    startServer() {
        try {
            this.process.disconnect();
        }
        catch (e) {
            this.process = child_process_1.exec('cd C:\\.urxdoc && http-server --port=1000');
        }
    }
}
exports.JsonInterpret = JsonInterpret;
