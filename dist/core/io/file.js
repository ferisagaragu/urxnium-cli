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
exports.File = void 0;
const fs_1 = __importStar(require("fs"));
const fs_extra_1 = require("fs-extra");
const path_1 = __importDefault(require("path"));
const mkdirp_1 = __importDefault(require("mkdirp"));
const chokidar_1 = __importDefault(require("chokidar"));
class File {
    readFile(path) {
        return fs_1.readFileSync(path).toString();
    }
    readFiles(dir) {
        return this.readFilesRecursive(dir, []);
    }
    readFolder(dir) {
        return this.readFolderRecursive(dir, []);
    }
    writeFile(file, data) {
        try {
            mkdirp_1.default.sync(path_1.default.dirname(file));
            fs_1.writeFileSync(file, data);
        }
        catch (e) {
            console.error(e.toString());
        }
    }
    clearFolder(dir) {
        const files = this.readFiles(dir);
        const folders = this.readFolder(dir);
        files.forEach(file => {
            if ((!file.includes('package.json')) && (!file.includes('node_modules'))) {
                fs_extra_1.removeSync(file);
            }
        });
        folders.forEach(folder => {
            if ((!folder.includes('package.json')) && (!folder.includes('node_modules'))) {
                fs_extra_1.removeSync(folder);
            }
        });
    }
    exist(path) {
        return fs_1.existsSync(path);
    }
    watch(dir, onChange, onAdd, onUnLink) {
        chokidar_1.default.watch(dir).on('change', (path) => {
            onChange(path);
        }).on('add', (resp) => {
            if (!this.includesInPath(resp, dir)) {
                onAdd(resp);
            }
        }).on('unlink', (resp) => {
            onUnLink(resp);
        });
    }
    includesInPath(resp, dir) {
        let out = false;
        this.readFiles(dir).forEach(item => {
            out = out || item.includes(resp);
        });
        return out;
    }
    readFilesRecursive(dir, out) {
        const folder = fs_1.default.readdirSync(dir);
        folder.forEach(subFolder => {
            const folderPath = path_1.default.resolve(`${dir}/${subFolder}`);
            const isDirectory = fs_1.default.statSync(folderPath).isDirectory();
            if (isDirectory) {
                this.readFilesRecursive(path_1.default.resolve(folderPath), out);
            }
            else {
                out.push(folderPath);
            }
        });
        return out;
    }
    readFolderRecursive(dir, out) {
        const folder = fs_1.default.readdirSync(dir);
        folder.forEach(subFolder => {
            const folderPath = path_1.default.resolve(`${dir}/${subFolder}`);
            const isDirectory = fs_1.default.statSync(folderPath).isDirectory();
            if (isDirectory) {
                this.readFolderRecursive(path_1.default.resolve(folderPath), out);
                out.push(folderPath);
            }
        });
        return out;
    }
}
exports.File = File;
