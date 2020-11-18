"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDocumentDoc = void 0;
const doc_shared_1 = require("./shared/doc.shared");
const doc_const_1 = require("./const/doc.const");
const doc_data_1 = require("../../assets/data/doc.data");
const command_1 = require("../../core/interface/command");
class AddDocumentDoc extends command_1.Command {
    constructor() {
        super();
        this.docShared = new doc_shared_1.DocShared();
    }
    addDocument() {
        this.getSection((sectionPath, type, sectionName) => {
            if (type === 'rest') {
                this.getDocumentRestQuestions(sectionPath, sectionName);
            }
            else {
                this.getDocumentFunctionalQuestions(sectionPath, sectionName);
            }
        });
    }
    getDocumentRestQuestions(sectionPath, sectionName) {
        this.inquirer.prompt([
            {
                name: 'name',
                type: 'input',
                message: 'what is the service name ?',
                validate: (answers) => answers.length > 0 && !answers.includes(' '),
            },
            {
                name: 'authorization',
                type: 'confirm',
                message: 'required authorization ?'
            }, {
                name: 'access',
                type: 'list',
                message: 'what is the service access type ?',
                choices: ['get', 'post', 'put', 'patch', 'delete']
            }, {
                name: 'description',
                type: 'input',
                message: 'please describe the function of the service',
            }
        ]).then((resp) => {
            const data = Object.assign(Object.assign(Object.assign({}, doc_data_1.documentREST), resp), { mapping: `/${sectionName}/${resp.name}` });
            this.setDocument(sectionName.toLowerCase(), sectionPath, resp.name.toLowerCase(), 'rest', data);
        });
    }
    getDocumentFunctionalQuestions(sectionPath, sectionName) {
        this.inquirer.prompt([
            {
                name: 'name',
                type: 'input',
                message: 'what is the functionality name ?',
                validate: (answers) => answers.length > 0 && !answers.includes(' '),
            },
            {
                name: 'access',
                type: 'list',
                message: 'what is the functionality access type ?',
                choices: ['public', 'private', 'protected']
            }, {
                name: 'description',
                type: 'input',
                message: 'please describe the functionality',
            }
        ]).then((resp) => {
            const data = Object.assign(Object.assign({}, doc_data_1.documentFunctional), resp);
            this.setDocument(sectionName, sectionPath, resp.name.toLowerCase(), 'functional', data);
        });
    }
    setDocument(sectionName, sectionPath, documentName, type, data) {
        const path = `${doc_const_1.BASE_DIR}/${sectionName}/${documentName}` +
            `${type === 'rest' ? '.rest' : '.functional'}.json`;
        if (this.file.exist(path)) {
            this.print.information(`{${path}}`.blue + ' already exist');
            return;
        }
        this.file.writeFile(path, JSON.stringify(data, null, 2));
        this.print.success(`${path} was ` + '{created}'.blue);
        this.updateSection(sectionPath, path);
    }
    updateSection(sectionPath, documentPath) {
        const section = JSON.parse(this.file.readFile(sectionPath));
        section.elements.push(documentPath);
        this.file.writeFile(sectionPath, JSON.stringify(section, null, 2));
        this.print.information(`${sectionPath} was ` + '{updated}'.blue);
    }
    getSection(onSelectSection) {
        const sections = [];
        const main = this.docShared.getMain();
        let showQuestions = true;
        if (!main) {
            return;
        }
        this.getDocType((docType) => {
            if (main[docType].src.length === 0) {
                this.print.error('{Urxnium Doc}'.blue + ' has no sections to document ' +
                    'run the command ' +
                    '[urxm doc add section]'.yellow +
                    ' and try again');
                return;
            }
            main[docType].src.forEach((item) => {
                const names = item.split('/');
                if (names.length > 2) {
                    sections.push(names[2].replace('.json', ''));
                }
                else {
                    this.print.warning(`{${item}}`.blue +
                        ' it is not registered as a valid section' +
                        ' remove this section and try again');
                    showQuestions = false;
                }
            });
            if (!showQuestions) {
                return;
            }
            this.inquirer.prompt([
                {
                    name: 'sectionType',
                    type: 'list',
                    message: 'in which section will you add this document ?',
                    choices: sections
                }
            ]).then((resp) => {
                onSelectSection(`${doc_const_1.BASE_DIR}/${resp.sectionType}/${resp.sectionType}.json`, docType, resp.sectionType);
            });
        });
    }
    getDocType(onSelectType) {
        if (this.docShared.getProjectType() === 'both') {
            this.inquirer.prompt([
                {
                    name: 'sectionType',
                    type: 'list',
                    message: 'please select a documentation type',
                    choices: ['REST', 'Functional']
                }
            ]).then((resp) => {
                onSelectType(resp.sectionType.toLowerCase());
            });
        }
        else {
            onSelectType(this.docShared.getProjectType());
        }
    }
}
exports.AddDocumentDoc = AddDocumentDoc;
