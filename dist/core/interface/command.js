"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const file_1 = require("../io/file");
const print_1 = require("../log/print");
const targz_io_1 = require("../io/targz.io");
class Command {
    constructor() {
        this.file = new file_1.File();
        this.print = new print_1.Print();
        this.tarzgIo = new targz_io_1.TargzIo();
    }
}
exports.Command = Command;
