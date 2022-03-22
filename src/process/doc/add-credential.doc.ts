import { Command } from '../../core/interface/command';
import { DocShared } from './shared/doc.shared';
import { CREDENTIALS_PATH } from './const/doc.const';
import { credentials } from '../../assets/data/doc.data';

export class AddCredentialDoc extends Command {

	private docShared: DocShared;

	constructor() {
		super();

		this.docShared = new DocShared();
	}

	addCredential(): void {
		const main = this.docShared.getMain();

		if (!main.rest) {
			this.print.error(
				'credentials can only be created in ' +
				'[REST projects]'
			);
			return;
		}

		this.getCredentialsQuestion(() => {
			main.rest.credentials = CREDENTIALS_PATH;
			this.docShared.setMain(main);
		});
	}

	private getCredentialsQuestion(onFinish: Function): void {
		this.inquirer.prompt([
			{
				name: 'name',
				type: 'input',
				message: 'what is the credential name ?',
				validate: (answers: string) => answers.length > 0
			}
		]).then((resp: any) => {
			const credentialsFile = this.getCredentials();
			let isCreatable = true;

			credentialsFile.forEach(item => {
				if (item.name === resp.name) {
					isCreatable = false;
				}
			});

			if (isCreatable) {
				credentialsFile.push({
					...credentials,
					name: resp.name
				});
				this.setCredentials(credentialsFile);
				onFinish();

				this.print.success(
					`{${resp.name}} credential was [created]`
				);
			} else {
				this.print.information(
					`{${resp.name}} credential already exist`
				);
			}
		});
	}

	private getCredentials(): Array<any> {
		if (!this.file.exist(CREDENTIALS_PATH)) {
			return [];
		}

		return JSON.parse(this.file.readFile(CREDENTIALS_PATH));
	}

	private setCredentials(data: any): void {
		this.file.writeFile(CREDENTIALS_PATH, JSON.stringify(data, null, 2));
	}

}
