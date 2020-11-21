"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSectionDoc = void 0;
const doc_const_1 = require("./const/doc.const");
const doc_data_1 = require("../../assets/data/doc.data");
const doc_shared_1 = require("./shared/doc.shared");
const command_1 = require("../../core/interface/command");
class AddSectionDoc extends command_1.Command {
    constructor() {
        super();
        this.docShared = new doc_shared_1.DocShared();
    }
    addSection() {
        if (!this.docShared.getMain()) {
            return;
        }
        this.inquirer.prompt(this.getQuestions()).then((resp) => {
            var _a;
            const name = resp.name.toString().toLowerCase();
            doc_data_1.section.name = resp.name;
            this.setSection(doc_data_1.section, name, (_a = resp.type) === null || _a === void 0 ? void 0 : _a.toLowerCase());
        });
    }
    setSection(data, name, type) {
        const outPath = `${doc_const_1.BASE_DIR}/${name}/${name}.json`;
        if (this.file.exist(outPath)) {
            this.print.information(`{${outPath}} already exist`);
            return;
        }
        this.file.writeFile(outPath, JSON.stringify(data, null, 2));
        this.print.success(`${outPath} was [created]`);
        this.updateMain(outPath, type);
    }
    updateMain(outPath, type) {
        const main = this.docShared.getMain();
        if (!type) {
            type = this.docShared.getProjectType();
        }
        if (type === 'rest') {
            main.rest.src.push(outPath);
        }
        if (type === 'functional') {
            main.functional.src.push(outPath);
        }
        this.file.writeFile(doc_const_1.MAIN_PATH, JSON.stringify(main, null, 2));
        this.print.information(`${doc_const_1.MAIN_PATH} was [updated]`);
    }
    getQuestions() {
        const out = [];
        if (this.docShared.getProjectType() === 'rest' ||
            this.docShared.getProjectType() === 'functional') {
            out.push({
                name: 'name',
                type: 'input',
                message: 'what is the section name ?',
                validate: (answers) => answers.length > 0 && !answers.includes(' '),
            });
        }
        if (this.docShared.getProjectType() === 'both') {
            out.push({
                name: 'name',
                type: 'input',
                message: 'what is the section name ?',
                validate: (answers) => answers.length > 0 && !answers.includes(' '),
            });
            out.push({
                name: 'type',
                type: 'list',
                message: 'what kind of documentation is this section ?',
                choices: ['REST', 'Functional']
            });
        }
        return out;
    }
}
exports.AddSectionDoc = AddSectionDoc;
