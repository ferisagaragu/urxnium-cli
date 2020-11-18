import { File } from '../io/file';
import { Print } from '../log/print';
import { TargzIo } from '../io/targz.io';

export class Command {

	file: File;
	print: Print;
	tarzgIo: TargzIo;

	constructor() {
		this.file = new File();
		this.print = new Print();
		this.tarzgIo = new TargzIo();
	}

}
