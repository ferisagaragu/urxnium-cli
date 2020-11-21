#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_system_1 = require("./core/system/commander.system");
const init_doc_1 = require("./process/doc/init.doc");
const add_section_doc_1 = require("./process/doc/add-section.doc");
const add_document_doc_1 = require("./process/doc/add-document.doc");
const start_doc_1 = require("./process/doc/start.doc");
const add_credential_doc_1 = require("./process/doc/add-credential.doc");
const command = new commander_system_1.CommanderSystem();
command.execute('doc init').then(() => {
    new init_doc_1.InitDoc().init();
});
command.execute('doc start').then(() => {
    new start_doc_1.StartDoc().start();
});
command.execute('doc dist').then(() => {
    new start_doc_1.StartDoc().dist();
});
command.execute('doc add section', 'doc add s').then(() => {
    new add_section_doc_1.AddSectionDoc().addSection();
});
command.execute('doc add document', 'doc add d').then(() => {
    new add_document_doc_1.AddDocumentDoc().addDocument();
});
command.execute('doc add credential', 'doc add c').then(() => {
    new add_credential_doc_1.AddCredentialDoc().addCredential();
});
command.execute('help').then(() => {
    command.showHelp();
});
command.hasError();
