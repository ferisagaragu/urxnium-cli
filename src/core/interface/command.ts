import { File } from '../io/file';
import { Print } from '../log/print';
import { TargzIo } from '../io/targz.io';
import { Text } from '../util/text';
import { System } from '../system/system';
import { Console } from '../system/console';

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
	text: Text;
	system: System;
	console: Console;

	constructor() {
		this.file = new File();
		this.print = new Print();
		this.tarzgIo = new TargzIo();
		this.inquirer = inquirer;
		this.text = new Text();
		this.system = new System();
		this.console = new Console();
	}

	openBrowser(host: string): void {
		open(host);
	}

}
