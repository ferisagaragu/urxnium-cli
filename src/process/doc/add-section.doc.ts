import { BASE_DIR, MAIN_PATH } from './const/doc.const';
import { section } from '../../assets/data/doc.data';
import { DocShared } from './shared/doc.shared';
import { Command } from '../../core/interface/command';

export class AddSectionDoc extends Command {

	private docShared: DocShared;

	constructor() {
		super();
		this.docShared = new DocShared();
	}

	addSection() {
		if (!this.docShared.getMain()) {
			return;
		}

		this.inquirer.prompt(this.getQuestions()).then((resp: any) => {
			const name = resp.name.toString().toLowerCase();
			section.name = resp.name;

			this.setSection(section, name, resp.type?.toLowerCase());
		});
	}

	private setSection(
		data: any,
		name: string,
		type: string
	): void {
		const outPath = `${BASE_DIR}/${name}/${name}.json`;

		if (this.file.exist(outPath)) {
			this.print.information(`{${outPath}} already exist`);
			return;
		}

		this.file.writeFile(outPath, JSON.stringify(data, null, 2));
		this.print.success(`${outPath} was [created]`);

		this.updateMain(outPath, type);
	}

	private updateMain(outPath: string, type: string): void {
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

		this.file.writeFile(
			MAIN_PATH,
			JSON.stringify(main, null, 2)
		);
		this.print.information(`${MAIN_PATH} was [updated]`);
	}

	private getQuestions(): Array<any> {
		const out = [];

		if (
			this.docShared.getProjectType() === 'rest' ||
			this.docShared.getProjectType() === 'functional'
		) {
			out.push({
				name: 'name',
				type: 'input',
				message: 'what is the section name ?',
				validate: (answers: string) => answers.length > 0 && !answers.includes(' '),
			});
		}

		if (this.docShared.getProjectType() === 'both') {
			out.push({
				name: 'name',
				type: 'input',
				message: 'what is the section name ?',
				validate: (answers: string) => answers.length > 0 && !answers.includes(' '),
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
