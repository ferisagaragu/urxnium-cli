import { Print } from '../log/print';
import 'colors';
const decompress = require('decompress');

export class TargzIo {

	private print: Print;

	constructor() {
		this.print = new Print();
	}

	decompress(file: string, out: string, onDecompress?: Function) {
		decompress(file, out).then((resp: any) => {
			resp.forEach((item: any) => {
				if (item.type === 'file') {
					this.print.success(`${item.path} [decompressed]`);
				}
			});
			onDecompress && onDecompress();
		});
	}

}
