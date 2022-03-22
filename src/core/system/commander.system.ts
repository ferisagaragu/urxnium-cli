import { Print } from '../log/print';
import { commandDescription } from '../../assets/data/commands.data';

export class CommanderSystem {

	private readonly help: Array<any>;
	private error: boolean;
	private print: Print;

	constructor() {
		this.help = [];
		this.error = true;
		this.print = new Print();
	}

	execute(
		regex: string,
		shortRegex?: string,
		description?: string
	) {
		this.help.push({
			regex,
			shortRegex,
			description
		});

		return new Promise((resolve) => {
			if (process.argv.length > 2) {
				const exist = this.searchCommand(
					this.getPureCommand(process.argv),
					regex,
					shortRegex
				);

				if (exist) {
					resolve();
					this.error = false;
				}
			}
		});
	}

	showHelp(): void {
		this.print.formatText(this.help).forEach(item => {
			if (!item.regex.includes('help')) {
				console.log(
					this.print.convertCommand(item.regex),
					item.shortRegex ? '' : this.getDescription(item.regex)
				);

				if (item.shortRegex) {
					console.log(
						this.print.convertCommand(item.shortRegex),
						this.getDescription(item.regex)
					);
				}
			}
		});
	}

	hasError() {
		if (this.error) {
			this.print.error(
				`{${this.getPureCommand(process.argv)}} is not a recognized command run ` +
				'command [urx help] to get a list of available commands'
			);
		}
	}

	private searchCommand(
		command: string,
		regex: string,
		shortRegex?: string
	): boolean {
		if (regex === command || shortRegex === command){
			return true;
		}

		return false;
	}

	private getPureCommand(params: Array<String>): string {
		let extract: string = '';

		params.forEach((item, index) => {
			if (index > 1) {
				extract += item.toString() + ' ';
			}
		});

		return extract.substring(0, extract.length - 1);
	}

	getDescription(key: string) {
		for (let commandDescriptionKey in commandDescription) {
			if (key.includes(commandDescriptionKey)) {
				return commandDescription[commandDescriptionKey];
			}
		}

		return '';
	}

}
