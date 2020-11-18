"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitDoc = void 0;
const print_1 = require("../../core/log/print");
const file_1 = require("../../core/io/file");
const doc_data_1 = require("../../assets/data/doc.data");
const doc_const_1 = require("./const/doc.const");
const inquirer = require('inquirer');
class InitDoc {
    constructor() {
        this.file = new file_1.File();
        this.print = new print_1.Print();
    }
    init() {
        this.getDocumentationType((type) => {
            switch (type) {
                case 'REST':
                    this.getRestQuestions();
                    break;
                case 'Functional':
                    this.getFunctionalQuestions();
                    break;
                case 'Both':
                    this.getBothQuestions();
                    break;
            }
        });
    }
    getDocumentationType(onSelect) {
        if (this.file.exist(doc_const_1.MAIN_PATH)) {
            this.print.information('{Urxnium Doc}'.blue + ' is already init');
            return;
        }
        inquirer.prompt([
            {
                name: 'type',
                type: 'list',
                message: 'please select a documentation type',
                choices: ['REST', 'Functional', 'Both']
            }
        ]).then((resp) => {
            onSelect(resp.type);
        });
    }
    getRestQuestions(deleteFunctional = true, onFinish) {
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'what is the REST documentation name ?',
                validate: (answers) => answers.length > 0
            },
            {
                name: 'description',
                type: 'input',
                message: 'please describe the documentation'
            }
        ]).then((resp) => {
            doc_data_1.main.rest.title = resp.title;
            doc_data_1.main.rest.description = resp.description;
            if (deleteFunctional) {
                delete doc_data_1.main.functional;
            }
            this.setMain(doc_data_1.main);
            onFinish && onFinish();
        });
    }
    getFunctionalQuestions(deleteRest = true) {
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'what is the Functional documentation name ?',
                validate: (answers) => answers.length > 0
            },
            {
                name: 'description',
                type: 'input',
                message: 'please describe the documentation'
            }
        ]).then((resp) => {
            doc_data_1.main.functional.title = resp.title;
            doc_data_1.main.functional.description = resp.description;
            if (deleteRest) {
                delete doc_data_1.main.rest;
            }
            this.setMain(doc_data_1.main);
        });
    }
    getBothQuestions() {
        this.getRestQuestions(false, () => {
            this.getFunctionalQuestions(false);
        });
    }
    setMain(data) {
        this.file.writeFile(doc_const_1.MAIN_PATH, JSON.stringify(data, null, 2));
        this.print.success(`${doc_const_1.MAIN_PATH} was ` + '{created}'.blue);
    }
}
exports.InitDoc = InitDoc;
