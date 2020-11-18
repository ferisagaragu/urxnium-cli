"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transcompiler = void 0;
const file_1 = require("../io/file");
const typescript_1 = __importStar(require("typescript"));
const path_1 = __importDefault(require("path"));
const print_1 = require("../log/print");
const chokidar_1 = __importDefault(require("chokidar"));
class Transcompiler {
    constructor() {
        this.file = new file_1.File();
        this.print = new print_1.Print();
    }
    compile(base, out) {
        const listFiles = this.file.readFiles(base);
        let error = false;
        this.file.clearFolder(out);
        console.log(`Out folder was cleaned`.gray);
        listFiles.forEach(file => {
            try {
                this.transform(file, base, out);
            }
            catch (e) {
                error = true;
            }
        });
        if (error) {
            console.log('Not compiled'.red);
        }
        else {
            console.log('Compiled successfully'.green);
        }
    }
    compileWatch(base, out) {
        const files = this.file.readFiles(base);
        let i = 1;
        let showMessage = false;
        chokidar_1.default.watch(base).on('change', (path) => {
            try {
                this.transform(path, base, out);
                console.log('Compiled successfully'.green);
                console.log(`Watch for changes in { ${base} }...`.gray);
            }
            catch (e) {
                console.log('Not compiled'.red);
            }
        }).on('add', (path, stats) => {
            try {
                this.transform(path, base, out);
                if (showMessage) {
                    console.log('Compiled successfully'.green);
                    console.log(`Watch for changes in { ${base} }...`.gray);
                }
            }
            catch (e) {
                console.log('Not compiled'.red);
            }
            if (i === files.length) {
                console.log('Compiled successfully'.green);
                console.log(`Watch for changes in { ${base} }...`.gray);
                showMessage = true;
            }
            i++;
        }).on('unlink', () => {
            this.compile(base, out);
            console.log(`Watch for changes in { ${base} }...`.gray);
        });
    }
    transform(source, baseDir, distDir) {
        if (source.includes('.ts')) {
            this.transformTypeScript(source.toString(), baseDir, distDir);
        }
        else {
            const data = this.file.readFile(source);
            this.file.writeFile(source.replace(baseDir, distDir), data);
            console.log('File { ' + path_1.default.basename(source).magenta.bold + ' }' + ' was copied success'.green);
        }
    }
    transformTypeScript(source, baseDir, distDir) {
        try {
            const fileData = this.file.readFile(source);
            const configTs = {
                target: typescript_1.ScriptTarget.ES2016,
                module: typescript_1.ModuleKind.CommonJS,
                lib: ['dom', 'es6'],
                jsx: typescript_1.JsxEmit.React,
                declaration: true,
                removeComments: true,
                strict: true,
                esModuleInterop: true
            };
            const file = typescript_1.default.transpile(fileData, configTs);
            this.file.writeFile(source.replace(baseDir, distDir).replace('.tsx', '.ts').replace('.ts', '.js'), file);
            console.log('File { ' + path_1.default.basename(source).yellow.bold + ' }' + ' was compiled success'.green);
            const fileType = this.transformTypeScriptD(source, configTs);
            this.file.writeFile(source.replace(baseDir, distDir).replace('.tsx', '.ts').replace('.ts', '.d.ts'), fileType);
            console.log('File { ' + path_1.default.basename(source.replace('.ts', '.d.ts')).cyan.bold + ' }' + ' was created success'.green);
        }
        catch (e) {
            this.print.error('Error to compile typescript');
            throw e;
        }
    }
    transformTypeScriptD(filePath, options) {
        const fileNames = [filePath];
        const createdFiles = {};
        const host = typescript_1.default.createCompilerHost(options);
        host.writeFile = (fileName, contents) => createdFiles[path_1.default.basename(fileName)] = contents;
        const program = typescript_1.default.createProgram(fileNames, options, host);
        program.emit();
        return createdFiles[path_1.default.basename(filePath.replace('.ts', '.d.ts'))];
    }
}
exports.Transcompiler = Transcompiler;
