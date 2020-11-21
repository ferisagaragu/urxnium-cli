import { main } from '../../assets/data/doc.data';
import { MAIN_PATH } from './const/doc.const';
import { Command } from '../../core/interface/command';

export class InitDoc extends Command {

	constructor() {
		super();
	}

	init(): void {
		this.getDocumentationType((type: string) => {
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

	private getDocumentationType(onSelect: Function): void {
		if (this.file.exist(MAIN_PATH)) {
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
		]).then((resp: any) => {
			onSelect(resp.type);
		});
	}

	private getRestQuestions(
		deleteFunctional: boolean = true,
		onFinish?: Function
	): void {
		this.inquirer.prompt([
			{
				name: 'title',
				type: 'input',
				message: 'what is the REST documentation name ?',
				validate: (answers: string) => answers.length > 0
			},{
				name: 'description',
				type: 'input',
				message: 'please describe the documentation'
			}
		]).then((resp: any) => {
			main.rest.title =  resp.title;
			main.rest.description = resp.description;

			if (deleteFunctional) {
				delete main.functional;
			}

			this.setMain(main);
			onFinish && onFinish();
		});
	}

	private getFunctionalQuestions(
		deleteRest: boolean = true
	): void {
		this.inquirer.prompt([
			{
				name: 'title',
				type: 'input',
				message: 'what is the Functional documentation name ?',
				validate: (answers: string) => answers.length > 0
			},{
				name: 'description',
				type: 'input',
				message: 'please describe the documentation'
			}
		]).then((resp: any) => {
			main.functional.title =  resp.title;
			main.functional.description = resp.description;

			if (deleteRest) {
				delete main.rest;
			}

			this.setMain(main);
		});
	}

	private getBothQuestions(): void {
		this.getRestQuestions(false, () => {
			this.getFunctionalQuestions(false);
		});
	}

	private setMain(data: any): void {
		this.file.writeFile(
			MAIN_PATH,
			JSON.stringify(data, null, 2)
		);
		this.print.success(`${MAIN_PATH} was [created]`);
	}

}
