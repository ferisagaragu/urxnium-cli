"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocShared = void 0;
const doc_const_1 = require("../const/doc.const");
const file_1 = require("../../../core/io/file");
const print_1 = require("../../../core/log/print");
class DocShared {
    constructor() {
        this.file = new file_1.File();
        this.print = new print_1.Print();
    }
    getMain() {
        if (!this.file.exist(doc_const_1.MAIN_PATH)) {
            this.print.error('{Urxnium Doc}'.blue + ' is not initialized ' +
                'run the command ' +
                '[urxm doc init]'.yellow +
                ' and try again');
            return;
        }
        return JSON.parse(this.file.readFile(doc_const_1.MAIN_PATH));
    }
    setMain(data) {
        this.file.writeFile(doc_const_1.MAIN_PATH, JSON.stringify(data, null, 2));
        this.print.information(`${doc_const_1.MAIN_PATH} was ` + '{updated}'.blue);
    }
    getProjectType() {
        const main = this.getMain();
        if (main.hasOwnProperty('rest') &&
            main.hasOwnProperty('functional')) {
            return 'both';
        }
        if (main.hasOwnProperty('rest')) {
            return 'rest';
        }
        if (main.hasOwnProperty('functional')) {
            return 'functional';
        }
        return '';
    }
}
exports.DocShared = DocShared;
