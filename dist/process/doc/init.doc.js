"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitDoc = void 0;
const doc_data_1 = require("../../assets/data/doc.data");
const doc_const_1 = require("./const/doc.const");
const command_1 = require("../../core/interface/command");
class InitDoc extends command_1.Command {
    constructor() {
        super();
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
            this.print.information('{Urxnium Doc} is already init');
            return;
        }
        this.inquirer.prompt([
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
        this.inquirer.prompt([
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
        this.inquirer.prompt([
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
        this.print.success(`${doc_const_1.MAIN_PATH} was [created]`);
    }
}
exports.InitDoc = InitDoc;
