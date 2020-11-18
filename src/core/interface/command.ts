import { File } from '../io/file';
import { Print } from '../log/print';
import { TargzIo } from '../io/targz.io';

const inquirer = require('inquirer');
interface Inquirer {
	prompt: Function
}

const open = require('open');

export class Command {

	file: File;
	print: Print;
	tarzgIo: TargzIo;
	inquirer: Inquirer;

	constructor() {
		this.file = new File();
		this.print = new Print();
		this.tarzgIo = new TargzIo();
		this.inquirer = inquirer;
	}

	openBrowser(host: string): void {
		open(host);
	}

}
