"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const file_1 = require("../io/file");
const print_1 = require("../log/print");
const targz_io_1 = require("../io/targz.io");
const inquirer = require('inquirer');
const open = require('open');
class Command {
    constructor() {
        this.file = new file_1.File();
        this.print = new print_1.Print();
        this.tarzgIo = new targz_io_1.TargzIo();
        this.inquirer = inquirer;
    }
    openBrowser(host) {
        open(host);
    }
}
exports.Command = Command;
