import { File } from '../../core/io/file';
import { Print } from '../../core/log/print';
import { DocShared } from './shared/doc.shared';
import { BASE_DIR } from './const/doc.const';
import { documentFunctional, documentREST } from '../../assets/data/doc.data';

const inquirer = require('inquirer');

export class AddDocumentDoc {

	private file: File;
	private print: Print;
	private docShared: DocShared;

	constructor() {
		this.file = new File();
		this.print = new Print();
		this.docShared = new DocShared();
	}

	addDocument(): void {
		this.getSection((sectionPath: string, type: string, sectionName: string) => {
			if (type === 'rest') {
				this.getDocumentRestQuestions(sectionPath, sectionName);
			} else {
				this.getDocumentFunctionalQuestions(sectionPath, sectionName);
			}
		});
	}

	private getDocumentRestQuestions(sectionPath: string, sectionName: string): void {
		inquirer.prompt([
			{
				name: 'name',
				type: 'input',
				message: 'what is the service name ?',
				validate: (answers: string) => answers.length > 0 && !answers.includes(' '),
			},{
				name: 'authorization',
				type: 'confirm',
				message: 'required authorization ?'
			},{
				name: 'access',
				type: 'list',
				message: 'what is the service access type ?',
				choices: ['get', 'post', 'put', 'patch', 'delete']
			},{
				name: 'description',
				type: 'input',
				message: 'please describe the function of the service',
			}
		]).then((resp: any) => {
			const data = {
				...documentREST,
				...resp,
				mapping: `/${sectionName}/${resp.name}`
			}

			this.setDocument(
				sectionName.toLowerCase(),
				sectionPath,
				resp.name.toLowerCase(),
				'rest',
				data
			);
		});
	}

	private getDocumentFunctionalQuestions(sectionPath: string, sectionName: string) {
		inquirer.prompt([
			{
				name: 'name',
				type: 'input',
				message: 'what is the functionality name ?',
				validate: (answers: string) => answers.length > 0 && !answers.includes(' '),
			},{
				name: 'access',
				type: 'list',
				message: 'what is the functionality access type ?',
				choices: ['public', 'private', 'protected']
			},{
				name: 'description',
				type: 'input',
				message: 'please describe the functionality',
			}
		]).then((resp: any) => {
			const data = {
				...documentFunctional,
				...resp
			}

			this.setDocument(
				sectionName,
				sectionPath,
				resp.name.toLowerCase(),
				'functional',
				data
			);
		});
	}

	private setDocument(
		sectionName: string,
		sectionPath: string,
		documentName: string,
		type: string,
		data: any
	): void {
		const path = `${BASE_DIR}/${sectionName}/${documentName}` +
			`${type === 'rest' ? '.rest' : '.functional'}.json`;

		if(this.file.exist(path)) {
			this.print.information(`{${path}}`.blue + ' already exist');
			return;
		}

		this.file.writeFile(path, JSON.stringify(data, null, 2));
		this.print.success(`${path} was ` + '{created}'.blue);
		this.updateSection(sectionPath, path);
	}

	private updateSection(sectionPath: string, documentPath: string) {
		const section = JSON.parse(this.file.readFile(sectionPath));
		section.elements.push(documentPath);
		this.file.writeFile(sectionPath, JSON.stringify(section, null, 2));
		this.print.information(`${sectionPath} was ` + '{updated}'.blue);
	}

	private getSection(onSelectSection: Function): void {
		const sections: Array<any> = [];
		const main = this.docShared.getMain();
		let showQuestions = true;

		if (!main) {
			return;
		}

		this.getDocType((docType: string) => {
			if (main[docType].src.length === 0) {
				this.print.error(
					'{Urxnium Doc}'.blue + ' has no sections to document ' +
					'run the command ' +
					'[urxm doc add section]'.yellow +
					' and try again'
				);
				return;
			}

			main[docType].src.forEach((item: string) => {
				const names = item.split('/');

				if (names.length > 2) {
					sections.push(names[2].replace('.json', ''));
				} else {
					this.print.warning(
						`{${item}}`.blue +
						' it is not registered as a valid section' +
						' remove this section and try again'
					);
					showQuestions = false;
				}
			});

			if (!showQuestions) {
				return;
			}

			inquirer.prompt([
				{
					name: 'sectionType',
					type: 'list',
					message: 'in which section will you add this document ?',
					choices: sections
				}
			]).then((resp: any) => {
				onSelectSection(
					`${BASE_DIR}/${resp.sectionType}/${resp.sectionType}.json`,
					docType,
					resp.sectionType
				);
			});
		});
	}

	private getDocType(onSelectType: Function): void {
		if (this.docShared.getProjectType() === 'both') {
			inquirer.prompt([
				{
					name: 'sectionType',
					type: 'list',
					message: 'please select a documentation type',
					choices: ['REST', 'Functional']
				}
			]).then((resp: any) => {
				onSelectType(resp.sectionType.toLowerCase());
			});
		} else {
			onSelectType(this.docShared.getProjectType());
		}
	}

}
