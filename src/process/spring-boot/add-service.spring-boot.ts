import { BASE_DIR, BASE_DIR_RESOURCES } from './const/spring-boot.const';
import { Command } from '../../core/interface/command';
import { SpringBootShared } from './shared/spring-boot.shared';
import {
	documentDocJson,
	springBootController,
	springBootEntity,
	springBootIService,
	springBootRepository,
	springBootService
} from '../../assets/data/spring-boot.data';

export class AddServiceSpringBoot extends Command {

	private springBootShared: SpringBootShared;

	constructor() {
		super();

		this.springBootShared = new SpringBootShared();
	}

	generateService() {
		//this.print.title(VERSION, 'Urxnium Spring Boot');

		this.inquirer.prompt([
			{
				name: 'name',
				type: 'input',
				message: 'what is the service name ?',
				validate: (answers: string) => answers.length > 0 && !answers.includes(' '),
			},{
				name: 'services',
				type: 'checkbox',
				message: 'in which section will you add this document ?',
				choices: ['get', 'post', 'put', 'patch', 'delete']
			},{
				name: 'doc',
				type: 'confirm',
				message: 'Do you want document your code?'
			}
		]).then((resp: any) => {
			const entityPath = `${this.getAbsolutePath()}/entity/${this.text.firstUpperCase(resp.name)}.kt`;
			const iServicePath = `${this.getAbsolutePath()}/service/interface/I${this.text.firstUpperCase(resp.name)}Service.kt`;
			const servicePath = `${this.getAbsolutePath()}/service/${this.text.firstUpperCase(resp.name)}Service.kt`;
			const controllerPath = `${this.getAbsolutePath()}/controller/${this.text.firstUpperCase(resp.name)}Controller.kt`;
			const repositoryPath = `${this.getAbsolutePath()}/repository/I${this.text.firstUpperCase(resp.name)}Repository.kt`;

			if (!this.file.exist(entityPath)) {
				this.file.writeFile(
					entityPath,
					springBootEntity(this.springBootShared.getRootFolder(), this.text.firstUpperCase(resp.name))
				);

				this.print.success(`{${resp.name}} entity was create successfully`);
			} else {
				this.print.warning(`{${resp.name}} entity is already exist`);
			}

			if (!this.file.exist(iServicePath)) {
				this.file.writeFile(
					iServicePath,
					springBootIService(
						this.springBootShared.getRootFolder(),
						this.text.firstUpperCase(resp.name),
						resp.services
					)
				);

				this.print.success(`{${resp.name}} service interface was create successfully`);
			} else {
				this.print.warning(`{${resp.name}} service interface is already exist`);
			}

			if (!this.file.exist(servicePath)) {
				this.file.writeFile(
					servicePath,
					springBootService(
						this.springBootShared.getRootFolder(),
						this.text.firstUpperCase(resp.name),
						resp.services
					)
				);

				this.print.success(`{${resp.name}} service was create successfully`);
			} else {
				this.print.warning(`{${resp.name}} service is already exist`);
			}

			if (!this.file.exist(controllerPath)) {
				this.file.writeFile(
					controllerPath,
					springBootController(
						this.springBootShared.getRootFolder(),
						this.text.firstUpperCase(resp.name),
						resp.services,
						resp.doc
					)
				);

				this.print.success(`{${resp.name}} controller was create successfully`);
			} else {
				this.print.warning(`{${resp.name}} controller is already exist`);
			}

			//Documentation Json file generator
			this.generateDocumentation(resp);

			if (!this.file.exist(repositoryPath)) {
				this.file.writeFile(
					repositoryPath,
					springBootRepository(this.springBootShared.getRootFolder(), this.text.firstUpperCase(resp.name))
				);

				this.print.success(`{${resp.name}} repository was create successfully`);
			} else {
				this.print.warning(`{${resp.name}} repository is already exist`);
			}

		});
	}

	private getAbsolutePath() {
		return `${BASE_DIR}/${this.springBootShared.getRootFolder('/')}`;
	}

	private generateDocumentation(resp: any): void {
		if (resp.doc) {
			resp.services.forEach((docFiles: string) => {
				switch (docFiles) {
					case 'get':
						const nameGet = `find-all-${resp.name.toLowerCase()}s-by-uuid.json`;
						const jsonGetPath = `${BASE_DIR_RESOURCES}/doc/${resp.name.toLowerCase()}/${nameGet}`;

						if (!this.file.exist(jsonGetPath)) {
							this.file.writeFile(jsonGetPath, documentDocJson());
							this.print.success(
								`{${nameGet}} repository was create successfully`
							);
						} else {
							this.print.warning(
								`{${nameGet}} repository was create successfully`
							);
						}
					break;

					case 'post':
						const namePost = `create-${resp.name.toLowerCase()}.json`;
						const jsonPostPath = `${BASE_DIR_RESOURCES}/doc/${resp.name.toLowerCase()}/${namePost}`;

						if (!this.file.exist(jsonPostPath)) {
							this.file.writeFile(jsonPostPath, documentDocJson());
							this.print.success(
								`{${namePost}} repository was create successfully`
							);
						} else {
							this.print.warning(
								`{${namePost}} repository was create successfully`
							);
						}
					break;

					case 'put':
						const namePut = `update-${resp.name.toLowerCase()}.json`;
						const jsonPutPath = `${BASE_DIR_RESOURCES}/doc/${resp.name.toLowerCase()}/${namePut}`;

						if (!this.file.exist(jsonPutPath)) {
							this.file.writeFile(jsonPutPath, documentDocJson());
							this.print.success(
								`{${namePut}} repository was create successfully`
							);
						} else {
							this.print.warning(
								`{${namePut}} repository was create successfully`
							);
						}
					break;

					case 'delete':
						const nameDelete = `delete-${resp.name.toLowerCase()}.json`;
						const jsonDeletePath = `${BASE_DIR_RESOURCES}/doc/${resp.name.toLowerCase()}/${nameDelete}`;

						if (!this.file.exist(jsonDeletePath)) {
							this.file.writeFile(jsonDeletePath, documentDocJson());
							this.print.success(
								`{${nameDelete}} repository was create successfully`
							);
						} else {
							this.print.warning(
								`{${nameDelete}} repository was create successfully`
							);
						}
					break;

					case 'patch':
						const namePatch = `set-${resp.name.toLowerCase()}.json`;
						const jsonPatchPath = `${BASE_DIR_RESOURCES}/doc/${resp.name.toLowerCase()}/${namePatch}`;

						if (!this.file.exist(jsonPatchPath)) {
							this.file.writeFile(jsonPatchPath, documentDocJson());
							this.print.success(
								`{${namePatch}} repository was create successfully`
							);
						} else {
							this.print.warning(
								`{${namePatch}} repository was create successfully`
							);
						}
					break;
				}
			});
		}
	}

}

