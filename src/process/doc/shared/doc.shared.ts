import { MAIN_PATH } from '../const/doc.const';
import { File } from '../../../core/io/file';
import { Print } from '../../../core/log/print';

export class DocShared {

	private file: File;
	private print: Print;

	constructor() {
		this.file = new File();
		this.print = new Print();
	}

	getMain(): any {
		if (!this.file.exist(MAIN_PATH)) {
			this.print.error(
				'{Urxnium Doc}'.blue + ' is not initialized ' +
				'run the command ' +
				'[urxm doc init]'.yellow +
				' and try again'
			);
			return;
		}

		return JSON.parse(this.file.readFile(MAIN_PATH));
	}

	getProjectType(): string {
		const main= this.getMain();

		if (
			main.hasOwnProperty('rest') &&
			main.hasOwnProperty('functional')
		) {
			return 'both';
		}

		if (main.hasOwnProperty('rest')) {
			return 'rest';
		}

		if (main.hasOwnProperty('functional')) {
			return 'functional';
		}

		return '';
	}

}
