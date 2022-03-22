import { BASE_DIR, BASE_SYSTEM_DIR } from '../const/spring-boot.const';
import { File } from '../../../core/io/file';
import { Print } from '../../../core/log/print';

export class SpringBootShared {

	private file: File;
	private print: Print;

	constructor() {
		this.file = new File();
		this.print = new Print();
	}

	getRootFolder(type?: string): string {
		try {
			let out = '';

			this.file.readFiles(BASE_DIR).forEach(file => {
				if (this.file.readFile(file).includes('@SpringBootApplication')) {
					const path = file.split(BASE_SYSTEM_DIR)[1].trim().trimEnd();
					const splitPath = path.split('\\');

					splitPath.forEach((split, index) => {
						if (split && index < (splitPath.length - 1)) {
							out += split + `${type ? type : '.'}`
						}
					});
				}
			});

			if (out) {
				return out.substring(0, out.length - 1);
			}

			throw 'error';
		} catch (e) {
			this.print.error('This environment no is Spring Boot Kotlin project');
		}

		return '';
	}

}
