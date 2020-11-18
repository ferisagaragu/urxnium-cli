"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generate = void 0;
const file_1 = require("../core/io/file");
const print_1 = require("../core/log/print");
const system_1 = require("../core/system/system");
class Generate {
    constructor() {
        this.file = new file_1.File();
        this.print = new print_1.Print();
        this.system = new system_1.System();
        this.projectType = this.system.getProjectType();
    }
    start() {
        const packageJSON = this.system.getPackageJSON();
        this.print.title(packageJSON.version, this.projectType);
    }
}
exports.Generate = Generate;
