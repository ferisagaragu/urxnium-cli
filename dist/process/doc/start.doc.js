"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartDoc = void 0;
const child_process_1 = require("child_process");
const doc_const_1 = require("./const/doc.const");
const command_1 = require("../../core/interface/command");
const path_1 = __importDefault(require("path"));
const doc_shared_1 = require("./shared/doc.shared");
class StartDoc extends command_1.Command {
    constructor() {
        super();
        this.docShared = new doc_shared_1.DocShared();
        this.add = 0;
    }
    start(port = 1000) {
        this.print.title(doc_const_1.VERSION, 'Urxnium Doc');
        this.decompressApplication(port, false);
    }
    dist() {
        this.print.title(doc_const_1.VERSION, 'Urxnium Doc');
        this.decompressApplication(0, true);
    }
    decompressApplication(port, dist) {
        this.tarzgIo.decompress(path_1.default.resolve(__dirname, '../../assets/compress/urxnium-doc.tar'), dist ? doc_const_1.DIST_DIR : doc_const_1.TEMP_FOLDER, () => {
            if (!dist) {
                this.watch(port);
                child_process_1.exec(`cd ${doc_const_1.TEMP_FOLDER} && http-server -a localhost -p ${port}`);
            }
            else {
                this.compileJson(port, dist);
            }
        });
    }
    watch(port) {
        this.file.watch(doc_const_1.BASE_DIR, () => {
            this.compileJson(port, false);
        }, () => {
            this.compileJson(port, false);
        }, () => {
            this.compileJson(port, false);
        });
        this.compileJson(port, false);
    }
    compileJson(port, dist) {
        const main = this.docShared.getMain();
        if (!main) {
            return;
        }
        if (main.rest) {
            main.rest.src = this.compileSrc(main, 'rest');
        }
        if (main.functional) {
            main.functional.src = this.compileSrc(main, 'functional');
        }
        this.setUrxdoc(main, port, dist);
    }
    setUrxdoc(data, port, dist) {
        this.file.writeFile(dist ?
            `${doc_const_1.DIST_DIR}/assets/data/doc.json`
            :
                `${doc_const_1.TEMP_FOLDER}\\assets\\data\\doc.json`, JSON.stringify(data, null, 2));
        if (!dist) {
            this.print.information(`you can see your application in: http://localhost:${port}`);
            this.print.information(`use shift + F5 your to reload explorer`);
        }
        else {
            this.print.success(`application has been compiled see the dist folder`);
        }
    }
    compileSrc(main, type) {
        const src = main[type].src ? main[type].src : [];
        const srcOut = [];
        src.forEach((section) => {
            const sectionOut = this.getJsonFile(section);
            if (sectionOut) {
                const documentation = sectionOut.elements;
                const documentationOut = [];
                documentation.forEach((document) => {
                    const documentationFileOut = this.getJsonFile(document);
                    if (documentationFileOut) {
                        documentationOut.push(documentationFileOut);
                        this.print.success(`{${document}}`.yellow +
                            ' was compiled success');
                    }
                });
                sectionOut.elements = documentationOut;
                srcOut.push(sectionOut);
                this.print.success(`{${section}}`.yellow +
                    ' was compiled success');
            }
        });
        return srcOut;
    }
    getJsonFile(path) {
        if (this.file.exist(path)) {
            return JSON.parse(this.file.readFile(path));
        }
        else {
            this.print.warning(`{${path}} `.blue +
                'does not exist remove the reference');
            return;
        }
    }
}
exports.StartDoc = StartDoc;
