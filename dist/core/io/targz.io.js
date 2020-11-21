"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargzIo = void 0;
const print_1 = require("../log/print");
require("colors");
const decompress = require('decompress');
class TargzIo {
    constructor() {
        this.print = new print_1.Print();
    }
    decompress(file, out, onDecompress) {
        decompress(file, out).then((resp) => {
            resp.forEach((item) => {
                if (item.type === 'file') {
                    this.print.success(`${item.path} [decompressed]`);
                }
            });
            onDecompress && onDecompress();
        });
    }
}
exports.TargzIo = TargzIo;
