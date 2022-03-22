import { Command } from '../../core/interface/command';
import { documentationSpringBoot } from '../../assets/data/spring-boot.data';

export class AddDocumentationSpringBoot extends Command {

	printDocumentation(): void {
		this.print.information(documentationSpringBoot());
	}

}
