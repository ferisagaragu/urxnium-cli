#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const system_1 = require("./core/system/system");
const transcompiler_1 = require("./core/interpret/transcompiler");
const path_1 = __importDefault(require("path"));
const print_1 = require("./core/log/print");
const init_doc_1 = require("./process/doc/init.doc");
const add_section_doc_1 = require("./process/doc/add-section.doc");
const add_document_doc_1 = require("./process/doc/add-document.doc");
const start_doc_1 = require("./process/doc/start.doc");
const system = new system_1.System();
const print = new print_1.Print();
if (system.getParameters().length > 0) {
    switch (system.getParameters()[0]) {
        case 'start':
            const base = (_a = system.getParameters()[1]) === null || _a === void 0 ? void 0 : _a.replace('--base=', '').replace('--out=', '');
            const out = (_b = system.getParameters()[2]) === null || _b === void 0 ? void 0 : _b.replace('--out=', '').replace('--base=', '');
            const transcompiler = new transcompiler_1.Transcompiler();
            transcompiler.compileWatch(path_1.default.resolve(base ? base : 'src'), path_1.default.resolve(out ? out : 'dist'));
            break;
        case 'doc':
            switch (system.getParameters()[1]) {
                case 'init':
                    new init_doc_1.InitDoc().init();
                    break;
                case 'start':
                    if (system.getParameters().length > 2) {
                        new start_doc_1.StartDoc().start(Number.parseInt(system.getParameters()[2]
                            .replace('--port=', '')));
                    }
                    else {
                        new start_doc_1.StartDoc().start();
                    }
                    break;
                case 'dist':
                    new start_doc_1.StartDoc().dist();
                    break;
                case 'add':
                    if (system.getParameters().length > 2) {
                        const param = system.getParameters()[2];
                        switch (param) {
                            case 'section':
                            case 's':
                                new add_section_doc_1.AddSectionDoc().addSection();
                                break;
                            case 'document':
                            case 'd':
                                new add_document_doc_1.AddDocumentDoc().addDocument();
                                break;
                            default:
                                print.error('command was not fount');
                        }
                    }
                    else {
                        print.error('command was not fount');
                    }
                    break;
                default:
                    print.error('command was not fount');
            }
            break;
    }
}
