import { DocShared } from './shared/doc.shared';
import { BASE_DIR } from './const/doc.const';
import { documentFunctional, documentREST } from '../../assets/data/doc.data';
import { Command } from '../../core/interface/command';

export class AddDocumentDoc extends Command {

	private docShared: DocShared;

	constructor() {
		super()
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
		this.inquirer.prompt([
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
		this.inquirer.prompt([
			{
				name: 'name',
				type: 'input',
				message: 'what is the functionality name ?',
				validate: (answers: string) => answers.length > 0 && !answers.includes(' '),
			},{
				name: 'access',
				type: 'list',
				message: 'what is the functionality access type ?',
				choices: [
					'public',
					'private',
					'protected',
					'entity',
					'enum',
					'interface',
					'component',
					'shell',
					'directive',
					'service',
					'guard',
					'pipeline',
					'stylesheet',
					'module',
					'class'
				]
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
			this.print.information(`{${path}} already exist`);
			return;
		}

		this.file.writeFile(path, JSON.stringify(data, null, 2));
		this.print.success(`${path} was [created]`);
		this.updateSection(sectionPath, path);
	}

	private updateSection(sectionPath: string, documentPath: string) {
		const section = JSON.parse(this.file.readFile(sectionPath));
		section.elements.push(documentPath);
		this.file.writeFile(sectionPath, JSON.stringify(section, null, 2));
		this.print.information(`${sectionPath} was [updated]`);
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
					'{Urxnium Doc} has no sections to document ' +
					'run the command [urxm doc add section] and try again'
				);
				return;
			}

			main[docType].src.forEach((item: string) => {
				const names = item.split('/');

				if (names.length > 2) {
					sections.push(names[2].replace('.json', ''));
				} else {
					this.print.warning(
						`{${item}} it is not registered as a valid section` +
						' remove this section and try again'
					);
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
			this.inquirer.prompt([
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
