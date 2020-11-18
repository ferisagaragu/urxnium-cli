import { exec } from 'child_process';
import { BASE_DIR, DIST_DIR, TEMP_FOLDER, VERSION } from './const/doc.const';
import { Command } from '../../core/interface/command';
import path from 'path';
import { DocShared } from './shared/doc.shared';

export class StartDoc extends Command {

	private docShared: DocShared;

	constructor() {
		super();

		this.docShared = new DocShared();
	}

	start(port: number = 1000) {
		this.print.title(VERSION, 'Urxnium Doc');
		this.decompressApplication(port, false);
	}

	dist() {
		this.print.title(VERSION, 'Urxnium Doc');
		this.decompressApplication(0, true);
	}

	private decompressApplication(port: number, dist: boolean): void {
		this.tarzgIo.decompress(
			path.resolve(__dirname, '../../assets/compress/urxnium-doc.tar'),
			dist ? DIST_DIR : TEMP_FOLDER,
			() => {
				if (!dist) {
					this.watch(port);
					exec(`cd ${TEMP_FOLDER} && http-server -a localhost -p ${port}`);
					//open(`http://localhost:${port}`);*/
				} else {
					this.compileJson(port, dist);
				}
			}
		);
	}

	private watch(port: number) {
		this.file.watch(
			BASE_DIR,
			() => {
				this.compileJson(port, false);
			}, () => {
				this.compileJson(port, false);
			}, () => {
				this.compileJson(port, false);
			}
		);

		this.compileJson(port, false);
	}

	private compileJson(port: number, dist: boolean): void {
		const main = this.docShared.getMain();

		if (!main) {
			return;
		}

		if (main.rest) {
			main.rest.src = this.compileSrc(main, 'rest');
		}

		if (main.functional) {
			main.functional.src = this.compileSrc(main, 'functional');
		}

		this.setUrxdoc(main, port, dist);
	}

	private setUrxdoc(data: any, port: number, dist: boolean): void {
		this.file.writeFile(
			dist ?
				`${DIST_DIR}/assets/data/doc.json`
			:
				`${TEMP_FOLDER}\\assets\\data\\doc.json`,
			JSON.stringify(data, null, 2)
		);

		if (!dist) {
			this.print.information(`you can see your application in: http://localhost:${port}`);
			this.print.information(`use shift + F5 your to reload explorer`);
		} else {
			this.print.success(`application has been compiled see the dist folder`);
		}
	}

	private compileSrc(main: any, type: string): Array<any> {
		const src = main[type].src ? main[type].src : [];
		const srcOut: Array<any> = [];

		src.forEach((section: string) => {
			const sectionOut = this.getJsonFile(section);

			if (sectionOut) {
				const documentation = sectionOut.elements;
				const documentationOut: Array<any> = [];

				documentation.forEach((document: string) => {
					const documentationFileOut = this.getJsonFile(document);

					if (documentationFileOut) {
						documentationOut.push(documentationFileOut);
						this.print.success(
							`{${document}}`.yellow +
							' was compiled success'
						);
					}
				});

				sectionOut.elements = documentationOut;
				srcOut.push(sectionOut);
				this.print.success(
					`{${section}}`.yellow +
					' was compiled success'
				);
			}
		});

		return srcOut;
	}

	private getJsonFile(path: string): any {
		if (this.file.exist(path)) {
			return JSON.parse(this.file.readFile(path));
		} else {
			this.print.warning(
				`{${path}} `.blue +
				'does not exist remove the reference'
			);
			return;
		}
	}

}
